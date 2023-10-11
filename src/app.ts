import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import userRouter from './routers/userRouter';
import credentialRouter from './routers/credentialRouter';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req: Request, res: Response) => res.send('OK!'))
  .use(userRouter)
  .use(credentialRouter)
  // @ts-ignore
  .use(handleApplicationErrors)

export default app;
