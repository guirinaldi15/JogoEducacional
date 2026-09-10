Alfabetiza+

Aplicativo web educacional desenvolvido em React + TypeScript + Vite, com foco em alfabetização infantil, atividades pedagógicas, jogos, matemática, acompanhamento de progresso e área do professor.

Recursos

Tela de seleção entre aluno e professor

Cadastro de alunos com nome e avatar

Área do aluno

Área do professor com senha

Sondagem inicial

Acompanhamento do nível de escrita

Atividades de letras, sílabas, palavras, leitura e escrita

Jogos educativos

Atividades de matemática

Dicas visuais em operações matemáticas

Áudio com instruções

Pontos, estrelas e conquistas

Histórico de atividades

Progresso individual por aluno

Acesso por outros computadores na mesma rede

Servidor Node.js + Express para compartilhamento dos cadastros

Como rodar o projeto

1. Requisitos

Antes de começar, tenha instalado:

Node.js

npm

Git

VS Code ou outro editor de código

Para verificar se o Node.js está instalado:

node -v

Para verificar o npm:

npm -v

2. Configurar o perfil do Git

Neste projeto, configure o perfil Git da máquina com:

git config --global user.name "raphaelmarques3655"
git config --global user.email "raphaelmarques3655@gmail.com"

Para confirmar se os dados foram aplicados:

git config --global user.name
git config --global user.email

Essas configurações definem o nome e o e-mail usados nos commits feitos a partir dessa máquina.

3. Baixar o projeto

Caso ainda não tenha o projeto no computador:

git clone https://github.com/guirinaldi15/JogoEducacional.git

Depois entre na pasta:

cd JogoEducacional

4. Instalar as dependências do projeto

Na pasta principal do projeto:

npm install

Esse comando instala as dependências do React, Vite e demais bibliotecas utilizadas.

Rodando somente no computador local

Para iniciar o Alfabetiza+ apenas no próprio computador:

npm run dev

O Vite deve mostrar algo parecido com:

Local: http://localhost:5173/

Abra no navegador:

http://localhost:5173/

Rodando para outros computadores da mesma rede

Para permitir que outros computadores da mesma rede acessem o Alfabetiza+, inicie o Vite com:

npm run dev -- --host

O terminal deve mostrar algo parecido com:

Local:   http://localhost:5173/
Network: http://10.137.11.230:5173/

O endereço Network pode mudar de acordo com a rede.

No outro computador, abra o navegador e digite o endereço exibido em Network.

Exemplo:

http://10.137.11.230:5173/

Os dois computadores precisam estar conectados à mesma rede.

Servidor de dados com Node.js + Express

O Alfabetiza+ utiliza um servidor Node.js + Express para permitir que os cadastros sejam compartilhados entre os computadores.

A pasta do servidor é:

server/

Antes da primeira execução, entre na pasta:

cd server

Instale as dependências:

npm install

Caso ainda não estejam instaladas:

npm install express cors

Depois inicie o servidor:

node server.js

O terminal deverá mostrar algo semelhante a:

Servidor Alfabetiza+ rodando!
Local: http://localhost:3001

Importante: usar dois terminais

Para que o site e o servidor funcionem ao mesmo tempo, deixe dois terminais abertos.

Terminal 1 — React / Vite

Entre na pasta principal:

cd C:\Users\Aluno\JogoEducacional

Depois rode:

npm run dev -- --host

Não feche esse terminal.

Terminal 2 — Node.js / Express

Abra outro Prompt de Comando ou terminal.

Entre na pasta do servidor:

cd C:\Users\Aluno\JogoEducacional\server

Depois rode:

node server.js

Também não feche esse terminal.

Como acessar

No computador host

Abra:

http://localhost:5173/

ou:

http://10.137.11.230:5173/

Em outro computador da mesma rede

Abra:

http://10.137.11.230:5173/

Substitua 10.137.11.230 pelo IP exibido como Network no terminal do Vite.

Como testar o servidor

No computador host, abra:

http://localhost:3001/api/teste

Se estiver funcionando, deve aparecer uma mensagem semelhante a:

{
  "mensagem": "Servidor Alfabetiza+ funcionando!"
}

Para testar pelo outro computador da rede:

http://10.137.11.230:3001/api/teste

Se essa página abrir, o outro computador está conseguindo acessar o servidor de dados.

Como descobrir o IP do computador host

No Windows, abra o Prompt de Comando:

ipconfig

Procure por:

Endereço IPv4

Exemplo:

10.137.11.230

Então o endereço do Alfabetiza+ será:

http://10.137.11.230:5173/

E o servidor:

http://10.137.11.230:3001/

Firewall do Windows

Na primeira vez que executar:

npm run dev -- --host

ou:

node server.js

o Windows pode pedir permissão no Firewall.

Permita o acesso em Redes privadas.

Se outro computador não conseguir acessar, verifique se o Node.js está permitido no Firewall do Windows.

Encerrar o projeto

Para parar o Vite ou o servidor Node.js, vá até o terminal correspondente e pressione:

Ctrl + C

Se aparecer:

Deseja finalizar o arquivo em lotes (S/N)?

digite:

S

e pressione Enter.

Uso rápido nas próximas vezes

Depois que tudo estiver instalado, normalmente basta abrir dois terminais.

Terminal 1

cd C:\Users\Aluno\JogoEducacional
npm run dev -- --host

Terminal 2

cd C:\Users\Aluno\JogoEducacional\server
node server.js

Depois acesse:

http://localhost:5173/

ou, em outro computador da rede:

http://IP_DO_HOST:5173/

Build para produção

Para gerar a versão de produção:

npm run build

Os arquivos serão gerados na pasta:

dist/

Observações

Atualmente, parte dos dados do sistema já pode ser compartilhada pelo servidor Node.js + Express.

Algumas informações do projeto ainda podem utilizar localStorage, dependendo da versão atual do código.

A arquitetura está sendo evoluída para que os dados de alunos, progresso, níveis e histórico possam ser centralizados e acessados por diferentes computadores.

O sistema é uma ferramenta de apoio pedagógico e não substitui a avaliação realizada pelo professor.

Autores

Guilherme Rinaldi da Silva

Raphael Marques

Gabriel Dal Ponte

Fabio Gustavo

Todos os autores cursam Análise e Desenvolvimento de Sistemas — SENAI.