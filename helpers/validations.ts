import { error } from "console";
import User, { IUser } from "../models/user";
import { sendMail } from "../mailer/mailer";
import e from "express";

export const isRegisteredEmail =async ( email:string ): Promise<void> => {

    const registeredUser: IUser | null = await User.findOne({ email });

    if( registeredUser && registeredUser.verificado ){
        throw new Error(`El email: ${email} ya está registrado y verificado`)
    }

    if( registeredUser && !registeredUser.verificado ){
        await sendMail( email, registeredUser.codigo as string )
        throw new Error(`El email: ${email} ya está registrado. Se envió el nuevamente código de verificación al correo`)
    }
    
}