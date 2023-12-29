import { Response, Request } from "express";

import User, {IUser} from "../models/user";
import { json } from "stream/consumers";

export const getUsers =async (req:Request, res:Response) => {
    
    const condicion = { estado: true };

    const users = await User.find(condicion);

    res.json({
        users
    })

};

export const getUserByEmail =async (req:Request, res:Response) => {
    
    const { email } = req.params; //Desestructuro el email de los parametros de la Request

    const user:IUser | null = await User.findOne({email: email}); //La constante user puede ser de la clase IUser o puede ser null. En el metodo findOne establezco como condición que el campo email sea igual al valor de email que desestructuramos de la req

    res.json({
        user
    })

};

export const newUser =async (req:Request, res:Response) => {

    const userData: IUser = req.body //obtengo los datos enviados a traves del body de la request

    const user = new User(userData)// creo un usuario con el modelo de mongoose y los datos que vienen en el body de la req

    await user.save();

    res.json({
        msj: "Usuario creado corectamente",
        user
    })
}

export const updateUser =async (req:Request, res:Response) => {
    
    const { email } = req.params; //Desestructuro el email de los parametros de la Request

    const { nombre, apellido, ...data} = req.body; //Desestructuro nombre y apellido del body Request

    const user = await User.findOneAndUpdate({email: email}, {nombre, apellido}); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a podificar.

    res.json({
        user
    })

};

export const hardDeleteUser = async (req:Request, res:Response) =>{

    const { email } = req.params;

    const user = await User.findOneAndDelete({ email: email }) //Por mas que borre el usuario de la DB, cuando encuentra el usuario igualmente crea la const user con la info del usuario, por eso podemos usar el falsie en el if que sigue más abajo)

    if (!user){                                          //Si no hay usuario con ese mail envío un menasje de error 
        res.json({
            msj: "No hay un usuario registrado con ese email"
        })

        return
    }

    res.json({
        user
    })

};

export const softDeleteUser =async (req:Request, res:Response) => {
    
    const { email } = req.params; //Desestructuro el email de los parametros de la Request

    const user = await User.findOneAndUpdate({email: email}, { estado: false }); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a podificar.

    res.json({
        user
    })

};