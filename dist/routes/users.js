"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/', user_1.getUsers);
router.post('/', user_1.newUser);
router.get('/:email', user_1.getUserByEmail); //Establecemos que vamos a recibir el parametro email desde los params (en la url)
router.put('/:email', user_1.updateUser);
router.delete('/:email', user_1.hardDeleteUser);
router.put('/softDelete/:email', user_1.softDeleteUser);
router.put('/restore/:email', user_1.restoreUser);
exports.default = router;
//# sourceMappingURL=users.js.map