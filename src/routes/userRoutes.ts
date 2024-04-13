import express from 'express';
import { registerUser } from '../controllers/userController';

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post('/register', registerUser);

export default router;
