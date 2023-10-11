import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { userRepository } from '../repositories/userRepository';


export async function createUser(email: string, password: string): Promise<User> {
  // Verifique se o usuário já existe
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error('O e-mail já está em uso');
  }

  // Criptografe a senha antes de armazenar no banco de dados
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crie o novo usuário no banco de dados através do repositório
  const user = await userRepository.create(email, hashedPassword);

  return user;
}

export async function loginUser(email: string, password: string): Promise<string> {
  // Encontre o usuário com base no e-mail usando o repositório
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  // Verifique a senha
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Credenciais inválidas');
  }

  // Gere um token JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
}
