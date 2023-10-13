import { faker } from "@faker-js/faker";
import { Credential } from '@prisma/client';
import prisma from "../../src/database";

export async function createCredential(params: Partial<Credential> = {}, userId: number): Promise<Credential> {
  const credentialData = {
    title: faker.lorem.word(),
    url: faker.internet.url(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    userId,
    ...params,
  };

  const createdCredential = await prisma.credential.create({
    data: credentialData,
  });

  return createdCredential;
}
