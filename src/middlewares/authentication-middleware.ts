import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from '../errors/errors';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  console.log('Auth Header:', authHeader);

  if (!authHeader) throw unauthorizedError();

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);
  if (!token) throw unauthorizedError();

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    console.log('Decoded Token:', decodedToken);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err);
    throw unauthorizedError();
  }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
