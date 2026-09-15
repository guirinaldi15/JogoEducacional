🧪 Plano de Testes — Alfabetiza+

Documento de testes funcionais, técnicos e pedagógicos do projeto.

🎯 1. Objetivo

Garantir que o Alfabetiza+ funcione corretamente em seus principais fluxos:

cadastro;

sondagem;

atividades;

progressão;

jogos;

matemática;

persistência;

painel do professor;

rede local.

🛠️ 2. Ambiente recomendado

Sistema: Windows
Navegador: Chrome ou Edge
Node.js: instalado
Frontend: Vite
Backend: Express
Rede: local

▶️ 3. Inicialização

Backend

cd server
node server.js

Teste:

http://localhost:3001/api/teste

Frontend

npm run dev -- --host

Teste:

http://localhost:5173

✅ 4. Testes de perfil

ID

Teste

Resultado esperado

PERF-01

abrir aplicação

tela de escolha de perfil

PERF-02

clicar em aluno

abre seleção de aluno

PERF-03

clicar em professor

abre login

PERF-04

senha correta

abre painel

PERF-05

senha errada

mostra erro

👩‍🏫 5. Testes de aluno

ID

Teste

Resultado esperado

ALU-01

cadastrar nome válido

aluno criado

ALU-02

cadastrar sem nome

cadastro bloqueado

ALU-03

selecionar aluno novo

abre sondagem

ALU-04

selecionar aluno com sondagem

abre home

ALU-05

excluir aluno

remove perfil e dados

📝 6. Testes da sondagem

ID

Teste

Resultado esperado

SON-01

iniciar aluno novo

questão 1 aparece

SON-02

responder questão

feedback aparece

SON-03

avançar sem resposta

não deve avançar

SON-04

concluir 6 questões

resultado registrado

SON-05

pontuação 0

Garatuja

SON-06

pontuação 1

Pré-silábico

SON-07

pontuação 2

Silábico sem valor

SON-08

pontuação 3

Silábico com valor

SON-09

pontuação 4

Silábico-Alfabético

SON-10

pontuação 5–6

Alfabético

🔒 7. Testes de bloqueio por nível

Garatuja

Esperado:

✅ Letras
✅ Escrita
✅ Matemática
🔒 Sílabas
🔒 Palavras
🔒 Leitura

Jogos:

✅ Jogo 1
🔒 Jogo 2
🔒 Jogo 3
🔒 Jogo 4

Pré-silábico

Esperado:

✅ Letras
✅ Palavras
✅ Escrita
✅ Matemática

Jogos:

✅ Jogo 1
✅ Jogo 2
🔒 Jogo 3
🔒 Jogo 4

Silábico

Esperado:

✅ Letras
✅ Sílabas
✅ Palavras
✅ Escrita
✅ Matemática

Jogos:

✅ Jogo 1
✅ Jogo 2
🔒 Jogo 3
✅ Jogo 4

Silábico-Alfabético / Alfabético

Todos os módulos e jogos de alfabetização devem estar liberados.

🔤 8. Testes de letras

ID

Ação

Esperado

LET-01

abrir letras

letra aparece

LET-02

clicar ouvir

áudio correto

LET-03

próxima

avança

LET-04

anterior

volta

LET-05

concluir prática

soma progresso

🧩 9. Testes de sílabas

ID

Ação

Esperado

SIL-01

abrir atividade

sílaba aparece

SIL-02

ouvir

pronúncia executada

SIL-03

consegui repetir

progresso aumenta

SIL-04

ainda estou

registra tentativa sem travar

🎮 10. Testes dos jogos

Jogo 1

letra correta gera sucesso;

letra errada gera feedback;

questão seguinte carrega normalmente.

Jogo 2

palavra correta corresponde à imagem;

opções devem responder;

áudio deve ler as opções.

Jogo 3

letras podem ser organizadas;

botão limpar funciona;

conferir valida corretamente.

Jogo 4

letra correta completa palavra;

alternativa errada gera feedback;

nova questão aparece.

🧮 11. Testes de matemática

ID

Teste

Esperado

MAT-01

questão de contagem

resposta válida

MAT-02

adição

resposta válida

MAT-03

subtração

resposta válida

MAT-04

erro

ajuda visual

MAT-05

tempo zerar

mensagem de tempo

MAT-06

após tempo

avança

MAT-07

acertar matemática

ganha pontos

MAT-08

acertar matemática

não altera nível de alfabetização

🔊 12. Testes de áudio

Verificar:

letra;

sílaba;

palavra;

sondagem;

instrução;

jogo.

Resultado esperado:

voz reproduzida em pt-BR

✍️ 13. Testes de escrita

ID

Teste

Esperado

ESC-01

desenhar com mouse

traço aparece

ESC-02

desenhar com touch

traço aparece

ESC-03

limpar

canvas limpa

ESC-04

avaliar sem traço

não aceitar

ESC-05

avaliar com traço

atividade aceita conforme regra

💾 14. Testes de persistência

concluir atividade;

atualizar página;

entrar novamente;

verificar pontos.

Esperado:

dados permanecem salvos

🌐 15. Testes em rede local

Máquina servidor

npm run dev -- --host

e:

cd server
node server.js

Máquina cliente

Acessar:

http://IP-DO-SERVIDOR:5173

Verificar:

carrega interface;

lista alunos;

progresso compartilhado;

alterações do professor são refletidas.

👩‍🏫 16. Testes do professor

ID

Teste

Esperado

PROF-01

selecionar aluno

dados aparecem

PROF-02

alterar nível

salva nível

PROF-03

aluno entrar novamente

bloqueios acompanham novo nível

PROF-04

limpar histórico

histórico removido

PROF-05

trocar senha

nova senha funciona

🔄 17. Teste de progressão

Cenário:

professor define aluno como Garatuja;

aluno entra;

conferir bloqueios;

professor altera para Pré-silábico;

aluno entra novamente;

verificar novas atividades.

Resultado esperado:

novas atividades são liberadas sem remover as anteriores

🧯 18. Testes de falha

Backend desligado

Verificar:

aplicação não deve travar completamente;

erros devem aparecer no console;

comportamento de fallback local deve ser observado quando aplicável.

Rede desconectada

Verificar:

interface continua carregando localmente;

operações dependentes da API podem falhar de forma controlada.

📋 19. Registro dos resultados

Sugestão de tabela:

ID

Data

Resultado

Observação

PERF-01



⬜



SON-01



⬜



MAT-01



⬜



PROF-01



⬜



Legenda:

✅ Aprovado
❌ Reprovado
⚠️ Parcial
⬜ Não testado

✅ 20. Critério de aceitação

O sistema é considerado apto para apresentação quando:

inicializa sem erro;

cadastro funciona;

sondagem funciona;

nível é salvo;

atividades funcionam;

bloqueios seguem nível;

matemática não altera alfabetização;

professor visualiza dados;

dados permanecem após atualização;

cliente de rede consegue acessar o servidor.