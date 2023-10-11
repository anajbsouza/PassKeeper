import Cryptr from 'cryptr';
import { credentialRepository } from '../repositories/credentialRepository';
import { ApplicationError, CreateCredential } from 'protocols';
import { notFoundError, validationError } from '../errors/errors';

const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

async function createCredential(credential: CreateCredential) {
  const { title, url, username, password, userId } = credential;
  console.log('userId', userId);
  if (!title || !url || !username || !password || !userId) {
    throw validationError();
  }
  const credentialAlreadyExists = await credentialRepository.findByTitle(title);
  if (credentialAlreadyExists) throw validationError();
  const encryptedPassword = cryptr.encrypt(password);
  const newCredential = await credentialRepository.create({
    title,
    url,
    username,
    password: encryptedPassword,
    userId,
  });
  return newCredential;
}

async function getCredentials() {
  const credentials = await credentialRepository.findAll();
  if (!credentials || credentials.length === 0) throw notFoundError();
  return credentials;
}

async function getCredentialById(id: number) {
  const credential = await credentialRepository.findById(id);
  if (!credential) throw notFoundError();
  return credential;
}

async function deleteCredential(id: number) {
  const credential = await credentialRepository.findById(id);
  if (!credential) throw notFoundError();
  await credentialRepository.deleteCredential(id);
}

function decryptPassword(encryptedPassword: string): string {
  return cryptr.decrypt(encryptedPassword);
}

export const credentialService = {
  createCredential,
  getCredentials,
  getCredentialById,
  deleteCredential,
  decryptPassword,
};