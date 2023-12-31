import express, { Express } from "express";
import { connectDB } from "../database/config";

import usersRoutes from "../routes/users" //como yo exporté por default el router en users.ts, aca lo puedo traer con un nombre diferente (en el archivo user.ts se exportó como rutes, acá lo traigo con el alias usersRoutes)
import productRoutes from "../routes/products"
import orderRoutes from "../routes/orders"

export class Server {

    app: Express;

    constructor(){
        this.app = express();
        this.conectionDB();
        this.middlewares();
        this.routes();
    }

    listen(): void {
        this.app.listen(8080, ()=>{
            console.log("Corriendo en el puerto 8080");            
        })
    }

    async conectionDB(): Promise<void>{
        await connectDB();
    }

    middlewares(): void {
        this.app.use(express.json());//Este metodo hace que este disponible el body de la request
        
    }

    routes(): void {
        this.app.use('/users', usersRoutes);//Con esta instrucción cuando se acceda a el path /users se podra acceder a los metodos (solicitudes HTTP en este caso) definidos en ../routes/users.ts
        this.app.use('/products', productRoutes);
        this.app.use('/orders', orderRoutes);
    }

}