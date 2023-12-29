import { Router } from "express";

import { getUserByEmail, getUsers, hardDeleteUser, newUser, softDeleteUser, updateUser } from "../controllers/user";

const router = Router();

router.get('/', getUsers);
router.post('/', newUser);
router.get('/:email', getUserByEmail); //Establecemos que vamos a recibir el parametro email desde los params (en la url)
router.put('/:email', updateUser);
router.delete('/:email', hardDeleteUser);
router.put('/softDelete/:email', softDeleteUser)

export default router;