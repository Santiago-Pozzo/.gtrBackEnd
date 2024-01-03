import { Request, Response, NextFunction } from "express";

export const isVerifiedUser = (req: Request, res:Response, next: NextFunction) =>{

    const { verificado } = req.body.confirmedUser;

        if(!verificado){
            return res.status(401).json({
                msj: "El usuario no está correctamente verificado"
            });
        };

    next();    

}