import { Request, Response } from 'express';
import httpStatus from 'http-status';
import * as UserService from '../services/userService';

async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UserService.createUser(email, password);
  
  return res.status(httpStatus.CREATED).send(user);
}

async function logIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await UserService.loginUser(email, password);

  return res.status(httpStatus.OK).send({ token });
}

export const userController = {
  signUp, logIn
}