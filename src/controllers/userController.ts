import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

const saltRounds = 10;

export const registerUser = async (req: Request, res: Response) => {
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

export const getUserInfo = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
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
