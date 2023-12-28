import { Response, Request } from "express";

import User, {IUser} from "../models/user";

export const getUsers =async (req:Request, res:Response) => {
    
    const condicion = { estado: true };

    const users = await User.find(condicion);

    res.json({
        users
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