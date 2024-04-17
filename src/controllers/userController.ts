// userController.ts
import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

const saltRounds = 10;

interface AuthRequest extends Request {
  userId?: string;
}

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

export const obterSaldo = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  try {
    const [user] = await pool.query(
      'SELECT saldo FROM users WHERE id = ?',
      [userId]
    ) as RowDataPacket[];

    if (user.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const saldoAtual = user[0].saldo;

    res.status(200).json({ saldo: saldoAtual });
  } catch (error) {
    console.error('Erro ao obter saldo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const adicionarSaldo = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const { valorTransacao } = req.body;

  try {
    // Verifica se o valor da transação é válido e positivo
    const valor = parseFloat(valorTransacao);
    if (isNaN(valor) || valor <= 0) {
      return res.status(400).json({ message: 'Valor de transação inválido' });
    }

    // Consulta o saldo atual do usuário
    const [user] = await pool.query(
      'SELECT saldo FROM users WHERE id = ?',
      [userId]
    ) as RowDataPacket[];

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const saldoAtual = user[0].saldo;
    const novoSaldo = saldoAtual + valor; // Soma o valor ao saldo atual

    // Atualiza o saldo do usuário no banco de dados
    await pool.query(
      'UPDATE users SET saldo = ? WHERE id = ?',
      [novoSaldo, userId]
      );

    res.status(200).json({ message: 'Saldo adicionado com sucesso', novoSaldo });
  } catch (error) {
    console.error('Erro ao adicionar saldo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const subtrairSaldo = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const { valorTransacao } = req.body;

  try {
    // Primeiro, verificamos se o valor da transação é um número válido
    const valor = parseFloat(valorTransacao);
    if (isNaN(valor) || valor <= 0) {
      return res.status(400).json({ message: 'Valor de transação inválido' });
    }

    // Consultamos o saldo atual do usuário
    const [user] = await pool.query(
      'SELECT saldo FROM users WHERE id = ?',
      [userId]
    ) as RowDataPacket[];

    if (!user || user.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const saldoAtual = user[0].saldo;

    // Verificamos se o usuário tem saldo suficiente para a transação
    const novoSaldo = saldoAtual - valor;
    if (novoSaldo < 0) {
      return res.status(400).json({ message: 'Saldo insuficiente' });
    }

    // Atualizamos o saldo do usuário no banco de dados
    await pool.query(
      'UPDATE users SET saldo = ? WHERE id = ?',
      [novoSaldo, userId]
    );

    res.status(200).json({ message: 'Saldo subtraído com sucesso', novoSaldo });
  } catch (error) {
    console.error('Erro ao subtrair saldo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
