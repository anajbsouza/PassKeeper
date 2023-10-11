import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function findByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

async function create(email: string, password: string): Promise<User> {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return user;
}

export const userRepository = {
  findByEmail, create
}