import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

interface AuthRequest extends Request {
  userId?: string;
}

export const registerUser = async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as RowDataPacket[];

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.query(
      'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  console.log('Received login request'); // Adicione este log para depuração
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const [user] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as RowDataPacket[];

    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Recuperar o hash da senha armazenada no banco de dados
    const hashedPasswordFromDB = user[0].password;

    // Comparar o hash da senha fornecida pelo usuário com o hash armazenado no banco de dados
    const match = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Se as senhas coincidirem, o login é bem-sucedido
    const token = jwt.sign({ userId: user[0].id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const [user] = await pool.query(
      'SELECT id, firstName, lastName, email FROM users WHERE id = ?',
      [userId]
    ) as RowDataPacket[];

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: user[0] });
  } catch (error) {
    console.error('Error getting user info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
