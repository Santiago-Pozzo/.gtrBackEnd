import mongoose from "mongoose";

export const connectDB =async ():Promise<void> => {
    try{

        await mongoose.connect("mongodb+srv://santiagopozzo:7yrCEEoEbY0kCtCd@integradordb.nbaaepj.mongodb.net/")
        console.log("Base de datos online");
        
    }catch(error){

        console.log(error);
        throw new Error("Error al iniciar base de datos")
        
    }
}