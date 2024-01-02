import mongoose from "mongoose";

export const connectDB =async ():Promise<void> => {
    try{
        const DataBaseURL = process.env.DB_URL;

            if(!DataBaseURL){
                throw new Error("Error al iniciar base de datos. La URL no está correctamente definida en .env")
            }

        await mongoose.connect(DataBaseURL)
        console.log("Base de datos online");
        
    }catch(error){

        console.log(error);
        throw new Error("Error al iniciar base de datos")
        
    }
}