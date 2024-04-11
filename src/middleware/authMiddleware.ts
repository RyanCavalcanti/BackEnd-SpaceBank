import { Request, Response, NextFunction } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Aqui você pode implementar a lógica de verificação do token JWT, se desejar

  next();
};

export default requireAuth;
