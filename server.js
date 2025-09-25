const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(".")); // Servir index.html e outros arquivos

// Função auxiliar para salvar em JSON
function salvarDados(arquivo, novoItem) {
  const filePath = path.join(__dirname, "dados", arquivo);
  let dados = [];

  if (fs.existsSync(filePath)) {
    dados = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  dados.push(novoItem);
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2), "utf-8");
}

// Rota salvar contato
app.post("/salvar-contato", (req, res) => {
  salvarDados("contatos.json", req.body);
  res.json({ sucesso: true, msg: "Contato salvo com sucesso!" });
});

// Rota salvar conta
app.post("/salvar-conta", (req, res) => {
  salvarDados("contas.json", req.body);
  res.json({ sucesso: true, msg: "Conta criada com sucesso!" });
});

// Rota para listar contas em tempo real
app.get("/contas", (req, res) => {
  const filePath = path.join(__dirname, "dados", "contas.json");
  const contas = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : [];
  res.json(contas);
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
