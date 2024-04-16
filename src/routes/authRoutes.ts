import express from 'express';
import { loginUser, verifyToken } from '../controllers/authController';
import { adicionarSaldo, getUserInfo, obterSaldo } from '../controllers/userController';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
// Rota protegida para obter informações do usuário autenticado
router.get('/user', requireAuth, verifyToken, getUserInfo);

// Rota protegida para obter saldo do usuário autenticado
router.get('/obter-saldo', requireAuth, verifyToken, obterSaldo);

// Rota protegida para adicionar saldo ao usuário autenticado
router.post('/adicionar-saldo', requireAuth, verifyToken, adicionarSaldo);

export default router;
