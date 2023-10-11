import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import userRouter from './routers/userRouter';
import credentialRouter from './routers/credentialRouter';
import { handleApplicationErrors } from './middlewares/error-handling-middleware';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use(userRouter)
  .use(credentialRouter)
  //.use(handleApplicationErrors)

export default app;
