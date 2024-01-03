"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerifiedUser = void 0;
const isVerifiedUser = (req, res, next) => {
    const { verificado } = req.body.confirmedUser;
    if (!verificado) {
        return res.status(401).json({
            msj: "El usuario no está correctamente verificado"
        });
    }
    ;
    next();
};
exports.isVerifiedUser = isVerifiedUser;
//# sourceMappingURL=isVerifiedUser.js.map