import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from '../services/index-service';

export async function signUpPost(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userService.createUser({ email, password });

  return res.status(httpStatus.CREATED).json({
    id: user.id,
    email: user.email,
  });
}
