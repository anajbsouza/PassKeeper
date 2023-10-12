import Cryptr from 'cryptr';
import { credentialRepository } from '../repositories/credentialRepository';
import { ApplicationError, CreateCredential } from 'protocols';
import { notFoundError, validationError } from '../errors/errors';

const cryptr = new Cryptr(process.env.CRYPTO_SECRET);

async function createCredential(credential: CreateCredential) {
  const { title, url, username, password, userId } = credential;
  console.log('Credential: ', credential);
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
  console.log('Service de Credentials:', credentials);
  if (!credentials || credentials.length === 0) throw notFoundError();
  const credentialsWithDecryptedPassword = credentials.map((credential) => {
		const { password } = credential;
		const decryptedPassword = cryptr.decrypt(password);
		return { ...credential, password: decryptedPassword };
	});
  return credentialsWithDecryptedPassword;
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

export const credentialService = {
  createCredential,
  getCredentials,
  getCredentialById,
  deleteCredential,
};