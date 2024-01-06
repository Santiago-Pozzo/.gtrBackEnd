"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActiveUser = void 0;
const isActiveUser = (req, res, next) => {
    const { estado } = req.body.confirmedUser;
    if (!estado) {
        return res.status(401).json({
            msj: "El usuario no tiene una cuenta activa"
        });
    }
    ;
    next();
};
exports.isActiveUser = isActiveUser;
//# sourceMappingURL=isActiveUser.js.map