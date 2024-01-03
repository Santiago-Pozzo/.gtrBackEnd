import { Response, Request } from "express";

import User, {IUser} from "../models/user";
import { isValidEmail } from "../helpers/functions";
import { log } from "console";

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
    
    const { email } = req.params; //Desestructuro el email de los parametros de la Request

    try {



    } catch(error){
    
        console.error(error);
        return res.status(401).json({ 
            msj: ""
        })
    
    }

    const user = await User.findOneAndUpdate({email: email}, { estado: false }, { new: true }); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a podificar.

    if (!user) {
        res.json({
            msj: "Usuario no encontrado"
        });
        return;
    }

    res.json({
        user
    })

};

export const restoreUser = async (req:Request, res:Response) => {
    
    const { email } = req.params; 

    try {



    } catch(error){
    
        console.error(error);
        return res.status(401).json({ 
            msj: ""
        })
    
    }

    const user = await User.findOneAndUpdate({email: email}, { estado: true }, { new: true }); 

    if (!user) {
        res.json({
            msj: "Usuario no encontrado"
        });
        return;
    }

    res.json({
        msj: "Se reestableció el usuario",
        user
    })

};

