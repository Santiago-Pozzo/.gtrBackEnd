import { Response, Request } from "express";

import User, {IUser} from "../models/user";


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

    if(!user) {
        res.json({
            msj: "No hay usuarios registrados con ese email"
        })

        return
    }

    res.json({
        user
    })

};

export const newUser =async (req:Request, res:Response) => {

    const userData: IUser = req.body //obtengo los datos enviados a traves del body de la request (que tienen que coincidir con lo establecido en IUser)

    const user = new User(userData)// creo un usuario con el modelo de mongoose y los datos que vienen en el body de la req

    await user.save();

    res.json({
        msj: "Usuario creado corectamente",
        user
    })
}

export const updateUser =async (req:Request, res:Response) => {
    
    const { email } = req.params; //Desestructuro el email de los parametros de la 
        
    const  user   = await User.findOne({email: email}); //Primero busco al usuario con el email y devuelvo un mensaje si no lo encontró
 
    if (!user) {
        res.json({
            msj: "Usuario no encontrado"
        });
        return;
    }

    const { _id } = user; //Si el usuario existe desestructuro su id para buscarlo y actualizar los datos necesarios (excepto el estado)

    const {  estado, ...data } = req.body; //Desestructuro del body del request: el estado y el resto de los campos con el spread operator en data 
    
    const updatedUser = await User.findByIdAndUpdate( _id,  data ); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a podificar.

    res.json({
        updatedUser
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

export const restoreUser =async (req:Request, res:Response) => {
    
    const { email } = req.params; 

    const user = await User.findOneAndUpdate({email: email}, { estado: true }); 

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