import express from 'express';
import { loginUser, verifyToken } from '../controllers/authController';
import { getUserInfo } from '../controllers/userController';
import requireAuth from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);

router.get('/user', requireAuth, verifyToken, getUserInfo);

export default router;
