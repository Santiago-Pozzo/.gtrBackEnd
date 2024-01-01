import mongoose from "mongoose";

//Función auxiliar para validar formato email
export const isValidEmail = (email:string) => (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email));
