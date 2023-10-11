import express from 'express';
import cors from 'cors';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get('/health', (_req, res) => res.send('OK!'))
    .use('/api/users', userRouter)
    .use('/api/credentials', credentialRouter)

export default app;