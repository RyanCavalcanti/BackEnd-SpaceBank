import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post('/register', registerUser);

// Rota para fazer login
router.post('/login', loginUser);

export default router;
