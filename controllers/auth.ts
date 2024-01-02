import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs, { hashSync } from "bcryptjs";
import randomstring from "randomstring";
import { ROLES } from "../helpers/contants";
import { sendMail } from "../mailer/mailer";
import { generateJWT } from "../helpers/generateJWT";
import { log } from "console";

export const register = async ( req:Request, res: Response ) => {
    const {nombre, apellido, email, contraseña, rol }:IUser = req.body;

    //La validación de datos ya se realizó con los checks en la ruta (routes/auths.ts)

    try {

            //Encriptado de la contraseña
            const salt = bcryptjs.genSaltSync();
            const encryptedPass = bcryptjs.hashSync( contraseña, salt );

            //Usuario administrador
            const adminKey = req.headers["admin-key"]; //Accedo a los headers de la requuest y busco la clave admin-
            let userRol = ROLES.user;
            if ( adminKey === process.env.ADMIN_KEY){
                userRol = ROLES.admin;
            };
            
            //Genero un código aleatorio de 6 caracteres
            const randomCode = randomstring.generate(6);


        const user = new User({
            nombre,
            apellido,
            email,
            contraseña: encryptedPass,
            rol: userRol,
            codigo: randomCode
        });
        
        await user.save();

        await sendMail( email, randomCode );

        return res.status(201).json({
            msj: "Usuario registrado correctamente",
            user
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor",
            error
        })
        
    }
}

export const login = async ( req:Request, res: Response ) => {
 
    const { email, contraseña } = req.body;
    
    try {

        const user = await User.findOne({ email });

            if( !user ){
                return res.status(400).json({
                    msj: "No se encontró el email en la base de datos"
                })
            };

        const validatePassword = bcryptjs.compareSync( contraseña, user.contraseña)   
        
            if(!validatePassword) {
                return res.status(400).json({
                    msj: "La contraseña es incorrecta"
                })
            };

        const token = await generateJWT( user.id );
        
        return res.json({
            msj: "Inicio de sesión exitoso",
            user,
            token
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor",
            error
        })

    }
}