import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

const corsOptions = {
  origin: 'https://space-bank.vercel.app', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}))

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
