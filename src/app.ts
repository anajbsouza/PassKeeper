import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import credentialRouter from './routers/credentialRouter';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use(userRouter)
  .use(credentialRouter)

// const port = process.env.PORT || 4003;

// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });

export default app;
