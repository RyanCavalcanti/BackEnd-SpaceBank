import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
  firstName?: string;
}

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Não autorizado' });
    }
    
    req.userId = decoded.userId;
    req.firstName = decoded.firstName;
    next();
  });
};

export default requireAuth;
