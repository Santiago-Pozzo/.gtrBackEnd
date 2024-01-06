import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcryptjs, { hashSync } from "bcryptjs";
import randomstring from "randomstring";
import { ROLES } from "../helpers/constants";
import { sendMail } from "../mailer/mailer";
import { generateJWT } from "../helpers/generateJWT";


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
                return res.status(404).json({
                    msj: `No se encontró el email ${email} en la base de datos`
                })
            };

            if (!user.estado) {
                return res.status(400).json({
                    msj: `No hay un usuario activo con el email ${email}`
                })
            };

        const validatePassword = bcryptjs.compareSync( contraseña, user.contraseña)   
        
            if(!validatePassword) {
                return res.status(400).json({
                    msj: "La contraseña es incorrecta"
                })
            };

        const token = await generateJWT( user.id );
        
        return res.status(200).json({
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

export const verifyUser = async ( req:Request, res: Response ) => {

    const { email, codigo } = req.body;

    try {

        const user = await User.findOne({ email });

            if( !user ){
                return res.status(404).json({
                    msj: "No se encontró el email en la base de datos"
                })
            };

            if ( !user.estado ) {
                return res.status(400).json({
                    msj: `No hay un usuario activo con el email ${email}`
                })
            };

            if( user.verificado ) {
                return res.status(400).json({
                    msj: "El usuario ya se encuentra verificado"
                })
            };
            
            if ( codigo !== user.codigo ) {
                return res.status(400).json({
                    msj: "El código es incorrecto"
                })                
            };

        const actualizedUser = await User.findOneAndUpdate({ email }, { verificado: true }, { new: true });

        return res.status(200).json({
            msj: "Usuario verificado exitosamente",
            actualizedUser
        })

    } catch(error) {

        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor",
            error
        })

    }
}

export const setNewAdminByEmail = async ( req:Request, res: Response ) => {

    const { email } = req.body;

    const user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({
                msj: `No se encontró un usuario con el email ${email}`
            })
        } 

    try {

        const newAdmin = await User.findOneAndUpdate ({ email }, { rol: ROLES.admin }, { new: true })

        return res.status(200).json({
            msj: `El usuario registrado con el correo ${email} fue establecido como administrador`,
            newAdmin
        })

    } catch(error) {

        console.error(error);
        return res.status(500).json({
            msj: "Error en el servidor",
            error
        })

    }

}
