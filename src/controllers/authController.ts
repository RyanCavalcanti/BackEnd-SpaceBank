import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/db';
import { RowDataPacket } from 'mysql2';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.userId = decoded.userId;
    next();
  });
};

export const loginUser = async (req: Request, res: Response) => {
  console.log('Received login request');
  const { email, password } = req.body;

  try {
    const [user] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as RowDataPacket[];

    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const hashedPasswordFromDB = user[0].password;

    const match = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user[0].id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, userId: user[0].id });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

