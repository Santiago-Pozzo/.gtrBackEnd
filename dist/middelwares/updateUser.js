"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNewUserData = void 0;
const setNewUserData = (req, res, next) => {
    const { confirmedUser, nombre, apellido, contraseña, email } = req.body;
    //si email no es null hay que cambiar verificado a null y volver a enviar el codigo de verificación
    try {
        const newUserData = {
            nombre: nombre || confirmedUser.nombre,
            apellido: apellido || confirmedUser.apellido,
            email: email || confirmedUser.email,
            contraseña: contraseña || confirmedUser.contraseña
        };
        req.body.newUserData = newUserData;
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msj: "Error al modificar los datos del usuario"
        });
    }
};
exports.setNewUserData = setNewUserData;
//# sourceMappingURL=updateUser.js.map