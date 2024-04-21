import express from 'express';
import { adicionarSaldo, getTransactions, obterSaldo, registerUser, saveTransaction, subtrairSaldo } from '../controllers/userController';
import requireAuth from '../middleware/authMiddleware';
import { verifyToken } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);

router.get('/obter-saldo', requireAuth, verifyToken, obterSaldo);

router.post('/adicionar-saldo', requireAuth, verifyToken, adicionarSaldo);

router.post('/subtrair-saldo', requireAuth, verifyToken, subtrairSaldo); 

router.post('/salvar-extrato', saveTransaction);

router.get('/buscar-transacoes', requireAuth, verifyToken, getTransactions);

export default router;
