import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use(userRouter)

const port = process.env.PORT || 4002;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app;
