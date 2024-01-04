import nodemailer from "nodemailer"

//Configuramos el transporte de nodemailer para usar Gmail
const transporter = nodemailer.createTransport({

    service: "gmail",
    auth: {
        user:"spozzo.desarrolloweb@gmail.com",
        pass:"xufjfjnuhtdxdmle"
    },
    from: "spozzo.desarrolloweb@gmail.com"

});

export const sendMail = async ( to:string, code:string ): Promise<void> => {
    
    try{

        const mailOptions = {
            from: "",
            to, //La clave to tiene como valor lo que pasamos en el primer parametro 
            subjetc: "Código de verificación para tu cuenta en .GTR",
            text: `
                Tu código de verificación para .GTR es: ${code}
            `
            //Agregar link para entrar a ingresar el código
        }

        await transporter.sendMail(mailOptions);
        console.log("El correo se envió correctamente");        

    } catch {
        console.error("Error al enviar el correo electrónico")
    }

}

export const sendNewPass = async ( to:string, pass:string ): Promise<void> => {
    
    try{

        const mailOptions = {
            from: "",
            to, //La clave to tiene como valor lo que pasamos en el primer parametro 
            subjetc: "Recuperación de contraseña para tu cuenta en .GTR",
            text: `
                Tu nueva contraseña para .GTR es: ${pass}.
                Recuerda cambiar tu contraseña después de iniciar sesión
            `
        }

        await transporter.sendMail(mailOptions);
        console.log("El correo de recuperación de contraseña se envió correctamente");        

    } catch {
        console.error("Error al enviar el correo electrónico")
    }

}