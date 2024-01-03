import { Request, Response } from "express";
import Issue, { IIssue } from "../models/issues";
import { ObjectId } from "mongoose";


export const newIssue = async ( req:Request, res: Response ) => {
    
    const { titulo, descripcion, prioridad }: IIssue = req.body;
    const user: ObjectId = req.body.confirmedUser._id;

    const issue = new Issue({
        titulo,
        descripcion,
        prioridad,
        usuario: user,
        fecha: new Date()
    });

    try {

        await issue.save();

        return res.status(201).json({
            msj: "El issue fue creado correctamente",
            issue
        })

    } catch(error){

        console.error(error);
        return res.status(401).json({
            msj: "Error interno del servidor",
            error
        });

    }


};
