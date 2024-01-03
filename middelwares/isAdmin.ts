import { Request, Response , NextFunction } from "express";
import { ROLES } from "../helpers/constants";

export const isAdmin = async ( req:Request, res: Response, next: NextFunction ) => {
    const rol = req.body.confirmedUser.rol;

        if(rol !== ROLES.admin){
            return res.status(401).json({
                msj: `Atención! El usuario no es administrador`,
            })
        };

    next();
};