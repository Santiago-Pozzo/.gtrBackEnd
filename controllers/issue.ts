import { Request, Response } from "express";
import Issue, { IIssue } from "../models/issues";
import mongoose, { ObjectId } from "mongoose";


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


};//

export const getAllIssues = async ( req:Request, res: Response ) => {

        try {
        const issues = await Issue.find(  );

            if (!issues) {
                return res.status(400).json({
                    msj: "No hay issues para mostrar"
                })
            };

        return res.status(200).json({
            msj: "Las issues se encontraron exitosamente",
            issues: [...issues]
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        })

    } 
};//

export const getPendingIssues = async ( req:Request, res: Response ) => {

    const condicion = { resuelta: false }

    try {
        const pendingIssues = await Issue.find( condicion );

            if (!pendingIssues) {
                return res.status(404).json({
                    msj: "No hay issues pendientes"
                })
            };

        return res.status(200).json({
            msj: "Las issues pendientes se encontraron exitosamente",
            issues: [...pendingIssues]
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        })

    } 
};//

export const getResolvedIssues = async ( req:Request, res: Response ) => {

    const condicion = { resuelta: true }

    try {
        const resolvedIssues = await Issue.find( condicion );

            if (!resolvedIssues) {
                return res.status(404).json({
                    msj: "No hay issues resueltas"
                })
            };

        return res.status(200).json({
            msj: "Las issues resueltas se encontraron exitosamente",
            issues: [...resolvedIssues]
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        })

    } 
};//

export const getIssuesByPriority = async ( req:Request, res: Response ) => {
    const {priority} = req.params;
    const condicion = { prioridad: priority, resuelta: false };

    try {
        const issues = await Issue.find( condicion );

            if (!issues || issues.length === 0 ) {
                return res.status(404).json({
                    msj: `No se encontraron issues de prioridad ${priority}`
                })
            };

        return res.status(200).json({
            msj: `Se encontraron exitosamente ${issues.length} issues pendientes de prioridad ${priority}`,
            issues: [...issues]
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        })

    } 
};//

export const getIssueByID = async ( req:Request, res: Response ) => {
    const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid( id )) {
            return res.status(400).json({
                msj: "El formato del ID no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
            });
        }

    try {
        const issue = await Issue.findById( id );

            if (!issue) {
                return res.status(404).json({
                    msj: `No se encontraron issues con el _id ${id}`
                })
            };

        return res.status(200).json({
            msj: `Se encontró exitosamente la issue _id:${id}`,
            issue
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        })

    } 
};//

export const solveIssueByID = async ( req:Request, res: Response ) => {
    const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid( id )) {
            return res.status(400).json({
                msj: "El formato del ID no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
            });
        }

    const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({
                msj: `No se encontraron issues con el _id ${id}`
            })
        };
    

        if (issue.resuelta) {
            return res.status(400).json({
                msj: `La issue con el _id ${id} ya se encuentra resuelta`
            })
        };

    try {
        const issue = await Issue.findByIdAndUpdate( id, { resuelta: true }, { new: true } );

        return res.status(200).json({
            msj: `Se resolvió exitosamente la issue _id:${id}`,
            issue
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        })

    } 
};//

export const deleteIssueByID = async ( req:Request, res: Response ) => {
    const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid( id )) {
            return res.status(400).json({
                msj: "El formato del ID no es válido. Debe ser una cadena de 24 caracteres hexadecimales."
            });
        }

    try {
        const issue = await Issue.findByIdAndDelete( id );

            if (!issue) {
                return res.status(404).json({
                    msj: `No se encontraron issues con el _id ${id}`
                })
            };

        return res.status(200).json({
            msj: `Se eliminó exitosamente la issue _id:${id}`,
            issue
        })

    } catch(error){

        console.error(error);
        return res.status(500).json({
            msj: "Error interno del servidor. No se pueden mostrar los issues",
            error
        })

    } 
};//