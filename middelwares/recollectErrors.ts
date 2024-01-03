import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const recollectErrors = (req:Request, res:Response, next:NextFunction): void => {

    const errors: Result<ValidationError> = validationResult(req); //Recibe todos los errores de los checks que están antes que este middelware en donde se lo llama 

    if(!errors.isEmpty()){
        res.status(400).json({
            msj: "Hubo errores al realizar la petición",
            errors
        })
    } else {
        next();
    }

}