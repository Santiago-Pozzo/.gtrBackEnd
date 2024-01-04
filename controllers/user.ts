import e, { Response, Request } from "express";
import bcryptjs, { hashSync } from "bcryptjs";
import randomstring from "randomstring";

import User, {IUser} from "../models/user";
import { isValidEmail } from "../helpers/functions";
import { sendMail, sendNewPass } from "../mailer/mailer";


export const getUsers = async (req:Request, res:Response) => {
    
    const condicion = { estado: true };
    try {

        const users = await User.find(condicion);

        res.json({
            users:[...users]
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({ 
            msj: "Error en el servidor al buscar los usuarios"
        })

    }
};//

export const getUserByEmail = async (req:Request, res:Response) => {
    
    const { email } = req.params; //Desestructuro el email de los parametros de la Request

        if (!isValidEmail(email)){
            return res.status(400).json({
                msj: "El email no es válido"
            })
        } 

    try {

        const user:IUser | null = await User.findOne({email: email}); //La constante user puede ser de la clase IUser o puede ser null. En el metodo findOne establezco como condición que el campo email sea igual al valor de email que desestructuramos de la req

            if(!user) {
                return res.status(401).json({
                    msj: `No encontró usuario registrado con el mail ${email}`
                })
            }

        return res.status(200).json({
            msj: `Se encontró el usuario registrado con el mail ${email}`,
            user
        })

    } catch(error){
    
        console.error(error);
        return res.status(500).json({ 
            msj: "Error en el servidor"
        })
    
    }
};//

export const updateUserName = async (req:Request, res:Response) => {

    const { id, nombre } = req.body; 
    
    try {
 
        const updatedUser = await User.findByIdAndUpdate( id,  { nombre: nombre }, { new: true } ); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a modificar.

        return res.status(200).json({
            msj: "Los datos se modificaron correctamente",
            updatedUser
        })

    } catch(error){
    
        console.error(error);
        return res.status(500).json({ 
            msj: "Error al modificar los datos del usuario"
        })
    
    }
};//

export const updateUserLastName = async (req:Request, res:Response) => {

    const { id, apellido } = req.body; 
    
    try {
 
        const updatedUser = await User.findByIdAndUpdate( id,  { apellido: apellido }, { new: true } ); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a modificar.

        return res.status(200).json({
            msj: "Los datos se modificaron correctamente",
            updatedUser
        })

    } catch(error){
    
        console.error(error);
        return res.status(500).json({ 
            msj: "Error al modificar los datos del usuario"
        })
    
    }
};//

export const updateUserEmail = async (req:Request, res:Response) => {
    
    const { id, email } = req.body; 
    const randomCode = randomstring.generate(6);
    
    try {
 
        const updatedUser = await User.findByIdAndUpdate( 
                id, 
                { 
                 email: email, 
                 verificado: false,
                 codigo: randomCode
                }, 
                { new: true }
            ); 

        return res.status(200).json({
            msj: `El email se modificó correctamente. Se envió un nuevo código de verificación al correo ${email}`,
            updatedUser
        })

    } catch(error){
    
        console.error(error);
        return res.status(500).json({ 
            msj: "Error interno del servido. No se pudo modificar los datos del usuario"
        })
    
    }
};//

export const updateUserPass = async (req:Request, res:Response) => {
    
    const { id, contraseña } = req.body; 

    const salt = bcryptjs.genSaltSync();
    const encryptedPass = bcryptjs.hashSync( contraseña, salt );
    
    try {
 
        const updatedUser = await User.findByIdAndUpdate( id, { contraseña: encryptedPass }, { new: true } ); 

        return res.status(200).json({
            msj: `La contraseña se modificó correctamente.`,
            updatedUser
        })

    } catch(error){
    
        console.error(error);
        return res.status(500).json({ 
            msj: "Error interno del servido. No se pudo modificar los datos del usuario"
        })
    
    }
}//

export const hardDeleteUser = async (req:Request, res:Response) =>{

    const { email } = req.params;

        if (!isValidEmail(email)){
            return res.status(400).json({
                msj: "El email no es válido"
            })
        }
        
        if ( email === req.body.confirmedUser.email ) {
            return res.status(400).json({
                msj: "No es posible realizar un hard delete de un usuario con su propio token."
            })
        }

    try {

        const user = await User.findOneAndDelete({ email: email }) //Por mas que borre el usuario de la DB, cuando encuentra el usuario igualmente crea la const user con la info del usuario  (porque no agregue el argumento {new: true en el findoneAndDelete})   , por eso podemos usar el falsie en el if que sigue más abajo)
           
            if(!user) {
                return res.status(401).json({
                    msj: `No encontró usuario registrado con el mail ${email}`
                })
            }

        return res.status(200).json({
            msj: `Se eliminó de la base de datos el usuario registrado con el mail ${email}`,
            user
        })


    } catch(error){
    
        console.error(error);
        return res.status(500).json({ 
            msj: "Error del servidor al intentar eliminar definitivamente un usuario"
        })
    
    }
};//

export const softDeleteUser = async (req:Request, res:Response) => {
    
    const id = req.body.id

    try {

        const user = await User.findByIdAndUpdate( id, { estado: false, verificado: false }, { new: true }); 

        return res.status(200).json({
            msj: `Se elimino correctamente el usuario registrado con el mail ${req.body.confirmedUser.email}`,
            user
        })


    } catch(error){
    
        console.error(error);
        return res.status(500).json({ 
            msj: "Error interno del servidor. No se pudo eliminar el usuario"
        })
    
    }


};//

export const restoreUser = async (req:Request, res:Response) => {
    
    const { email, contraseña } = req.body; 

    try {

            const userToRestore = await User.findOne({ email });

                if( !userToRestore ){
                    return res.status(400).json({
                        msj: `No se encontró el email ${email} en la base de datos`
                    })
                };

            const validatePassword = bcryptjs.compareSync( contraseña, userToRestore.contraseña)   
        
            if(!validatePassword) {
                return res.status(400).json({
                    msj: "La contraseña es incorrecta"
                })
            };

            const randomCode = randomstring.generate(6);

            const user = await User.findOneAndUpdate(
                {email: email}, 
                {   
                    estado: true, 
                    verificado: false, 
                    codigo: randomCode 
                }, 
                { new: true }); 

            await sendMail( email, randomCode );

            return res.status(200).json({
                msj: `Usuario reestablecido correctamente. Sen envió el nuevo código de verificación al correo ${email}`,
                user
            })


    } catch(error){
    
        console.error(error);
        return res.status(401).json({ 
            msj: "Error interno del servido. No se pudo reestablecer el usuario"
        })
    
    }
};//

export const restorePassword = async (req:Request, res:Response) =>{
    const { email } = req.body;

    const user: IUser | null = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                msj: `No se encontraron usuarios registrados con el el email ${email}`
            })
        }

        if ( !user.verificado ) {
            await sendMail( email, user.codigo as string )
            return res.status(400).json({
                msj: `No se puede reestablecer la contraseña. El correo ${email} está registrado pero no fue verificado. Se reenvió el código por email para que pueda conpletar la verificación`
            })
        }

    const randomPass = randomstring.generate(8);
    const salt = bcryptjs.genSaltSync();
    const encryptedPass = bcryptjs.hashSync( randomPass, salt );

    try {
        await sendNewPass( email, randomPass as string );
        const updatedUser = await User.findOneAndUpdate ( { email }, { contraseña: encryptedPass }, { new: true });

        return res.status(400).json({
            msj: `Se envió la contraseña de recuperación al correo ${email}`
        })

    } catch(error){
    
        console.error(error);
        return res.status(401).json({ 
            msj: "Error interno del servido. No se pudo reestablecer la contraseña"
        })
    
    }
}//

