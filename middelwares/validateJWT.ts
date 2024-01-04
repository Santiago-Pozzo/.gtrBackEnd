import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";

export const validateJWT = async ( req: Request, res:Response, next:NextFunction ): Promise<void> =>{

    const token = req.headers["token"] as string; //recibo el token del header de la rquest y lo convierto a string

        if(!token){
            res.status(401).json({
                msj: "Falta el token en el header de la petición"
            });
            return
        }

        try {

            const key = process.env.TOKEN_KEY as string;
            const payload = jwt.verify( token, key) as JwtPayload;

            const { id } = payload;

            const confirmedUser: IUser | null = await User.findById(id);

                if (!confirmedUser){
                    res.status(401).json({
                        msj: "El token no es válido"
                    })

                    return
                }

            req.body.id = id                          //Con esta instrucción creo, en el body, una clave id con el valor de id que extraje del token
            req.body.confirmedUser = confirmedUser;   //Creo en el body una clave usuarioCOnfirmado con los datos de confirmedUser 
            //EL próximo middelware va a poder acceder al body    

            next();

        } catch(error){

            console.error(error);
            res.status(500).json({
                msj: "Error del servidor. Token incorrecto"
            })
            
        }
}