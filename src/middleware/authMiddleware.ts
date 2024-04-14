import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define uma nova interface estendida da interface padrão Request
interface AuthRequest extends Request {
  userId?: string;
  firstName?: string;
}

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, async (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    req.userId = decoded.userId;
    req.firstName = decoded.firstName; // Retrieve firstName from decoded token
    next();
  });
};

export default requireAuth;
