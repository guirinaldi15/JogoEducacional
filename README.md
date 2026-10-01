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

# Como rodar o projeto

## 1. Requisitos

Antes de começar, tenha instalado:

- Node.js
- npm
- Git
- VS Code ou outro editor de código

Para verificar se o Node.js está instalado:

```bash
node -v
```

Para verificar o npm:

```bash
npm -v
```

---

## 2. Configurar o perfil do Git

Antes de trabalhar com o repositório nesta máquina, configure o perfil do Git:

```bash
git config --global user.name "raphaelmarques3655"
git config --global user.email "raphaelmarques3655@gmail.com"
```

Para verificar se o perfil foi configurado corretamente:

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

## 3. Baixar o projeto

Caso ainda não tenha o projeto no computador:

```bash
git clone https://github.com/guirinaldi15/JogoEducacional.git
```

Depois entre na pasta:

```bash
cd JogoEducacional
```

---

## 4. Instalar as dependências do projeto

Na pasta principal do projeto:

```bash
npm install
```

Esse comando instala as dependências do React, Vite e demais bibliotecas utilizadas.

Depois entre na pasta do servidor:

```bash
cd server
```

Instale as dependências do servidor:

```bash
npm install
```

Depois volte para a pasta principal:

```bash
cd ..
```

---

# Rodando somente no computador local

Para utilizar o Alfabetiza+ corretamente, é necessário manter o frontend e o backend funcionando ao mesmo tempo.

Abra dois terminais.

## Terminal 1 — React / Vite

Na pasta principal do projeto:

```bash
npm run dev
```

O Vite deverá mostrar algo parecido com:

```text
Local:   http://localhost:5173/
Network: http://10.137.11.230:5173/
```

No próprio computador, abra:

```text
http://localhost:5173/
```

---

## Terminal 2 — Node.js / Express

Entre na pasta do servidor:

```bash
cd server
```

Depois execute:

```bash
npm start
```

O terminal deverá mostrar algo semelhante a:

```text
Servidor Alfabetiza+ rodando!

Local: http://localhost:3001
Rede: http://SEU_IP:3001
```

---

# Rodando para outros computadores da mesma rede

O projeto está configurado para permitir acesso pela rede automaticamente.

Não é mais necessário executar:

```bash
npm run dev -- --host
```

Agora basta executar:

```bash
npm run dev
```

Isso acontece porque o `package.json` principal possui:

```json
"scripts": {
  "dev": "vite --host 0.0.0.0",
  "build": "vite build",
  "preview": "vite preview --host 0.0.0.0"
}
```

O terminal do Vite deverá mostrar algo parecido com:

```text
Local:   http://localhost:5173/
Network: http://10.137.11.230:5173/
```

O endereço `Network` pode mudar dependendo do computador ou da rede utilizada.

No outro computador, abra o navegador e digite o endereço exibido em `Network`.

Exemplo:

```text
http://10.137.11.230:5173/
```

Os computadores precisam estar conectados à mesma rede.

---

# Servidor de dados com Node.js + Express

O Alfabetiza+ utiliza um servidor Node.js + Express para permitir que os dados sejam compartilhados entre os computadores.

Atualmente, o servidor compartilha:

- Cadastro dos alunos
- Progresso individual
- Resultado da sondagem inicial
- Nível de aprendizagem
- Histórico de atividades
- Histórico de evolução dos níveis
- Exercícios já realizados por cada aluno

A pasta do servidor é:

```text
server/
```

Antes da primeira execução, entre na pasta:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

Depois inicie o servidor:

```bash
npm start
```

O comando `npm start` executa:

```text
node server.js
```

O terminal deverá mostrar algo semelhante a:

```text
Servidor Alfabetiza+ rodando!

Local: http://localhost:3001
Rede: http://SEU_IP:3001
```

---

# Importante: usar dois terminais

Para que o site e o servidor funcionem ao mesmo tempo, deixe **dois terminais abertos**.

## Terminal 1 — React / Vite

Entre na pasta principal:

```bash
cd C:\Users\Aluno\JogoEducacional
```

Depois rode:

```bash
npm run dev
```

Não feche esse terminal.

## Terminal 2 — Node.js / Express

Abra outro Prompt de Comando ou terminal.

Entre na pasta do servidor:

```bash
cd C:\Users\Aluno\JogoEducacional\server
```

Depois rode:

```bash
npm start
```

Também não feche esse terminal.

---

# Como acessar

## No computador host

Abra:

```text
http://localhost:5173/
```

ou utilize o endereço `Network` exibido pelo Vite.

Exemplo:

```text
http://10.137.11.230:5173/
```

## Em outro computador da mesma rede

Abra o endereço exibido como `Network` no terminal do Vite.

Exemplo:

```text
http://10.137.11.230:5173/
```

Substitua `10.137.11.230` pelo IP exibido no computador que estiver funcionando como host.

---

# IP automático do servidor

Anteriormente, o endereço do backend era fixado diretamente no código.

Agora o sistema utiliza:

