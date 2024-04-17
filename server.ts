import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());

app.use(express.urlencoded({extended: true}))

// Middleware
app.use(express.json());

// Rotas de usuário
app.use('/api/users', userRoutes);

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
