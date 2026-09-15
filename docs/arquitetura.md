md


🏗️ Arquitetura do Sistema — Alfabetiza+
Documentação técnica da arquitetura do projeto Alfabetiza+, aplicação web educacional voltada ao apoio do processo de alfabetização infantil.

📌 1. Visão geral
O Alfabetiza+ é uma aplicação web construída para auxiliar crianças em diferentes etapas do desenvolvimento da escrita, com atividades interativas, jogos, sondagem inicial, acompanhamento de progresso e área exclusiva para professores.

A solução foi organizada em duas partes principais:

Frontend: React + TypeScript + Vite

Backend: Node.js + Express

Persistência: arquivo JSON no servidor

Comunicação: API HTTP utilizando fetch

Execução em rede local: frontend e backend acessíveis por outros computadores da mesma rede

🧩 2. Arquitetura geral
flowchart LR
    A[Aluno] --> B[Frontend React]
    P[Professor] --> B

    B -->|HTTP / fetch| C[API Express]
    C --> D[(dados.json)]

    B --> E[SpeechSynthesis]
    B --> F[Canvas de Escrita]
    B --> G[Gamificação]
Responsabilidade de cada camada
Camada	Tecnologia	Responsabilidade
Interface	React	Exibir telas, atividades e jogos
Tipagem	TypeScript	Melhorar segurança e organização do código
Build	Vite	Servir e compilar a aplicação
API	Express	Receber e processar dados dos alunos
Persistência	JSON	Armazenar alunos, progresso e aprendizagem
Áudio	SpeechSynthesis	Ler instruções e conteúdos em voz alta
Escrita	Canvas	Permitir prática de escrita
Gamificação	React + lógica interna	Pontos, estrelas, atividades e conquistas
📁 3. Estrutura principal do projeto
JogoEducacional/
│
├── docs/
│   ├── arquitetura.md
│   ├── regras_de_negocio.md
│   ├── niveis_de_aprendizagem.md
│   ├── design_wireframes.md
│   ├── funcionalidades.md
│   └── testes.md
│
├── server/
│   ├── server.js
│   └── dados.json
│
├── src/
│   ├── components/
│   │   └── Canvas.tsx
│   │
│   ├── data/
│   │   └── content.ts
│   │
│   ├── lib/
│   │   └── progress.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
│
├── package.json
├── README.md
└── vite.config.ts
🖥️ 4. Frontend
O frontend concentra a maior parte da experiência de uso.

Principais responsabilidades
seleção de perfil;

login do professor;

seleção de aluno;

sondagem inicial;

menu de aprendizagem;

atividades de letras;

atividades de sílabas;

atividades de palavras;

leitura;

escrita;

matemática;

jogos;

conquistas;

perfil;

painel do professor.

Arquivo principal
O arquivo src/App.tsx centraliza:

navegação entre telas;

estado do aluno;

nível pedagógico;

progresso;

pontuação;

regras de liberação;

integração com a API;

controle dos jogos.

🌐 5. Backend
O backend é responsável por compartilhar dados entre computadores.

Tecnologia
Node.js
Express
CORS
File System
JSON
Rotas utilizadas
Método	Rota	Função
GET	/api/teste	Testar funcionamento da API
GET	/api/alunos	Listar alunos
POST	/api/alunos	Cadastrar aluno
DELETE	/api/alunos/:id	Excluir aluno
GET	/api/progresso/:id	Buscar progresso
PUT	/api/progresso/:id	Salvar progresso
GET	/api/aprendizagem/:id	Buscar dados pedagógicos
PUT	/api/aprendizagem/:id	Salvar dados pedagógicos
💾 6. Persistência dos dados
Os dados são armazenados em:

server/dados.json
Estrutura lógica:

{
  "alunos": [],
  "progresso": {},
  "aprendizagem": {}
}
Alunos
Armazena informações como:

identificador;

nome;

avatar;

data de criação.

Progresso
Armazena:

pontos;

estrelas;

número de atividades;

evolução em letras;

evolução em sílabas;

evolução em palavras;

histórico.

Aprendizagem
Armazena:

conclusão da sondagem;

pontuação da sondagem;

nível inicial;

nível sugerido;

nível definido pelo professor;

acertos;

erros;

total de tentativas;

histórico de níveis.

🧠 7. Lógica pedagógica
O sistema trabalha com os seguintes níveis internos:

Garatuja
Pré-silábico
Silábico sem valor
Silábico com valor
Silábico-Alfabético
Alfabético
O nível considerado atualmente pelo sistema segue esta prioridade:

nível definido pelo professor
        ↓
nível sugerido pelo sistema
        ↓
nível obtido na sondagem inicial
Em termos lógicos:

manualLevel ?? suggestedLevel ?? initialLevel
🔐 8. Área do professor
O professor possui uma área separada do ambiente do aluno.

Recursos
cadastrar alunos;

excluir alunos;

acompanhar progresso;

visualizar nível;

visualizar histórico;

alterar nível manualmente;

limpar histórico de atividades;

alterar senha.

O professor continua sendo o responsável pela interpretação pedagógica. O aplicativo fornece indicadores e sugestões, não um diagnóstico pedagógico definitivo.

🎮 9. Gamificação
A aplicação utiliza elementos de gamificação para aumentar o engajamento.

Elementos utilizados
⭐ estrelas;

pontos;

atividades concluídas;

conquistas;

feedback visual;

confetes;

mensagens positivas.

A gamificação não substitui a avaliação pedagógica.

🔊 10. Acessibilidade e apoio
O navegador utiliza SpeechSynthesis para ler instruções.

Exemplo de uso:

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  speechSynthesis.speak(utterance);
};
Isso auxilia crianças que ainda estão desenvolvendo leitura autônoma.

✍️ 11. Escrita com Canvas
O componente Canvas permite que a criança pratique movimentos de escrita utilizando:

mouse;

touch;

caneta digital.

Atualmente, a validação verifica a realização do traçado, mas não reconhece com precisão qual letra foi escrita.

Um reconhecimento real de escrita exigiria tecnologias adicionais, como:

OCR;

visão computacional;

machine learning;

comparação avançada de traçados.

🌍 12. Execução em rede local
Frontend:

npm run dev -- --host
Backend:

cd server
node server.js
Com isso, outros computadores da mesma rede podem acessar o sistema utilizando o IP da máquina principal.

Exemplo:

http://IP-DO-SERVIDOR:5173
⚠️ 13. Limitações atuais
A arquitetura atual é adequada para um protótipo educacional, porém possui limitações:

arquivo JSON não é ideal para grande volume de dados;

gravações simultâneas podem gerar conflitos;

senha do professor ainda possui segurança básica;

não há autenticação real no backend;

não há banco de dados relacional;

depende da máquina servidor permanecer ligada.

🚀 14. Melhorias futuras
Possíveis evoluções:

banco de dados MySQL, PostgreSQL ou Supabase;

autenticação segura;

perfis com login individual;

armazenamento em nuvem;

relatórios em PDF;

dashboard com gráficos;

reconhecimento de escrita;

maior quantidade de jogos;

adaptação automática de dificuldade;

publicação online.

✅ 15. Conclusão
A arquitetura do Alfabetiza+ foi desenvolvida priorizando simplicidade, acessibilidade, organização e funcionamento em ambiente escolar.

O sistema separa interface, API e persistência, permitindo que diferentes computadores compartilhem os mesmos dados e oferecendo uma base preparada para futuras melhorias.

