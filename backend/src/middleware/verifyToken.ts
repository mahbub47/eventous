import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    console.log("NO TOKEN PROVIDED!!!");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    console.log("DONE!!!");
    next();
    return;
  } catch (err) {
    res.status(403).json({ message: 'Invalid token', error: err});
    console.log("INVALID TOKEN!!!");
    return;
  }
};