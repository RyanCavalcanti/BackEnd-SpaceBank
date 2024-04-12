import express from 'express';
import { loginUser, verifyToken } from '../controllers/authController';
import { getUserInfo } from '../controllers/userController';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

// Rota protegida para obter informações do usuário autenticado
router.get('/user', requireAuth, verifyToken, getUserInfo);

router.post('/login', loginUser);

export default router;
