import { Response, Request } from "express";
import mongoose, { Types } from "mongoose";

import Order, { IOrder} from "../models/order"
import User, { IUser } from "../models/user";
import Product, {IProduct} from "../models/product";
import { isValidEmail } from "../helpers/functions";

// Función auxiliar que realiza la transformación de id_producto a _id
const transformArray = async (productosArray: any[]) => {
    // Utiliza Promise.all para esperar que todas las consultas findOne se completen
    const items = await Promise.all(
            productosArray.map(async (producto) => {
            // Realiza la consulta findOne para obtener el _id correspondiente al id_producto
            const productoEnDB = await Product.findOne({ id_producto: producto.id_producto });
    
            if (productoEnDB) {                

                return {
                    producto: productoEnDB,
                    precioAlComprar: producto.precioAlComprar,
                    cantidad: producto.cantidad,
                };
            } else {
                return {
                    msj:`Producto con id_producto ${producto.id_producto} no encontrado.`
                }
            }
            })
        );

        return items;
};

export const newOrder = async (req:Request, res:Response) => {

    const { email, arrayProductos, precioTotalAlComprar} = req.body; //faltan verificar los datos recibidos
    
    const user = await User.findOne({ email: email }); //Con el mail me traigo el usuario correspondiente

        if (!user){
            res.status(404).json({
                msj: "No se encontró el usuario. Ingrese un mail válido"
            })

            return
        }

    const items = await transformArray(arrayProductos); 

        if (items.some(item=>!item.producto)){  //Busco entre los items aquellos que no tengan un campo producto (los que no se encontraron son un objeto con un msj)
            res.status(404).json({
                msj: "Algunos productos no se encontraron",
                items
            })

            return
        };


    const order = await new Order({
       usuario: user,
       items: items,
       precioTotalAlComprar 
    }).populate("usuario");

    try {

        await order.save();
    
        return res.json({
            msj: "Orden creada corectamente",
            order
        })

    } catch(error) {
        console.error(error);
        
        return res.status(500).json({
            msj: "Error interno del servidor al guardar la orden",
            error: error
        });

    }
}

export const getAllOrders = async (req:Request, res:Response) => {
    
    const condicion = { estado: true };

    try {

        const orders = await Order.find(condicion);

        return res.json({
            orders
        })

    } catch(error) {

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor", 
            error: error
        });

    }


};

export const getOrderByID = async (req:Request, res:Response) => {

    const { orderID } = req.params;

        // Verificar si el orderID cumple con el formato requerido
        if (!mongoose.Types.ObjectId.isValid(orderID)) {
            return res.status(400).json({
                msj: "El formato del ID de orden no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
            });
        }
    
    try {
        const order = await Order.findById( orderID );

            if (!order) {
                return res.status(404).json({
                    msj: "No se encontró la orden de compra"
                })
            };

        return res.json({
            order
        })

    } catch(error) {

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });

    }
}

//Función auxiliar para buscar ordenes con el Id de usuario. Devuelve las ordenes del usuario o null (no verifica el formato de la ID)
export const getByID = async (userID: string) => await Order.find({ usuario: userID });

export const getUserOrdersByEmail =  async (req:Request, res:Response) => {

    const { userEmail } = req.params;
    
        // Verificar si el email cumple con el formato requerido
  
        if (isValidEmail(userEmail)) {
            return res.status(400).json({
                msj: "El formato del correo electrónico no es válido."
            });
        }

    try {

        const user:IUser | null = await User.findOne({email: userEmail}); 

            if(!user) {
                 return res.json({
                    msj: "No hay usuarios registrados con ese email"
                })
            };

        const orders = await getByID(user._id);

            if (!orders) {
                return res.json ({
                    msj: "El usuario no tiene compras realizadas"
                }); 
            }

        return res.json ({
        msj: "Ordenes de compras encontradas",
        orders
        });

    } catch(error){
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }

};

export const getUserOrdersByID =  async (req:Request, res:Response) => {

    const { userID } = req.params;

        // Verificar si el orderID cumple con el formato requerido
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({
                msj: "El formato del ID de orden no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
            });
        }    

    try {
        const user: IUser | null = await User.findOne({ _id: userID });

        if (!user) {
            return res.status(404).json({
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
            msj: "Error interno del servidor",
            error: error
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
    
    try {
        const order = await Order.findOneAndUpdate( {_id: orderID}, {estado: false}, { new: true });

            if(!order) {
                return res.status(404).json({
                    msj: "No se encontró la orden"
                })

                return
            }

        return res.json ({
            msj: "La orden se eliminó correctamente",
            order
        }) 

    } catch(error){
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }



};

export const restoreOrder = async (req:Request, res:Response) => {
 
    const { orderID } = req.params;

        // Verificar si el orderID cumple con el formato requerido
        if (!mongoose.Types.ObjectId.isValid(orderID)) {
            return res.status(400).json({
                msj: "El formato del ID de orden no es válido. Debe ser una cadena hexadecimal de 24 caracteres"
            });
        }

    try {
        const order = await Order.findOneAndUpdate( {_id: orderID}, {estado: true}, { new: true });

            if(!order) {
                return res.status(404).json({
                    msj: "No se encontró la orden"
                })                
            }

        return res.json ({
            msj: "La orden se reestableció correctamente",
            order
        }) 
    } catch(error){
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });
    }



};

export const hardDeleteOrder = async (req:Request, res:Response) => {
 
    const { orderID } = req.params;

        // Verificar si el orderID cumple con el formato requerido
        if (!mongoose.Types.ObjectId.isValid(orderID)) {
            return res.status(400).json({
                msj: "El formato del ID de orden no es válido. Debe ser una cadena hexadecimal de 24 caracteres"
            });
        }

    try{
        const order = await Order.findByIdAndDelete( orderID );

            if(!order) {
                return res.json({
                    msj: "No se encontró la orden"
                })
            }

        return res.json ({
            msj: "La orden se eliminó correctamente",
            order
        })        
    } catch(error){
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor",
            error: error
        });        
    }
};