import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { usersRouter } from './routers/users-router';
import { authenticationRouter } from './routers/authentication-router';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';
import { connectDb, disconnectDB } from './config/database';


const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/sign-up', usersRouter)
  .use('/sign-in', authenticationRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
