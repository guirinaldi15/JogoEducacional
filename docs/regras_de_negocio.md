📋 Regras de Negócio — Alfabetiza+

Este documento reúne as principais regras que determinam como o Alfabetiza+ deve funcionar.

🎯 1. Objetivo do sistema

O sistema deve apoiar o processo de alfabetização infantil oferecendo:

sondagem inicial;

atividades adequadas ao nível da criança;

jogos educativos;

acompanhamento de progresso;

recursos de acessibilidade;

painel pedagógico para o professor.

👥 2. Perfis de usuário

Existem dois perfis principais:

🧒 Aluno

Pode:

selecionar seu perfil;

realizar sondagem;

acessar atividades liberadas;

jogar;

praticar matemática;

ouvir instruções;

acompanhar pontos e conquistas.

👩‍🏫 Professor

Pode:

acessar área protegida por senha;

cadastrar aluno;

excluir aluno;

consultar progresso;

consultar indicadores pedagógicos;

alterar nível manualmente;

consultar histórico;

alterar senha.

🔐 3. Acesso do professor

A área do professor deve exigir senha.

Senha inicial:

1234

O professor pode alterar essa senha dentro do próprio sistema.

📝 4. Cadastro de aluno

Para cadastrar um aluno:

o nome não pode estar vazio;

deve existir um avatar;

o sistema deve gerar um identificador;

o progresso deve iniciar zerado;

o estado de aprendizagem deve iniciar sem sondagem concluída.

🧪 5. Sondagem inicial

Todo novo aluno deve realizar a sondagem antes de acessar normalmente o sistema.

A sondagem possui seis questões.

Conversão da pontuação

Pontuação

Nível inicial

0

Garatuja

1

Pré-silábico

2

Silábico sem valor

3

Silábico com valor

4

Silábico-Alfabético

5 ou 6

Alfabético

A sondagem gera um indicador inicial, e não um diagnóstico definitivo.

🧠 6. Nível atual do aluno

O sistema considera o nível atual nesta ordem:

nível definido manualmente pelo professor;

nível sugerido pelo sistema;

nível inicial da sondagem.

Professor > Sugestão do sistema > Sondagem

Assim, a decisão do professor sempre possui prioridade.

🔓 7. Liberação de atividades

As atividades são liberadas progressivamente.

Garatuja

Liberadas:

Letras

Escrita

Matemática

Pré-silábico

Liberadas:

Letras

Palavras

Escrita

Matemática

Silábico sem valor

Liberadas:

Letras

Sílabas

Palavras

Escrita

Matemática

Silábico com valor

Liberadas:

Letras

Sílabas

Palavras

Escrita

Matemática

Silábico-Alfabético

Liberadas:

Letras

Sílabas

Palavras

Leitura

Escrita

Matemática

Alfabético

Todas as atividades ficam disponíveis.

🎮 8. Liberação dos jogos

Os jogos de alfabetização seguem progressão pedagógica.

Nível

Jogo 1

Jogo 2

Jogo 3

Jogo 4

Garatuja

✅

🔒

🔒

🔒

Pré-silábico

✅

✅

🔒

🔒

Silábico sem valor

✅

✅

🔒

✅

Silábico com valor

✅

✅

🔒

✅

Silábico-Alfabético

✅

✅

✅

✅

Alfabético

✅

✅

✅

✅

Jogos

Encontre a Letra

Imagem e Palavra

Organize a Palavra

Complete a Palavra

🧮 9. Matemática

A matemática funciona de maneira independente da alfabetização.

Portanto:

permanece sempre acessível;

gera pontos;

gera recompensas;

não altera o nível de psicogênese da escrita;

acertos e erros em matemática não devem interferir na sugestão do nível de alfabetização.

📊 10. Progresso

O progresso deve registrar:

pontos;

estrelas;

atividades;

letras praticadas;

sílabas praticadas;

palavras praticadas;

histórico.

Nenhum dado de outro aluno deve ser utilizado no perfil atual.

📈 11. Sugestão automática de nível

O sistema pode sugerir mudanças com base em:

quantidade de atividades;

taxa de acertos;

progresso em letras;

progresso em sílabas;

progresso em palavras.

A sugestão automática deve funcionar apenas como apoio ao professor.

👩‍🏫 12. Alteração manual de nível

O professor pode escolher manualmente um nível.

Ao fazer isso:

o nível manual passa a ter prioridade;

o histórico deve registrar a alteração;

as atividades disponíveis devem seguir o novo nível.

🗂️ 13. Histórico de níveis

Cada mudança pode registrar:

nível;

data;

origem.

Origens possíveis:

sondagem
sistema
professor

❌ 14. Exclusão de aluno

Ao excluir um aluno, devem ser removidos:

cadastro;

progresso;

aprendizagem;

histórico relacionado ao aluno.

🔊 15. Áudio

Atividades devem oferecer apoio por voz sempre que possível.

O áudio deve:

utilizar português do Brasil;

ler instruções;

auxiliar crianças que ainda não leem com autonomia.

🔒 16. Atividade bloqueada

Uma atividade indisponível deve:

continuar visível;

apresentar cadeado;

possuir aparência visual de bloqueio;

não permitir entrada;

informar que será liberada conforme o avanço.

A atividade não deve simplesmente desaparecer.

🧒 17. Informação pedagógica para a criança

O nível técnico da psicogênese não deve ser apresentado diretamente à criança.

Em vez de:

Você está no nível pré-silábico.

preferir:

Continue aprendendo para desbloquear novos desafios!

👨‍🏫 18. Papel do professor

O sistema não substitui o professor.

O professor deve:

observar o aluno;

interpretar os resultados;

considerar produções espontâneas;

revisar sugestões do sistema;

ajustar o nível quando necessário.

💾 19. Persistência

Informações importantes devem ser enviadas ao servidor para permitir uso em vários computadores.

Devem ser persistidos:

alunos;

progresso;

aprendizagem;

histórico.

✅ 20. Resumo

As regras de negócio foram criadas para garantir que o Alfabetiza+ seja:

educativo;

progressivo;

seguro;

compreensível;

adequado ao ambiente escolar;

controlável pelo professor.