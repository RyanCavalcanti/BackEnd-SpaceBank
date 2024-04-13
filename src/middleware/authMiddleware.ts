import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define uma nova interface estendida da interface padrão Request
interface AuthRequest extends Request {
  userId?: string;
}

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.userId = decoded.userId; // Define a propriedade userId no objeto req
    next();
  });
};

export default requireAuth;
