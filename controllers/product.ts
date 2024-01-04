import { Response, Request } from "express";

import Product, { IProduct } from "../models/product";
import { log } from "console";

export const getProducts = async (req:Request, res:Response) => {
    
    const condicion = { estado: true };

    try {
        const products = await Product.find(condicion);

        return res.status(200).json({
            msj: "Producto encontrados exitosamente",
            productos: [...products]
        })    
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor.",
            error
        })
    }
}//


export const newProduct = async (req:Request, res:Response) => {

    const productData: IProduct = req.body 

    const isExitingProduct = await Product.findOne({ id_producto: productData.id_producto });//Verifico que el id ingresado en el body no exita en la base de datos

        if(isExitingProduct) {
            return res.status(400).json({
                msj: `El id_producto ${productData.id_producto} ya existe. Puede consultar los productos de la base de datos para elegir otro id`,
            })
        }

    try {

        const product = new Product(productData)
            
        await product.save();

        return res.status(201).json({
            msj: "Producto creado corectamente",
            product
        })

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo agregar el producto a la base de datos",
            error
        })
    }
}//

export const updateProduct =async (req:Request, res:Response) => {

    const { id_producto } = req.params; 
           
    const  product = await Product.findOne({id_producto: id_producto}); 
        if (!product) {
            return res.status(404).json({
                msj: `No se encontró el producto con id_producto: ${id_producto}`
            });

        };

    const { _id } = product; 

    const { estado, ...newdata } = req.body; 
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate( _id,  newdata, { new: true } ); 

        return res.status(200).json({
            msj: `Los datos del producto con id_producto: ${id_producto} se actualizaron correctamente`,
            updatedProduct
        })

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo actualizar la información del producto",
            error
        })
    };
};//

export const getProductByID =async (req:Request, res:Response) => {
    
    const { id_producto } = req.params; 

    try {

        const product:IProduct | null = await Product.findOne({id_producto: id_producto}); 

            if (!product) {
                return res.status(404).json({
                    msj: `No se encontró ningún producto con id_producto: ${id_producto}`
                })
            }

        return res.status(200).json({
            msj: `Producto con id_producto: ${id_producto}, encontrado exitosamente`,
            product
        })

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor.",
            error
        })
    }


};//

export const hardDeleteProduct = async (req:Request, res:Response) =>{
console.log("holis");

    const { id_producto } = req.params;

    try {

        const product = await Product.findOneAndDelete({ id_producto: id_producto }) 

            if (!product){                                        
                return res.status(404).json({
                    msj: `No se encontró el producto con id_producto: ${id_producto}`
                });
            }

        return res.status(200).json({
            msj: `El producto con id_producto: ${id_producto} se eliminó exitosamente`,
            product
        });

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo eliminar el producto",
            error
        })
    };
};//

export const softDeleteProduct =async (req:Request, res:Response) => {
    
    const { id_producto } = req.params; 

    try {

        const product = await Product.findOneAndUpdate({id_producto: id_producto}, { estado: false }, { new: true }); 
            
            if (!product) {
                return res.status(404).json({
                    msj: `No se encontró el producto con id_producto: ${id_producto}`
                });
            }

        res.json({
            msj: `El producto con id_producto: ${id_producto} se eliminó exitosamente`,
            product
        })
        
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo eliminar el producto",
            error
        })
    };
};//

export const restoreProduct =async (req:Request, res:Response) => {
    const { id_producto } = req.params; 

    try {

        const product = await Product.findOneAndUpdate({id_producto: id_producto}, { estado: true }, { new: true }); 
            
            if (!product) {
                return res.status(404).json({
                    msj: `No se encontró el producto con id_producto: ${id_producto}`
                });
            }

        res.json({
            msj: `El producto con id_producto: ${id_producto} se reestableció exitosamente`,
            product
        })
        
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pudo reestablecer el producto",
            error
        })
    };
};//
