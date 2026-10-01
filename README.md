# Alfabetiza+

Aplicativo web educacional desenvolvido em **React + TypeScript + Vite**, com foco em alfabetização infantil, atividades pedagógicas, jogos, matemática, acompanhamento de progresso e área do professor.

## Recursos

- Tela de seleção entre aluno e professor
- Cadastro de alunos com nome e avatar
- Área do aluno
- Área do professor com senha
- Sondagem inicial
- Acompanhamento do nível de escrita
- Atividades de letras, sílabas, palavras, leitura e escrita
- Jogos educativos
- Atividades de matemática
- Dicas visuais em operações matemáticas
- Áudio com instruções
- Pontos, estrelas e conquistas
- Histórico de atividades
- Progresso individual por aluno
- Acesso por outros computadores da mesma rede
- Compartilhamento de cadastro, progresso, sondagem, nível de aprendizagem e histórico entre os computadores
- Servidor Node.js + Express para compartilhamento dos dados

---

## Configurar o Git

Antes de clonar ou enviar alterações para o repositório, configure seu nome e e-mail no Git:

```bash
git config --global user.name "raphaelmarques3655"
git config --global user.email "raphaelmarques3655@gmail.com"
```

Para conferir:

```bash
git config --global user.name
git config --global user.email
```

Deve aparecer:

```text
raphaelmarques3655
raphaelmarques3655@gmail.com
```

---

## Clonar o projeto

```bash
git clone https://github.com/guirinaldi15/JogoEducacional.git
```

Depois entre na pasta:

```bash
cd JogoEducacional
```

# Como iniciar o projeto

Para utilizar o Alfabetiza+, é necessário iniciar o servidor e o site ao mesmo tempo.

Abra **dois terminais**.

## Terminal 1 — Servidor

Entre na pasta `server`:

```bash
cd C:\Users\Aluno\JogoEducacional\server
```

Depois execute:

```bash
npm start
```

Mantenha esse terminal aberto.

---

## Terminal 2 — Site

Entre na pasta principal do projeto:

```bash
cd C:\Users\Aluno\JogoEducacional
```

Depois execute:

```bash
npm run dev
```

Mantenha esse terminal aberto.

---

## Resumo

Sempre que quiser iniciar o Alfabetiza+, basta executar:

```text
SERVER:
npm start

JOGO:
npm run dev
```

Ou seja:

- Na pasta `server` → `npm start`
- Na pasta principal do jogo → `npm run dev`

Depois, abra no navegador o endereço mostrado pelo Vite.

No próprio computador normalmente será:

```text
http://localhost:5173/
```

Para outros computadores da mesma rede, utilize o endereço `Network` mostrado no terminal.

## Como acessar o Alfabetiza+ pelos endereços

Quando o projeto estiver rodando, existem dois tipos principais de endereço:

### Acesso no próprio computador que iniciou o projeto

No computador que está executando:

```bash
npm start
```

na pasta `server`, e:

```bash
npm run dev
```

na pasta principal do jogo, use:

```text
http://localhost:5173/
```

Esse endereço funciona somente no próprio computador que está hospedando o projeto.

Para testar o servidor nesse mesmo computador, use:

```text
http://localhost:3001/api/teste
```

---

### Acesso por outros computadores da mesma rede

Quando você executar:

```bash
npm run dev
```

o Vite mostrará algo parecido com:

```text
Local:   http://localhost:5173/
Network: http://10.137.11.230:5173/
```

O endereço `Local` é usado apenas no computador host:

```text
http://localhost:5173/
```

O endereço `Network` deve ser usado pelos outros computadores conectados à mesma rede:

```text
http://10.137.11.230:5173/
```

O IP pode ser diferente em cada computador ou em cada rede.

Exemplos:

```text
http://192.168.0.15:5173/
http://192.168.1.20:5173/
http://10.137.11.230:5173/
```

O importante é utilizar exatamente o endereço que aparecer na linha:

```text
Network:
```

---

## Resumo dos endereços

| Endereço | Quem usa | Para que serve |
|---|---|---|
| `http://localhost:5173/` | Computador host | Acessar o jogo |
| `http://localhost:3001/api/teste` | Computador host | Testar o servidor |
| `http://IP_DO_HOST:5173/` | Outros PCs da mesma rede | Acessar o jogo |
| `http://IP_DO_HOST:3001/api/teste` | Outros PCs da mesma rede | Testar o servidor |

Exemplo:

```text
Computador que iniciou o projeto:
http://localhost:5173/

Outro computador da mesma rede:
http://10.137.11.230:5173/
```

---

## Exemplo prático

Imagine que o computador que está rodando o Alfabetiza+ possui o IP:

```text
10.137.11.230
```

Nesse computador, o acesso pode ser feito por:

```text
http://localhost:5173/
```

ou:

```text
http://10.137.11.230:5173/
```

Nos outros computadores da mesma rede, use:

```text
http://10.137.11.230:5173/
```

Para testar o backend no computador host:

```text
http://localhost:3001/api/teste
```

Para testar o backend em outro computador da rede:

```text
http://10.137.11.230:3001/api/teste
```

Os computadores precisam estar conectados à mesma rede.

O IP `10.137.11.230` é apenas um exemplo. Sempre utilize o IP mostrado pelo Vite na opção `Network`.

## Autores

**Guilherme Rinaldi da Silva**

**Raphael Marques**

**Gabriel Dal Ponte**

**Fabio Gustavo**

Projeto desenvolvido no contexto do curso de **Análise e Desenvolvimento de Sistemas — SENAI**.