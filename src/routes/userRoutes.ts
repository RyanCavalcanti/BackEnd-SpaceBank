import express from 'express';
import { adicionarSaldo, getTransactions, obterSaldo, registerUser, saveTransaction, subtrairSaldo } from '../controllers/userController'; // Adicionado subtrairSaldo
import requireAuth from '../middleware/authMiddleware';
import { verifyToken } from '../controllers/authController';

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post('/register', registerUser);

// Rota protegida para obter saldo do usuário autenticado
router.get('/obter-saldo', requireAuth, verifyToken, obterSaldo);

// Rota protegida para adicionar saldo ao usuário autenticado
router.post('/adicionar-saldo', requireAuth, verifyToken, adicionarSaldo);

// Rota protegida para diminuir saldo ao usuário autenticado
router.post('/subtrair-saldo', requireAuth, verifyToken, subtrairSaldo); // Adicionado rota para subtrair saldo

// Rota protegida para enviar extratos para o banco de dados
router.post('/salvar-extrato', saveTransaction);

// Rota protegida para buscar os extratos do banco de dados
router.get('/buscar-transacoes', requireAuth, verifyToken, getTransactions);

export default router;
