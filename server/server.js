const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

const DATA_FILE = path.join(__dirname, 'dados.json');

function estruturaInicial() {
  return {
    alunos: [],
    progresso: {},
    aprendizagem: {}
  };
}

function normalizarDados(dados) {
  return {
    alunos: Array.isArray(dados?.alunos) ? dados.alunos : [],
    progresso:
      dados?.progresso && typeof dados.progresso === 'object'
        ? dados.progresso
        : {},
    aprendizagem:
      dados?.aprendizagem && typeof dados.aprendizagem === 'object'
        ? dados.aprendizagem
        : {}
  };
}

function carregarDados() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const inicial = estruturaInicial();
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(inicial, null, 2),
        'utf8'
      );
      return inicial;
    }

    const conteudo = fs.readFileSync(DATA_FILE, 'utf8');
    return normalizarDados(JSON.parse(conteudo));
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return estruturaInicial();
  }
}

function salvarDados(dados) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(normalizarDados(dados), null, 2),
    'utf8'
  );
}

app.get('/api/teste', (req, res) => {
  res.json({
    mensagem: 'Servidor Alfabetiza+ funcionando!'
  });
});

app.get('/api/alunos', (req, res) => {
  const dados = carregarDados();
  res.json(dados.alunos);
});

app.post('/api/alunos', (req, res) => {
  const dados = carregarDados();

  const nome = String(req.body.nome ?? req.body.name ?? '').trim();

  if (!nome) {
    return res.status(400).json({
      mensagem: 'O nome do aluno é obrigatório.'
    });
  }

  const novoAluno = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nome,
    avatar: req.body.avatar || '🧒',
    criadoEm: new Date().toISOString()
  };

  dados.alunos.push(novoAluno);

  // Todo novo aluno já nasce com espaços próprios no servidor.
  dados.progresso[novoAluno.id] = null;
  dados.aprendizagem[novoAluno.id] = null;

  salvarDados(dados);

  res.status(201).json(novoAluno);
});

app.delete('/api/alunos/:id', (req, res) => {
  const dados = carregarDados();

  dados.alunos = dados.alunos.filter(
    aluno => String(aluno.id) !== String(req.params.id)
  );

  delete dados.progresso[req.params.id];
  delete dados.aprendizagem[req.params.id];

  salvarDados(dados);

  res.json({
    mensagem: 'Aluno removido'
  });
});

app.get('/api/progresso/:id', (req, res) => {
  const dados = carregarDados();

  res.json(
    Object.prototype.hasOwnProperty.call(
      dados.progresso,
      req.params.id
    )
      ? dados.progresso[req.params.id]
      : null
  );
});

app.put('/api/progresso/:id', (req, res) => {
  const dados = carregarDados();

  dados.progresso[req.params.id] = req.body;

  salvarDados(dados);

  res.json(dados.progresso[req.params.id]);
});

app.get('/api/aprendizagem/:id', (req, res) => {
  const dados = carregarDados();

  res.json(
    Object.prototype.hasOwnProperty.call(
      dados.aprendizagem,
      req.params.id
    )
      ? dados.aprendizagem[req.params.id]
      : null
  );
});

app.put('/api/aprendizagem/:id', (req, res) => {
  const dados = carregarDados();

  dados.aprendizagem[req.params.id] = req.body;

  salvarDados(dados);

  res.json(dados.aprendizagem[req.params.id]);
});

app.get('/api/alunos/:id/completo', (req, res) => {
  const dados = carregarDados();

  const aluno = dados.alunos.find(
    item => String(item.id) === String(req.params.id)
  );

  if (!aluno) {
    return res.status(404).json({
      mensagem: 'Aluno não encontrado.'
    });
  }

  res.json({
    aluno,
    progresso: dados.progresso[req.params.id] ?? null,
    aprendizagem: dados.aprendizagem[req.params.id] ?? null
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('Servidor Alfabetiza+ rodando!');
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Rede: http://SEU_IP:${PORT}`);
});
