import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { userRepository } from '../repositories/userRepository';
import { duplicatedEmailError, notFoundError, unauthorizedError, validationError } from '../errors/errors';

export async function createUser(email: string, password: string): Promise<User> {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw duplicatedEmailError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.create(email, hashedPassword);

  return user;
}

export async function loginUser(email: string, password: string): Promise<string> {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw notFoundError();
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw unauthorizedError();
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
}
