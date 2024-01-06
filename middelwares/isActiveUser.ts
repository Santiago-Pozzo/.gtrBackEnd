import { Request, Response, NextFunction } from "express";

export const isActiveUser = (req: Request, res:Response, next: NextFunction) =>{

    const { estado } = req.body.confirmedUser;

        if(!estado){
            return res.status(401).json({
                msj: "El usuario no tiene una cuenta activa"
            });
        };

    next();    

}