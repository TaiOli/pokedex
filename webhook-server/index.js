const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.post('/github-webhook', (req, res) => {
  console.log('Webhook recebido do GitHub:');
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send('Webhook recebido com sucesso!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});