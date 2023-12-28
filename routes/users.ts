import { Router } from "express";

import { getUsers, newUser } from "../controllers/user";

const router = Router();

router.get('/', getUsers);
router.post('/', newUser);

export default router;