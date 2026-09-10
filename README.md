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

---

# Rodando somente no computador local

Para iniciar o Alfabetiza+ apenas no próprio computador:

```bash
npm run dev
```

O Vite deve mostrar algo parecido com:

```text
Local: http://localhost:5173/
```

Abra no navegador:

```text
http://localhost:5173/
```

---

# Rodando para outros computadores da mesma rede

Para permitir que outros computadores da mesma rede acessem o Alfabetiza+, inicie o Vite com:

```bash
npm run dev -- --host
```

O terminal deve mostrar algo parecido com:

```text
Local:   http://localhost:5173/

Network: http://10.137.11.230:5173/
```

O endereço `Network` pode mudar de acordo com a rede.

No outro computador, abra o navegador e digite o endereço exibido em `Network`.

Exemplo:

```text
http://10.137.11.230:5173/
```

Os dois computadores precisam estar conectados à mesma rede.

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

Caso ainda não estejam instaladas:

```bash
npm install express cors
```

Depois inicie o servidor:

```bash
node server.js
```

O terminal deverá mostrar algo semelhante a:

```text
Servidor Alfabetiza+ rodando!

Local: http://localhost:3001
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
npm run dev -- --host
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
node server.js
```

Também não feche esse terminal.

---

# Como acessar

## No computador host

Abra:

```text
http://localhost:5173/
```

ou:

```text
http://10.137.11.230:5173/
```

## Em outro computador da mesma rede

Abra:

```text
http://10.137.11.230:5173/
```

Substitua `10.137.11.230` pelo IP exibido como `Network` no terminal do Vite.

---

# Como testar o servidor

No computador host, abra:

```text
http://localhost:3001/api/teste
```

Se estiver funcionando, deve aparecer uma mensagem semelhante a:

```json
{
  "mensagem": "Servidor Alfabetiza+ funcionando!"
}
```

Para testar pelo outro computador da rede:

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

E o servidor:

```text
http://10.137.11.230:3001/
```

---

# Firewall do Windows

Na primeira vez que executar:

```bash
npm run dev -- --host
```

ou:

```bash
node server.js
```

o Windows pode pedir permissão no Firewall.

Permita o acesso em **Redes privadas**.

Se outro computador não conseguir acessar, verifique se o Node.js está permitido no Firewall do Windows.

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

npm run dev -- --host
```

## Terminal 2

```bash
cd C:\Users\Aluno\JogoEducacional\server

node server.js
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

Se houver alterações nas dependências, execute novamente:

```bash
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

Por isso, enquanto o servidor estiver sendo executado no computador host, os outros computadores da mesma rede conseguem acessar os mesmos dados.

Caso o computador utilizado como host apague os arquivos ao ser desligado ou reiniciado, os dados armazenados no `dados.json` também podem ser perdidos.

Para uma versão futura do sistema, poderá ser utilizado um banco de dados persistente, como MySQL ou outra solução de banco de dados.

O sistema é uma ferramenta de apoio pedagógico e não substitui a avaliação realizada pelo professor.

---

## Autores

**Guilherme Rinaldi da Silva**

**Raphael Marques**

**Gabriel Dal Ponte**

**Fabio Gustavo**

Projeto desenvolvido no contexto do curso de **Análise e Desenvolvimento de Sistemas — SENAI**.