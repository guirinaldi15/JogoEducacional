🎨 Design e Wireframes — Alfabetiza+

Guia visual, estrutura de telas e princípios de interface do projeto.

🌈 1. Identidade do projeto

O Alfabetiza+ utiliza uma linguagem visual infantil, acolhedora e simples.

Objetivos visuais

reduzir distrações;

utilizar elementos grandes;

favorecer leitura;

tornar ações claras;

estimular a criança;

manter consistência entre telas.

👧 2. Público-alvo

O design considera crianças em processo de alfabetização.

Por isso, são priorizados:

letras grandes;

botões amplos;

ícones;

emojis;

poucas opções simultâneas;

textos curtos;

áudio de apoio;

feedback imediato.

🖼️ 3. Protótipo no Figma

O projeto possui referência visual desenvolvida no Figma.

Projeto: Alfabetização Infantil Interativa / Alfabetiza+

https://www.figma.com/make/KcFGpbPz2S5uoY2B55kTUE/Alfabetiza%C3%A7%C3%A3o-Infantil-Interativa

🗺️ 4. Fluxo principal

flowchart TD
    A[Tela inicial] --> B{Perfil}
    B --> C[Aluno]
    B --> D[Professor]

    C --> E[Escolher aluno]
    E --> F{Sondagem feita?}
    F -->|Não| G[Sondagem]
    F -->|Sim| H[Home]
    G --> H

    H --> I[Aprender]
    H --> J[Jogos]
    H --> K[Conquistas]
    H --> L[Perfil]

    D --> M[Login]
    M --> N[Painel do professor]

🏠 5. Tela inicial

Objetivo

Permitir escolha simples entre aluno e professor.

Estrutura

┌─────────────────────────────────────┐
│              🌈📚                   │
│           ALFABETIZA+               │
│                                     │
│     Escolha como deseja entrar      │
│                                     │
│  ┌─────────────┐ ┌─────────────┐    │
│  │    🧒       │ │    👩‍🏫      │    │
│  │   ALUNO     │ │  PROFESSOR  │    │
│  └─────────────┘ └─────────────┘    │
└─────────────────────────────────────┘

🧒 6. Seleção de aluno

Elementos

botão voltar;

título;

instrução;

áudio;

cards dos alunos;

avatar;

nome.

┌─────────────────────────────────────┐
│ ← VOLTAR                            │
│                                     │
│       QUEM VAI APRENDER HOJE?       │
│                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐   │
│  │   🧒   │ │   👧   │ │   🧑   │   │
│  │ ANA    │ │ JOÃO   │ │ LUCAS  │   │
│  └────────┘ └────────┘ └────────┘   │
└─────────────────────────────────────┘

📝 7. Sondagem

A sondagem deve ser simples e sem aparência de prova tradicional.

Componentes

imagem/emoji;

pergunta;

opções grandes;

áudio;

feedback positivo;

indicador de progresso.

Questão 3 de 6

        🐱

QUAL LETRA COMEÇA GATO?

[ G ]   [ P ]   [ M ]

🔊 OUVIR

🏡 8. Home do aluno

Elementos

nome e avatar;

mensagem positiva;

pontos;

estrelas;

botão para aprender;

botão de jogos;

progresso;

navegação inferior.

OLÁ, GUILHERME! 🧒

VAMOS APRENDER BRINCANDO? ✨

[ 🚀 COMEÇAR A APRENDER ]
[ ▶ CONTINUAR APRENDENDO ]

PROGRESSO
████████░░ 80%

🏠   📚   🎮   🏆   👤

📚 9. Menu Aprender

Os módulos devem ficar visíveis mesmo quando bloqueados.

Liberado

┌────────────────────────┐
│ 🔤                     │
│ LETRAS                 │
│ Conheça letras e sons  │
│ ✅ LIBERADA            │
└────────────────────────┘

Bloqueado

┌────────────────────────┐
│ 🔒                     │
│ 📚 LEITURA             │
│                        │
│ 🔒 BLOQUEADA           │
└────────────────────────┘

Isso permite que a criança perceba que existem novos desafios a alcançar.

🎮 10. Jogos

Cada jogo utiliza um card grande.

┌─────────────────────────────────────┐
│ 🎮 JOGO 1 — ENCONTRE A LETRA       │
│                                     │
│          ENCONTRE A LETRA A         │
│                                     │
│         [ A ] [ F ] [ M ]           │
└─────────────────────────────────────┘

Card bloqueado:

┌─────────────────────────────────────┐
│                 🔒                  │
│ JOGO 3 — ORGANIZE A PALAVRA         │
│                                     │
│ CONTINUE APRENDENDO PARA            │
│ DESBLOQUEAR                         │
└─────────────────────────────────────┘

🧮 11. Matemática

A tela deve apresentar:

pergunta;

tempo restante;

opções;

objetos visuais;

feedback.

Exemplo:

🍎🍎 + 🍎

QUANTO É 2 + 1?

[ 2 ]   [ 3 ]   [ 4 ]

⏱️ 18 segundos

✍️ 12. Escrita

PRATIQUE A LETRA

          A

┌─────────────────────────────┐
│                             │
│        ÁREA DE TRAÇADO      │
│                             │
└─────────────────────────────┘

[ LIMPAR ] [ AVALIAR ESCRITA ]

👩‍🏫 13. Painel do professor

O painel utiliza uma interface mais informativa que a área infantil.

Informações

alunos;

progresso;

nível sugerido;

nível manual;

histórico;

atividades concluídas;

controles administrativos.

┌─────────────────────────────────────────┐
│ PAINEL DO PROFESSOR                     │
├───────────────┬─────────────────────────┤
│ ALUNOS        │ ALUNO SELECIONADO       │
│               │                         │
│ ANA           │ Nível sugerido: ...     │
│ JOÃO          │ Atividades: 15          │
│ LUCAS         │ Acertos: 82%            │
│               │                         │
│ [+ ALUNO]     │ [ALTERAR NÍVEL]         │
└───────────────┴─────────────────────────┘

🔊 14. Acessibilidade

Regras de interface:

botão de áudio deve ser visível;

comandos devem ser curtos;

conteúdo infantil preferencialmente em caixa alta;

não depender exclusivamente de texto;

evitar excesso de informação;

respostas devem ter feedback visual.

📱 15. Responsividade

O sistema deve funcionar em:

computador;

notebook;

tablet;

telas touch.

Cards utilizam layout adaptável, preferencialmente com grid.

🎯 16. Padrões de interação

Situação

Resposta visual

acerto

mensagem positiva + confete

erro

incentivo + nova tentativa

bloqueado

cadeado + opacidade

áudio

botão com ícone 🔊

ação principal

botão destacado

voltar

seta ←

progresso

barra ou contador

✅ 17. Conclusão

O design do Alfabetiza+ busca equilibrar:

simplicidade;

ludicidade;

clareza;

acessibilidade;

progressão pedagógica.

A interface infantil é mais visual e objetiva, enquanto o painel do professor prioriza dados e acompanhamento.