import { Response, Request } from "express";

import Product, { IProduct } from "../models/product";
import { log } from "console";

export const getProducts = async (req:Request, res:Response) => {
    
    const condicion = { estado: true };

    const products = await Product.find(condicion);

    res.json({
        products
    })    
}

export const newProduct = async (req:Request, res:Response) => {

    const productData: IProduct = req.body //obtengo los datos enviados a traves del body de la request (que tienen que coincidir con lo establecido en IUser)

    const isExitingProduct = await Product.findOne({ id_producto: productData.id_producto });//Verifico que el id ingresado en el body no exita en la base de datos

    if(isExitingProduct) {
        res.json({
            msj: "El id_producto ingresado ya existe. Puede consultar los productos de la base de datos para elegir otro id",
        })
        return;
    }

    const product = new Product(productData)// creo un usuario con el modelo de mongoose y los datos que vienen en el body de la req
        
    await product.save();

    res.json({
        msj: "Producto creado corectamente",
        product
    })

}

export const updateProduct =async (req:Request, res:Response) => {
    console.log("jsfdhjfsdhjfdsjdsfjjdfsjjd");
    const { id_producto } = req.params; 
    
       
    const  product   = await Product.findOne({id_producto: id_producto}); 
    if (!product) {
        res.json({
           msj: "Producto no encontrado"
        });
        return;
    }

    const { _id } = product; 

    const {  estado, ...data } = req.body; 
    
    const updatedProduct = await Product.findByIdAndUpdate( _id,  data ); //EL primer parametro de findOneAndUpdate es la coindidencia que va a buscar y el segundo los campos que va a podificar.

    res.json({
        msj: "Los datos del producto han sido actualizados",
        updatedProduct
    })

};

export const getProductByID =async (req:Request, res:Response) => {
    
    const { id_producto } = req.params; 

    const product:IProduct | null = await Product.findOne({id_producto: id_producto}); 

    if (!product) {
        res.json({
            msj: "No se encontró ningún producto"
        })

        return
    }

    res.json({
        product
    })

};

export const hardDeleteProduct = async (req:Request, res:Response) =>{

    const { id_producto } = req.params;

    const product = await Product.findOneAndDelete({ id_producto: id_producto }) 

    if (!product){                                        
        res.json({
            msj: "No se encontró el producto"
        })

        return
    }

    res.json({
        product
    })

};

export const softDeleteProduct =async (req:Request, res:Response) => {
    
    const { id_producto } = req.params; 

    const product = await Product.findOneAndUpdate({id_producto: id_producto}, { estado: false }, { new: true }); 
    if (!product) {
        res.json({
            msj: "Producto no encontrado"
        });
        return;
    }

    res.json({
        msj: "Se eliminó el producto",
        product
    })

};

export const restoreProduct =async (req:Request, res:Response) => {
    
    const { id_producto } = req.params; 

    const product = await Product.findOneAndUpdate({id_producto: id_producto}, { estado: true }, { new: true }); 

    if (!product) {
        res.json({
            msj: "Producto no encontrado"
        });

        return;
    }

    res.json({
        msj: "Se reestableció el producto",
        product
    })

};
