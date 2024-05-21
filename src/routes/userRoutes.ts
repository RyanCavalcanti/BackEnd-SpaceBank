import express from 'express';
import { adicionarSaldo, getTransactions, obterSaldo, registerUser, saveTransaction, subtrairSaldo } from '../controllers/userController';
import requireAuth from '../middleware/authMiddleware';
import { verifyToken } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);

router.get('/saldo', requireAuth, verifyToken, obterSaldo);

router.post('/saldo/entrada', requireAuth, verifyToken, adicionarSaldo);

router.post('/saldo/saida', requireAuth, verifyToken, subtrairSaldo); 

router.post('/extrato', verifyToken, saveTransaction, getTransactions);

router.get('/transacoes', requireAuth, verifyToken, getTransactions);

export default router;
