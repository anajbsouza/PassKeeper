import app from './app';
const port = process.env.PORT || 4002;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
