⚙️ Funcionalidades — Alfabetiza+

Catálogo funcional do sistema Alfabetiza+.

🌈 Visão geral

O sistema reúne recursos educacionais e administrativos em uma única aplicação.

👤 1. Perfis de acesso

Aluno

seleção de perfil;

sondagem;

atividades;

jogos;

matemática;

escrita;

áudio;

conquistas;

perfil.

Professor

login;

cadastro de alunos;

exclusão;

acompanhamento;

alteração de nível;

histórico;

alteração de senha.

📝 2. Sondagem inicial

A sondagem identifica um indicador inicial da escrita.

Recursos

seis questões;

áudio automático;

opções grandes;

feedback positivo;

pontuação;

definição do nível inicial;

registro no histórico.

🔤 3. Letras

Objetivo

Apresentar letras e palavras associadas.

Recursos

alfabeto;

palavra de exemplo;

emoji;

áudio;

navegação anterior/próxima;

registro de prática.

🧩 4. Sílabas

Objetivo

Auxiliar consciência silábica.

Recursos

famílias silábicas;

leitura em voz alta;

repetição;

navegação;

registro de progresso.

📝 5. Palavras

Objetivo

Trabalhar formação de palavras.

Recursos

imagens;

palavras incompletas;

múltipla escolha;

feedback;

pontuação.

📚 6. Leitura

Objetivo

Relacionar imagem, palavra e significado.

Recursos

imagens;

opções de leitura;

resposta correta;

áudio;

feedback.

✍️ 7. Escrita

Objetivo

Estimular coordenação e prática gráfica.

Recursos

Canvas;

modelo visual;

limpar;

avaliar;

uso com mouse ou touch.

🎮 8. Jogos

O sistema possui jogos de alfabetização variados.

Jogo 1 — Encontre a Letra

A criança deve identificar uma letra-alvo entre opções.

Jogo 2 — Imagem e Palavra

A criança relaciona imagem à palavra correta.

Jogo 3 — Organize a Palavra

A criança ordena letras para formar uma palavra.

Jogo 4 — Complete a Palavra

A criança escolhe a letra que falta.

Jogo 5 — Matemática

Desafios de:

contagem;

adição;

subtração.

🔒 9. Bloqueio por nível

O sistema pode diferenciar o conteúdo conforme o nível pedagógico.

Exemplo:

Garatuja
└── Letras
└── Escrita
└── Matemática

Pré-silábico
└── Letras
└── Palavras
└── Escrita
└── Matemática

Silábico
└── Letras
└── Sílabas
└── Palavras
└── Escrita
└── Matemática

Silábico-Alfabético
└── + Leitura

Alfabético
└── Todos os módulos

🧮 10. Matemática

Tipos de questões

contar objetos;

somar;

subtrair.

Recursos

tempo de 25 segundos;

alternativas;

auxílio visual;

avanço automático;

mensagem ao acabar o tempo.

Regra importante

Matemática não interfere no nível de alfabetização.

🔊 11. Áudio

Utiliza a API do navegador:

SpeechSynthesis

Permite:

ouvir perguntas;

ouvir palavras;

ouvir letras;

ouvir sílabas;

ouvir instruções.

⭐ 12. Gamificação

Recursos

pontos;

estrelas;

confetes;

atividades concluídas;

conquistas;

histórico.

🏆 13. Conquistas

A criança pode visualizar recompensas relacionadas à sua participação.

Objetivo:

reforçar motivação;

valorizar continuidade;

tornar o aprendizado mais divertido.

👤 14. Perfil do aluno

Exibe:

avatar;

nome;

estrelas;

pontos;

atividades;

progresso.

O nível técnico não precisa ser mostrado à criança.

👩‍🏫 15. Cadastro de alunos

O professor pode:

inserir nome;

escolher avatar;

criar novo perfil.

O novo aluno deve iniciar sem progresso e realizar sondagem.

🗑️ 16. Exclusão

O professor pode excluir alunos.

A exclusão também remove dados relacionados no servidor.

📊 17. Acompanhamento pedagógico

O professor pode consultar:

nível inicial;

nível sugerido;

nível manual;

total de acertos;

total de erros;

tentativas;

progresso;

histórico de níveis.

🎚️ 18. Alteração manual de nível

Permite ao professor substituir a sugestão automática.

Isso permite adaptar o sistema à avaliação real realizada em sala.

🗂️ 19. Histórico

O sistema registra mudanças importantes.

Origem:

sondagem;

sistema;

professor.

🌐 20. Compartilhamento em rede

Com o backend ativo, vários computadores podem consultar os mesmos dados.

Isso permite:

alunos usando máquinas diferentes;

professor acompanhando dados centralizados;

persistência independente do navegador do aluno.

💾 21. API

Principais operações:

GET    /api/alunos
POST   /api/alunos
DELETE /api/alunos/:id

GET    /api/progresso/:id
PUT    /api/progresso/:id

GET    /api/aprendizagem/:id
PUT    /api/aprendizagem/:id

🚀 22. Funcionalidades futuras

autenticação individual;

banco de dados;

relatórios;

gráficos;

exportação;

novos jogos;

reconhecimento de escrita;

trilhas personalizadas;

publicação online.

✅ Resumo

O Alfabetiza+ reúne funcionalidades de aprendizagem, acompanhamento e gamificação, mantendo a criança no centro da experiência e o professor como responsável pela orientação pedagógica.