```ts
const API_URL = `http://${window.location.hostname}:3001/api`;
```

Isso faz com que o Alfabetiza+ utilize automaticamente o IP do computador que estiver funcionando como host.

Por exemplo, se o computador host possuir:

```text
10.137.11.50
```

o sistema acessará automaticamente:

```text
http://10.137.11.50:3001/api
```

Se outro computador assumir como host e possuir:

```text
10.137.11.80
```

o sistema utilizará:

```text
http://10.137.11.80:3001/api
```

Não é necessário alterar o `App.tsx` quando o IP do computador mudar.

---

# Como testar o servidor

No computador host, abra:

```text
http://localhost:3001/api/teste
```

Se estiver funcionando, deverá aparecer:

```json
{
  "mensagem": "Servidor Alfabetiza+ funcionando!"
}
```

Para testar pelo outro computador da rede:

```text
http://IP_DO_HOST:3001/api/teste
```

Exemplo:

```text
http://10.137.11.230:3001/api/teste
```

Se essa página abrir, o outro computador está conseguindo acessar o servidor de dados.

---

# Como descobrir o IP do computador host

No Windows, abra o Prompt de Comando:

```bash
ipconfig
```

Procure por:

```text
Endereço IPv4
```

Exemplo:

```text
10.137.11.230
```

Então o endereço do Alfabetiza+ será:

```text
http://10.137.11.230:5173/
```

E o servidor será:

```text
http://10.137.11.230:3001/
```

---

# Qual computador pode ser o servidor?

Qualquer computador que possua o projeto instalado pode iniciar o Alfabetiza+.

Nesse computador, basta iniciar o backend:

```bash
cd C:\Users\Aluno\JogoEducacional\server

npm start
```

Depois, em outro terminal, iniciar o frontend:

```bash
cd C:\Users\Aluno\JogoEducacional

npm run dev
```

Esse computador passa a ser o host da aplicação durante aquela execução.

Os outros computadores da mesma rede devem acessar o endereço `Network` exibido no terminal do Vite.

---

# Firewall do Windows

Na primeira vez que executar:

```bash
npm run dev
```

ou:

```bash
npm start
```

o Windows pode pedir permissão no Firewall.

Permita o acesso em **Redes privadas**.

Se outro computador não conseguir acessar, verifique se o Node.js está permitido no Firewall do Windows.

Também verifique se as portas abaixo não estão sendo bloqueadas:

```text
5173
3001
```

---

# Encerrar o projeto

Para parar o Vite ou o servidor Node.js, vá até o terminal correspondente e pressione:

```text
Ctrl + C
```

Se aparecer:

```text
Deseja finalizar o arquivo em lotes (S/N)?
```

digite:

```text
S
```

e pressione Enter.

---

# Uso rápido nas próximas vezes

Depois que tudo estiver instalado, normalmente basta abrir dois terminais.

## Terminal 1

```bash
cd C:\Users\Aluno\JogoEducacional

npm run dev
```

## Terminal 2

```bash
cd C:\Users\Aluno\JogoEducacional\server

npm start
```

Depois acesse:

```text
http://localhost:5173/
```

ou, em outro computador da rede:

```text
http://IP_DO_HOST:5173/
```

---

# Atualizando o projeto pelo GitHub

Depois de fazer alterações no projeto, verifique os arquivos modificados:

```bash
git status
```

Adicione as alterações:

```bash
git add .
```

Crie um commit:

```bash
git commit -m "Atualiza projeto Alfabetiza+"
```

Depois envie as alterações para o GitHub:

```bash
git push
```

Caso esteja utilizando outro computador que já tenha o projeto clonado, atualize os arquivos com:

```bash
git pull
```

Se houver alterações nas dependências do frontend:

```bash
npm install
```

Se houver alterações nas dependências do servidor:

```bash
cd server
npm install
```

---

# Build para produção

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta:

```text
dist/
```

---

# Observações

Atualmente, os dados de cadastro dos alunos, progresso, sondagem, nível de aprendizagem e histórico de atividades são compartilhados pelo servidor Node.js + Express.

Os dados são armazenados no arquivo:

```text
server/dados.json
```

Enquanto vários computadores estiverem acessando o **mesmo computador host**, todos utilizam os mesmos dados.

Por exemplo:

```text
PC HOST
   │
   ├── PC 2
   ├── PC 3
   ├── PC 4
   └── PC 5
```

Todos utilizam o `dados.json` existente no computador host.

---

# Importante sobre o dados.json

Atualmente, cada computador que possui uma cópia do projeto também possui sua própria cópia do arquivo:

```text
server/dados.json
```

Por isso:

```text
PC 1 como servidor
→ utiliza o dados.json do PC 1

PC 2 como servidor
→ utiliza o dados.json do PC 2
```

Ou seja, qualquer computador pode iniciar o servidor, mas os dados utilizados serão os dados existentes naquele computador.

Para que diferentes computadores possam assumir o servidor mantendo exatamente a mesma base de alunos e progressos, será necessário utilizar futuramente um banco de dados centralizado ou outro sistema de armazenamento compartilhado.

---

# Persistência dos dados

Os dados armazenados em:

```text
server/dados.json
```

continuam salvos mesmo depois que o servidor é encerrado.

Desligar o computador ou fechar o servidor normalmente **não apaga os dados**.

Os dados podem ser perdidos caso:

- o arquivo `dados.json` seja apagado;
- o arquivo seja substituído;
- o projeto seja sobrescrito;
- o computador utilizado elimine os arquivos locais.

---

# Funcionamento sem internet

As atividades pedagógicas do Alfabetiza+ não dependem de APIs externas para funcionar.

Os exercícios são gerados utilizando conteúdos e dados armazenados dentro do próprio projeto.

Por isso, o sistema pode funcionar em uma rede local mesmo sem conexão com a internet.

É necessário apenas que os computadores consigam se comunicar pela mesma rede.

---

# Segurança e uso pedagógico

O Alfabetiza+ é uma ferramenta de apoio pedagógico.

Os níveis sugeridos pelo sistema funcionam como indicadores de aprendizagem.

A avaliação final e a definição do nível de escrita do aluno devem ser realizadas pelo professor responsável.

---

## Autores

**Guilherme Rinaldi da Silva**

**Raphael Marques**

**Gabriel Dal Ponte**

**Fabio Gustavo**

Projeto desenvolvido no contexto do curso de **Análise e Desenvolvimento de Sistemas — SENAI**.