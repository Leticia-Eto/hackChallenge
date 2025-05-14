const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Servir arquivos estáticos (HTML, CSS, JS) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Função para ler os dados do arquivo JSON
function readDataFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

// Caminho do arquivo de dados (JSON)
const filePath = path.resolve(__dirname, 'data.json');

// Dados do arquivo JSON
const data = readDataFile(filePath);

// Rota principal (serve o index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para verificar inscrição
app.get('/verificar/:codigo', (req, res) => {
  const { codigo } = req.params;
  const palestra = data.find(entry => entry.codigo === codigo);

  if (palestra) {
    res.status(200).json({
      mensagem: 'Inscrição válida!',
      palestra: palestra.palestra,
      palestrante: palestra.palestrante,
      empresa: palestra.empresa
    });
  } else {
    res.status(404).json({ mensagem: 'Inscrição não encontrada!' });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
