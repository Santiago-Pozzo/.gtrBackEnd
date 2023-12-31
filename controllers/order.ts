import { Response, Request } from "express";
import mongoose from "mongoose";

import Order, { IOrder} from "../models/order"
import User, { IUser } from "../models/user";


export const newOrder = async (req:Request, res:Response) => {

    const orderData: IOrder = req.body 

    const order = new Order(orderData)

    await order.save();

    res.json({
        msj: "Orden creada corectamente",
        order
    })
}

export const getAllOrders = async (req:Request, res:Response) => {
    
    const condicion = { estado: true };

    const orders = await Order.find(condicion);

    res.json({
        orders
    })

};

export const getOrderByID = async (req:Request, res:Response) => {

    const { orderID } = req.params;

     // Verificar si el orderID cumple con el formato requerido
     if (!mongoose.Types.ObjectId.isValid(orderID)) {
        return res.status(400).json({
            msj: "El formato del ID de orden no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
        });
     }

    const order = await Order.findById( orderID );

    if (!order) {
        res.json({
            msj: "No se encontró la orden de compra"
        })

        return
    };

    res.json({
        order
    })

}

//Función auxiliar para buscar ordenes con el Id de usuario. Devuelve las ordenes del usuario o null
export const getByID = async (userID: string) => await Order.find({ usuario: userID });

export const getUserOrdersByEmail =  async (req:Request, res:Response) => {

    const { userEmail } = req.params;
    
    // Verificar si el email cumple con el formato requerido
    const isValidEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(userEmail);

    if (!isValidEmail) {
        return res.status(400).json({
            msj: "El formato del correo electrónico no es válido."
        });
    }
    
    const user:IUser | null = await User.findOne({email: userEmail}); 

    if(!user) {
        res.json({
            msj: "No hay usuarios registrados con ese email"
        })

        return
    };

    const orders = await getByID(user._id);

    if (!orders) {
        res.json ({
            msj: "El usuario no tiene compras realizadas"
          }); 
          
          return
    }

    res.json ({
      msj: "Ordenes de compras encontradas",
      orders
    });
};

export const getUserOrdersByID =  async (req:Request, res:Response) => {

    const { userID } = req.params; 

    try {
        const user: IUser | null = await User.findOne({ _id: userID });

        if (!user) {
            return res.json({
                msj: "No se encontró el usuario"
            });
        }

        const orders = await getByID(user._id);

        if (!orders) {
            return res.json({
                msj: "El usuario no tiene compras realizadas"
            });
        }

        return res.json({
            msj: "Ordenes de compras encontradas",
            orders
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor"
        });
    }
};

export const softDeleteOrder = async (req:Request, res:Response) => {
 
    const { orderID } = req.params;

        // Verificar si el orderID cumple con el formato requerido
        if (!mongoose.Types.ObjectId.isValid(orderID)) {
            return res.status(400).json({
                msj: "El formato del ID de orden no es válido. Debe ser una cadena hexadecimal de 24 caracteres"
            });
        }

    const order = await Order.findOneAndUpdate( {_id: orderID}, {estado: false});

    if(!order) {
        res.json({
            msj: "No se encontró la orden"
        })

        return
    }

    res.json ({
        msj: "La orden se eliminó correctamente",
        order
    })


};

export const restoreOrder = async (req:Request, res:Response) => {
 
    const { orderID } = req.params;

        // Verificar si el orderID cumple con el formato requerido
        if (!mongoose.Types.ObjectId.isValid(orderID)) {
            return res.status(400).json({
                msj: "El formato del ID de orden no es válido. Debe ser una cadena hexadecimal de 24 caracteres"
            });
        }

    const order = await Order.findOneAndUpdate( {_id: orderID}, {estado: true});

    if(!order) {
        res.json({
            msj: "No se encontró la orden"
        })

        return
    }

    res.json ({
        msj: "La orden se reestableció correctamente",
        order
    })


};

export const hardDeleteOrder = async (req:Request, res:Response) => {
 
    const { orderID } = req.params;

        // Verificar si el orderID cumple con el formato requerido
        if (!mongoose.Types.ObjectId.isValid(orderID)) {
            return res.status(400).json({
                msj: "El formato del ID de orden no es válido. Debe ser una cadena hexadecimal de 24 caracteres"
            });
        }

    const order = await Order.findByIdAndDelete( orderID );

    if(!order) {
        res.json({
            msj: "No se encontró la orden"
        })

        return
    }

    res.json ({
        msj: "La orden se eliminó correctamente",
        order
    })


};