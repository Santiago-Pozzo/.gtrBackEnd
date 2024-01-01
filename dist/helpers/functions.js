"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
//Función auxiliar para validar formato email
const isValidEmail = (email) => (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email));
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=functions.js.map