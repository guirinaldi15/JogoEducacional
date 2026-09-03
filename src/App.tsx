import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Home,
  BookOpen,
  Gamepad2,
  Trophy,
  User,
  Volume2,
  ArrowLeft,
  Star,
  ShieldCheck,
  ClipboardCheck,
  BarChart3,
  Pencil,
  RefreshCw
} from 'lucide-react';

import Canvas, { type CanvasHandle } from './components/Canvas';
import {
  letters,
  syllables,
  wordQuestions,
  readingQuestions
} from './data/content';

import {
  initialProgress,
  reward,
  type Progress
} from './lib/progress';

type Page =
  | 'role'
  | 'students'
  | 'assessment'
  | 'home'
  | 'learn'
  | 'letters'
  | 'syllables'
  | 'words'
  | 'reading'
  | 'writing'
  | 'games'
  | 'achievements'
  | 'profile'
  | 'adult';

type Level =
  | 'Garatuja'
  | 'Pré-silábico'
  | 'Silábico sem valor'
  | 'Silábico com valor'
  | 'Silábico-Alfabético'
  | 'Alfabético';

const LEVELS: Level[] = [
  'Garatuja',
  'Pré-silábico',
  'Silábico sem valor',
  'Silábico com valor',
  'Silábico-Alfabético',
  'Alfabético'
];

type Student = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

type LevelHistoryEntry = {
  level: Level;
  at: string;
  source: 'sondagem' | 'sistema' | 'professor';
};

type LearningState = {
  assessmentCompleted: boolean;
  assessmentScore: number;
  initialLevel: Level | null;
  suggestedLevel: Level | null;
  manualLevel: Level | null;
  correctAnswers: number;
  wrongAnswers: number;
  totalAttempts: number;
  updatedAt: string | null;
  levelHistory: LevelHistoryEntry[];
};

const STUDENTS_KEY = 'alfabetizacao-students';

const cloneInitialProgress = (): Progress =>
  JSON.parse(JSON.stringify(initialProgress)) as Progress;

const initialLearningState: LearningState = {
  assessmentCompleted: false,
  assessmentScore: 0,
  initialLevel: null,
  suggestedLevel: null,
  manualLevel: null,
  correctAnswers: 0,
  wrongAnswers: 0,
  totalAttempts: 0,
  updatedAt: null,
  levelHistory: []
};

const studentProgressKey = (id: string) =>
  `alfabetizacao-progress-${id}`;

const studentLearningKey = (id: string) =>
  `alfabetizacao-learning-${id}`;

const loadStudents = (): Student[] => {
  try {
    const saved = localStorage.getItem(STUDENTS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadStudentProgress = (id: string): Progress => {
  try {
    const saved = localStorage.getItem(studentProgressKey(id));
    return saved ? JSON.parse(saved) : cloneInitialProgress();
  } catch {
    return cloneInitialProgress();
  }
};

const loadLearningState = (id: string): LearningState => {
  try {
    const saved = localStorage.getItem(studentLearningKey(id));
    if (!saved) {
      return { ...initialLearningState, levelHistory: [] };
    }

    const parsed = JSON.parse(saved);

    return {
      ...initialLearningState,
      ...parsed,
      levelHistory: Array.isArray(parsed.levelHistory)
        ? parsed.levelHistory
        : []
    };
  } catch {
    return { ...initialLearningState };
  }
};

const saveLearningState = (id: string, state: LearningState) => {
  localStorage.setItem(studentLearningKey(id), JSON.stringify(state));
};

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.82;
    speechSynthesis.speak(utterance);
  }
};

const pct = (n: number, max: number) =>
  Math.min(100, Math.round((n / Math.max(max, 1)) * 100));

const levelIndex = (level: Level | null) =>
  level ? Math.max(0, LEVELS.indexOf(level)) : 0;

const levelFromAssessmentScore = (score: number): Level => {
  if (score <= 0) return 'Garatuja';
  if (score === 1) return 'Pré-silábico';
  if (score === 2) return 'Silábico sem valor';
  if (score === 3) return 'Silábico com valor';
  if (score === 4) return 'Silábico-Alfabético';
  return 'Alfabético';
};

const calculateSuggestedLevel = (
  state: LearningState,
  progress: Progress
): Level | null => {
  if (!state.assessmentCompleted || !state.initialLevel) return null;

  const base = levelIndex(state.initialLevel);
  const attempts = state.totalAttempts;
  const accuracy =
    attempts > 0 ? state.correctAnswers / attempts : 0;

  const lettersRate = progress.letters / 26;
  const syllablesRate = progress.syllables / 75;
  const wordsRate = progress.words / 25;

  let activityLevel = base;

  if (progress.activities >= 3 && lettersRate >= 0.15) {
    activityLevel = Math.max(activityLevel, 1);
  }

  if (
    progress.activities >= 6 &&
    lettersRate >= 0.3 &&
    accuracy >= 0.5
  ) {
    activityLevel = Math.max(activityLevel, 2);
  }

  if (
    progress.activities >= 10 &&
    syllablesRate >= 0.12 &&
    accuracy >= 0.55
  ) {
    activityLevel = Math.max(activityLevel, 3);
  }

  if (
    progress.activities >= 16 &&
    wordsRate >= 0.2 &&
    accuracy >= 0.65
  ) {
    activityLevel = Math.max(activityLevel, 4);
  }

  if (
    progress.activities >= 24 &&
    wordsRate >= 0.4 &&
    accuracy >= 0.75
  ) {
    activityLevel = Math.max(activityLevel, 5);
  }

  if (attempts >= 10 && accuracy < 0.35) {
    activityLevel = Math.max(0, activityLevel - 1);
  }

  return LEVELS[Math.min(5, activityLevel)];
};

const getCurrentLevel = (state: LearningState): Level | null =>
  state.manualLevel ?? state.suggestedLevel ?? state.initialLevel;


const addLevelHistory = (
  history: LevelHistoryEntry[],
  level: Level,
  source: LevelHistoryEntry['source']
): LevelHistoryEntry[] => {
  const last = history[history.length - 1];

  if (last?.level === level && last?.source === source) {
    return history;
  }

  return [
    ...history,
    {
      level,
      source,
      at: new Date().toISOString()
    }
  ].slice(-40);
};

export default function App() {
  const [page, setPage] = useState<Page>('role');

  const [students, setStudents] =
    useState<Student[]>(() => loadStudents());

  const [activeStudentId, setActiveStudentId] =
    useState<string | null>(null);

  const [teacherSelectedId, setTeacherSelectedId] =
    useState<string | null>(null);

  const [progress, setProgress] =
    useState<Progress>(cloneInitialProgress());

  const [learning, setLearning] =
    useState<LearningState>({ ...initialLearningState });

  const [name, setName] = useState('Aluno');
  const [avatar, setAvatar] = useState('🧒');

  useEffect(() => {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (!activeStudentId) return;
    localStorage.setItem(
      studentProgressKey(activeStudentId),
      JSON.stringify(progress)
    );
  }, [progress, activeStudentId]);

  useEffect(() => {
    if (!activeStudentId) return;

    setLearning((current) => {
      if (!current.assessmentCompleted) return current;

      const suggested = calculateSuggestedLevel(current, progress);

      if (suggested === current.suggestedLevel) {
        return current;
      }

      const next = {
        ...current,
        suggestedLevel: suggested,
        updatedAt: new Date().toISOString(),
        levelHistory:
          suggested
            ? addLevelHistory(
                current.levelHistory ?? [],
                suggested,
                'sistema'
              )
            : current.levelHistory ?? []
      };

      saveLearningState(activeStudentId, next);
      return next;
    });
  }, [progress, activeStudentId]);

  useEffect(() => {
    if (!activeStudentId) return;
    saveLearningState(activeStudentId, learning);
  }, [learning, activeStudentId]);

  const selectStudent = (student: Student) => {
    const savedProgress = loadStudentProgress(student.id);
    const savedLearning = loadLearningState(student.id);

    setActiveStudentId(student.id);
    setName(student.name);
    setAvatar(student.avatar);
    setProgress(savedProgress);
    setLearning(savedLearning);

    if (savedLearning.assessmentCompleted) {
      setPage('home');
    } else {
      setPage('assessment');
    }
  };

  const addStudent = (
    studentName: string,
    studentAvatar: string
  ) => {
    const cleanName = studentName.trim();
    if (!cleanName) return false;

    const newStudent: Student = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: cleanName,
      avatar: studentAvatar,
      createdAt: new Date().toISOString()
    };

    setStudents((current) => [...current, newStudent]);

    localStorage.setItem(
      studentProgressKey(newStudent.id),
      JSON.stringify(cloneInitialProgress())
    );

    saveLearningState(newStudent.id, { ...initialLearningState });

    return true;
  };

  const deleteStudent = (id: string) => {
    setStudents((current) =>
      current.filter((student) => student.id !== id)
    );

    localStorage.removeItem(studentProgressKey(id));
    localStorage.removeItem(studentLearningKey(id));

    if (teacherSelectedId === id) setTeacherSelectedId(null);

    if (activeStudentId === id) {
      setActiveStudentId(null);
      setLearning({ ...initialLearningState });
      setProgress(cloneInitialProgress());
    }
  };

  const updateTeacherLevel = (
    studentId: string,
    level: Level | null
  ) => {
    const current = loadLearningState(studentId);
    const next = {
      ...current,
      manualLevel: level,
      updatedAt: new Date().toISOString(),
      levelHistory:
        level
          ? addLevelHistory(
              current.levelHistory ?? [],
              level,
              'professor'
            )
          : current.levelHistory ?? []
    };

    saveLearningState(studentId, next);

    if (activeStudentId === studentId) {
      setLearning(next);
    }

    setTeacherSelectedId((id) => id);
  };

  const registerAttempt = (correct: boolean) => {
    if (!activeStudentId) return;

    setLearning((current) => {
      const next: LearningState = {
        ...current,
        correctAnswers:
          current.correctAnswers + (correct ? 1 : 0),
        wrongAnswers:
          current.wrongAnswers + (correct ? 0 : 1),
        totalAttempts: current.totalAttempts + 1,
        updatedAt: new Date().toISOString()
      };

      const suggested =
        calculateSuggestedLevel(next, progress);

      if (
        suggested &&
        suggested !== current.suggestedLevel
      ) {
        next.levelHistory = addLevelHistory(
          next.levelHistory ?? [],
          suggested,
          'sistema'
        );
      }

      next.suggestedLevel = suggested;

      saveLearningState(activeStudentId, next);
      return next;
    });
  };

  const complete = (
    label: string,
    score = 10,
    kind?: 'letters' | 'syllables' | 'words'
  ) => {
    registerAttempt(true);

    setProgress((p) => {
      let next = { ...p };

      if (kind) {
        const max =
          kind === 'letters'
            ? 26
            : kind === 'syllables'
            ? 75
            : 25;

        next = {
          ...next,
          [kind]: Math.min((next as any)[kind] + 1, max)
        };
      }

      return reward(next, label, score);
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 }
    });
  };

  const wrong = () => registerAttempt(false);

  const finishAssessment = (score: number) => {
    if (!activeStudentId) return;

    const initialLevel = levelFromAssessmentScore(score);

    const next: LearningState = {
      ...learning,
      assessmentCompleted: true,
      assessmentScore: score,
      initialLevel,
      suggestedLevel: initialLevel,
      manualLevel: null,
      updatedAt: new Date().toISOString(),
      levelHistory: addLevelHistory(
        learning.levelHistory ?? [],
        initialLevel,
        'sondagem'
      )
    };

    setLearning(next);
    saveLearningState(activeStudentId, next);
    setPage('home');
  };

  const speakCurrentPage = () => {
    const messages: Partial<Record<Page, string>> = {
      home: `Olá, ${name}! Vamos aprender brincando? Você pode escolher começar a aprender ou continuar nos jogos.`,
      learn: 'Escolha uma atividade. Você pode aprender letras, sílabas, palavras, leitura ou escrita.',
      letters: 'Nesta atividade, observe a letra, escute o som e veja uma palavra que começa com ela.',
      syllables: 'Nesta atividade, escute a sílaba e tente repetir em voz alta.',
      words: 'Olhe a imagem e escolha a letra que completa a palavra.',
      reading: 'Olhe a imagem e escolha a palavra correta.',
      writing: 'Passe o dedo ou o mouse por cima da letra e depois aperte em avaliar escrita.',
      games: 'Escolha um dos jogos. Você pode encontrar letras, combinar imagens com palavras ou organizar uma palavra.',
      achievements: 'Aqui estão suas conquistas e recompensas pelas atividades concluídas.',
      profile: `Este é o seu perfil, ${name}. Aqui você pode ver suas estrelas, pontos e atividades concluídas.`
    };

    speak(messages[page] ?? 'Vamos aprender juntos!');
  };

  if (page === 'role') {
    return (
      <RoleSelection
        onStudent={() => setPage('students')}
        onTeacher={() => {
          setTeacherSelectedId(null);
          setPage('adult');
        }}
      />
    );
  }

  if (page === 'students') {
    return (
      <StudentSelection
        students={students}
        onSelect={selectStudent}
        onBack={() => setPage('role')}
      />
    );
  }

  if (page === 'assessment') {
    return (
      <InitialAssessment
        name={name}
        onFinish={finishAssessment}
        onBack={() => setPage('students')}
      />
    );
  }

  if (page === 'adult') {
    const selectedStudent =
      students.find(
        (student) => student.id === teacherSelectedId
      ) || null;

    const selectedProgress = selectedStudent
      ? loadStudentProgress(selectedStudent.id)
      : null;

    const selectedLearning = selectedStudent
      ? loadLearningState(selectedStudent.id)
      : null;

    return (
      <TeacherArea
        students={students}
        selectedStudent={selectedStudent}
        selectedProgress={selectedProgress}
        selectedLearning={selectedLearning}
        onAddStudent={addStudent}
        onDeleteStudent={deleteStudent}
        onViewStudent={(student) =>
          setTeacherSelectedId(student.id)
        }
        onChangeLevel={updateTeacherLevel}
        onBack={() => setPage('role')}
      />
    );
  }

  const nav = [
    ['home', Home, 'Início'],
    ['learn', BookOpen, 'Aprender'],
    ['games', Gamepad2, 'Jogos'],
    ['achievements', Trophy, 'Conquistas'],
    ['profile', User, 'Perfil']
  ] as const;

  return (
    <div
      className="app student-area"
      style={{ textTransform: 'uppercase' }}
    >
      <header>
        <button
          className="brand"
          onClick={() => setPage('home')}
        >
          <span>🌈</span>
          <b>Alfabetização Infantil Interativa</b>
        </button>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button
            className="audio"
            onClick={speakCurrentPage}
            title="Ouvir instruções desta tela"
          >
            <Volume2 size={18} />
            Ouvir tela
          </button>

          <div className="score">
            <Star size={18} />
            {progress.stars}
            <b>⭐</b>
            <span>{progress.points} pts</span>
          </div>
        </div>
      </header>

      <main>
        {page !== 'home' && (
          <button
            className="back"
            onClick={() => setPage('home')}
          >
            <ArrowLeft />
            Voltar
          </button>
        )}

        {page === 'home' && (
          <HomePage
            name={name}
            avatar={avatar}
            progress={progress}
            learning={learning}
            go={setPage}
          />
        )}

        {page === 'learn' && (
          <Learn
            go={setPage}
            learning={learning}
          />
        )}

        {page === 'letters' && (
          <Letters
            complete={complete}
            wrong={wrong}
          />
        )}

        {page === 'syllables' && (
          <Syllables
            complete={complete}
            wrong={wrong}
          />
        )}

        {page === 'words' && (
          <Quiz
            title="🧩 Forme a palavra"
            questions={wordQuestions}
            complete={() =>
              complete('Formação de palavras', 15, 'words')
            }
            wrong={wrong}
          />
        )}

        {page === 'reading' && (
          <Reading
            complete={() =>
              complete('Leitura', 15, 'words')
            }
            wrong={wrong}
          />
        )}

        {page === 'writing' && (
          <Writing
            complete={() =>
              complete('Prática de escrita', 12)
            }
            wrong={wrong}
          />
        )}

        {page === 'games' && (
          <Games
            complete={complete}
            wrong={wrong}
          />
        )}

        {page === 'achievements' && (
          <Achievements progress={progress} />
        )}

        {page === 'profile' && (
          <Profile
            name={name}
            avatar={avatar}
            progress={progress}
            learning={learning}
            go={setPage}
          />
        )}
      </main>

      <nav>
        {nav.map(([p, Icon, label]) => (
          <button
            className={page === p ? 'active' : ''}
            onClick={() => setPage(p as Page)}
            key={p}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ===========================
   ESCOLHA DE PERFIL
=========================== */

function RoleSelection({
  onStudent,
  onTeacher
}: {
  onStudent: () => void;
  onTeacher: () => void;
}) {
  return (
    <div
      className="app role-area"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textTransform: 'uppercase'
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '900px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '64px' }}>🌈📚</div>

        <h1>Alfabetização Infantil Interativa</h1>

        <p className="instruction">
          Escolha como você deseja entrar.
        </p>

        <button
          className="audio"
          onClick={() =>
            speak(
              'Bem-vindo ao Alfabetização Infantil Interativa. Se você é aluno, aperte em Entrar como Aluno. Se você é professor, aperte em Entrar como Professor.'
            )
          }
          style={{ margin: '10px auto 0' }}
        >
          <Volume2 />
          Ouvir instruções
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '32px'
          }}
        >
          <button
            className="module"
            onClick={onStudent}
            style={{
              minHeight: '260px',
              cursor: 'pointer',
              padding: '28px'
            }}
          >
            <span style={{ fontSize: '72px' }}>🧒</span>
            <b style={{ fontSize: '28px' }}>
              Entrar como Aluno
            </b>
            <small style={{ fontSize: '16px' }}>
              Faça a sondagem inicial e comece a aprender.
            </small>
          </button>

          <button
            className="module"
            onClick={onTeacher}
            style={{
              minHeight: '260px',
              cursor: 'pointer',
              padding: '28px'
            }}
          >
            <span style={{ fontSize: '72px' }}>👩‍🏫</span>
            <b style={{ fontSize: '28px' }}>
              Entrar como Professor
            </b>
            <small style={{ fontSize: '16px' }}>
              Cadastre alunos, acompanhe níveis e progresso.
            </small>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   ESCOLHA DO ALUNO
=========================== */

function StudentSelection({
  students,
  onSelect,
  onBack
}: {
  students: Student[];
  onSelect: (student: Student) => void;
  onBack: () => void;
}) {
  return (
    <div
      className="app student-area student-select-area"
      style={{
        minHeight: '100vh',
        padding: '24px',
        textTransform: 'uppercase'
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '980px',
          margin: '0 auto'
        }}
      >
        <button className="back" onClick={onBack}>
          <ArrowLeft />
          Voltar
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px' }}>🎒✨</div>
          <h1>Quem vai aprender hoje?</h1>
          <p className="instruction">
            Escolha o seu nome para entrar no seu perfil.
          </p>

          <button
            className="audio"
            onClick={() =>
              speak(
                students.length === 0
                  ? 'Ainda não há alunos cadastrados. Peça para o professor cadastrar um aluno primeiro.'
                  : 'Escolha o seu nome ou o seu desenho para entrar e começar a aprender.'
              )
            }
            style={{ margin: '10px auto 0' }}
          >
            <Volume2 />
            Ouvir instruções
          </button>
        </div>

        {students.length === 0 ? (
          <div
            className="gameCard"
            style={{
              maxWidth: '620px',
              margin: '32px auto',
              textAlign: 'center',
              padding: '32px'
            }}
          >
            <div style={{ fontSize: '54px' }}>👩‍🏫</div>
            <h3>Nenhum aluno cadastrado</h3>
            <p>
              Peça para a professora cadastrar um aluno
              antes de entrar.
            </p>

            <button
              className="audio"
              onClick={() =>
                speak(
                  'Nenhum aluno foi cadastrado ainda. Peça para o professor cadastrar seu perfil.'
                )
              }
            >
              <Volume2 />
              Ouvir
            </button>
          </div>
        ) : (
          <div className="grid" style={{ marginTop: '32px' }}>
            {students.map((student) => (
              <button
                className="module"
                key={student.id}
                onClick={() => onSelect(student)}
                style={{
                  minHeight: '220px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '72px' }}>
                  {student.avatar}
                </span>

                <b style={{ fontSize: '25px' }}>
                  {student.name}
                </b>

                <small>
                  Toque aqui para entrar
                </small>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ===========================
   SONDAGEM INICIAL
=========================== */

const assessmentQuestions = [
  {
    title: 'Qual destes é uma letra?',
    emoji: '🔤',
    options: ['A', '🚗', '⭐'],
    answer: 'A'
  },
  {
    title: 'Qual opção tem duas letras juntas formando uma sílaba?',
    emoji: '🧩',
    options: ['BA', 'B', '⚽'],
    answer: 'BA'
  },
  {
    title: 'Qual letra começa a palavra GATO?',
    emoji: '🐱',
    options: ['G', 'P', 'M'],
    answer: 'G'
  },
  {
    title: 'Complete: C _ S A',
    emoji: '🏠',
    options: ['A', 'O', 'U'],
    answer: 'A'
  },
  {
    title: 'Qual palavra combina com a imagem?',
    emoji: '⚽',
    options: ['BOLA', 'CASA', 'PATO'],
    answer: 'BOLA'
  },
  {
    title: 'Na frase “O GATO CORRE”, quem corre?',
    emoji: '📖',
    options: ['GATO', 'CASA', 'BOLA'],
    answer: 'GATO'
  }
] as const;

function InitialAssessment({
  name,
  onFinish,
  onBack
}: {
  name: string;
  onFinish: (score: number) => void;
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState('');

  const question = assessmentQuestions[index];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(
        `${question.title}. Opções: ${question.options.join(', ')}`
      );
    }, 450);

    return () => window.clearTimeout(timer);
  }, [index]);

  const choose = (option: string) => {
    if (selected) return;

    setSelected(option);

    const correct = option === question.answer;

    if (correct) {
      setScore((current) => current + 1);
      setMessage('Muito bem! 🌟');
      speak('Muito bem!');
    } else {
      setMessage('Tudo bem! Vamos continuar 😊');
      speak('Tudo bem. Vamos continuar.');
    }
  };

  const next = () => {
    if (!selected) return;

    if (index === assessmentQuestions.length - 1) {
      onFinish(score);
      return;
    }

    setIndex((current) => current + 1);
    setSelected('');
    setMessage('');
  };

  return (
    <div
      className="app student-area assessment-area"
      style={{
        minHeight: '100vh',
        padding: '24px',
        textTransform: 'uppercase'
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '760px',
          margin: '0 auto'
        }}
      >
        <button className="back" onClick={onBack}>
          <ArrowLeft />
          Voltar
        </button>

        <div className="gameCard" style={{ padding: '28px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '54px' }}>📝✨</div>
            <h2>Sondagem inicial de {name}</h2>
            <p className="instruction">
              Vamos fazer algumas atividades rápidas antes de começar.
              Não se preocupe em acertar tudo. Apenas faça o seu melhor!
            </p>

            <button
              className="audio"
              onClick={() =>
                speak(
                  `Olá, ${name}. Vamos fazer algumas atividades rápidas antes de começar. Não se preocupe em acertar tudo. Faça o seu melhor.`
                )
              }
              style={{ margin: '8px auto 14px' }}
            >
              <Volume2 />
              Ouvir explicação
            </button>

            <p>
              Questão {index + 1} de {assessmentQuestions.length}
            </p>
          </div>

          <div className="picture" style={{ fontSize: '72px' }}>
            {question.emoji}
          </div>

          <h3 style={{ textAlign: 'center' }}>
            {question.title}
          </h3>

          <div className="row">
            <button
              className="audio"
              onClick={() => {
                speak(question.title);
                setTimeout(
                  () =>
                    speak(
                      `Opções: ${question.options.join(', ')}`
                    ),
                  1200
                );
              }}
            >
              <Volume2 />
              Ouvir pergunta e opções
            </button>
          </div>

          <div className="answers words">
            {question.options.map((option) => (
              <button
                key={option}
                disabled={Boolean(selected)}
                onClick={() => choose(option)}
                style={{
                  opacity:
                    selected && selected !== option ? 0.65 : 1
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {message && (
            <p className="good" style={{ textAlign: 'center' }}>
              {message}
            </p>
          )}

          <div className="row">
            <button
              className="primary"
              disabled={!selected}
              onClick={next}
            >
              {index === assessmentQuestions.length - 1
                ? 'Ver resultado'
                : 'Próxima questão →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   HOME
=========================== */

function HomePage({
  name,
  avatar,
  progress,
  learning,
  go
}: {
  name: string;
  avatar: string;
  progress: Progress;
  learning: LearningState;
  go: (p: Page) => void;
}) {
  void learning;

  return (
    <section className="hero">
      <div>
        <div className="hello">
          Olá, {name}! {avatar}
        </div>

        <h1>
          Vamos aprender <em>brincando?</em> ✨
        </h1>

        <p>
          Letras, sons, palavras e muitos desafios
          divertidos estão esperando por você.
        </p>

        <button
          className="audio"
          onClick={() =>
            speak(
              `Olá, ${name}! Vamos aprender brincando? Você pode apertar em começar a aprender para escolher uma atividade, ou continuar aprendendo para brincar com os jogos.`
            )
          }
          style={{ marginTop: '12px' }}
        >
          <Volume2 />
          Ouvir esta tela
        </button>

        <div className="actions">
          <button
            className="primary"
            onClick={() => go('learn')}
          >
            🚀 Começar a aprender
          </button>

          {progress.activities > 0 && (
            <button
              className="secondary"
              onClick={() => go('games')}
            >
              ▶ Continuar aprendendo
            </button>
          )}
        </div>

        <div className="progressCard">
          <b>Seu progresso</b>
          <div className="progressBar">
            <span
              style={{
                width: `${pct(progress.activities, 30)}%`
              }}
            />
          </div>
          <small>
            {progress.activities} atividades concluídas
          </small>
        </div>
      </div>

      <div className="heroArt">
        <div className="mascot">{avatar}</div>
        <div className="floating">A B C</div>
        <div className="floating">⭐ {progress.stars}</div>
      </div>
    </section>
  );
}

/* ===========================
   MENU APRENDER
=========================== */

function Learn({
  go,
  learning
}: {
  go: (p: Page) => void;
  learning: LearningState;
}) {
  const currentLevel = getCurrentLevel(learning);

  const allModules: {
    page: Page;
    emoji: string;
    title: string;
    text: string;
  }[] = [
    {
      page: 'letters',
      emoji: '🔤',
      title: 'LETRAS',
      text: 'CONHEÇA AS LETRAS E SEUS SONS.'
    },
    {
      page: 'syllables',
      emoji: '🧩',
      title: 'SÍLABAS',
      text: 'JUNTE LETRAS E PRATIQUE OS SONS.'
    },
    {
      page: 'words',
      emoji: '📝',
      title: 'PALAVRAS',
      text: 'COMPLETE PALAVRAS COM A LETRA CERTA.'
    },
    {
      page: 'reading',
      emoji: '📚',
      title: 'LEITURA',
      text: 'ESCOLHA A PALAVRA QUE COMBINA COM A IMAGEM.'
    },
    {
      page: 'writing',
      emoji: '✍️',
      title: 'ESCRITA',
      text: 'PRATIQUE A ESCRITA DAS LETRAS.'
    }
  ];

  const recommendedByLevel: Record<Level, Page[]> = {
    'Garatuja': ['letters', 'writing'],
    'Pré-silábico': ['letters', 'writing', 'words'],
    'Silábico sem valor': ['letters', 'syllables', 'writing'],
    'Silábico com valor': ['syllables', 'words', 'writing'],
    'Silábico-Alfabético': ['words', 'reading', 'writing'],
    'Alfabético': ['reading', 'words', 'writing']
  };

  const recommendedPages =
    currentLevel
      ? recommendedByLevel[currentLevel]
      : ['letters', 'writing'];

  const modules = [
    ...allModules.filter((module) =>
      recommendedPages.includes(module.page)
    ),
    ...allModules.filter(
      (module) => !recommendedPages.includes(module.page)
    )
  ];

  const recommendedCount = recommendedPages.length;

  return (
    <section>
      <h2>📚 O QUE VAMOS APRENDER?</h2>

      <button
        className="audio"
        onClick={() =>
          speak(
            'AS PRIMEIRAS ATIVIDADES FORAM ESCOLHIDAS PARA VOCÊ. ESCOLHA UMA DELAS PARA COMEÇAR. VOCÊ TAMBÉM PODE FAZER AS OUTRAS ATIVIDADES.'
          )
        }
        style={{ marginBottom: '18px' }}
      >
        <Volume2 />
        OUVIR OPÇÕES
      </button>

      <p className="instruction">
        ⭐ COMECE PELAS ATIVIDADES RECOMENDADAS
      </p>

      <div className="grid">
        {modules.map((module, index) => (
          <button
            key={module.page}
            className="module"
            onClick={() => go(module.page)}
            style={{
              border:
                index < recommendedCount
                  ? '3px solid currentColor'
                  : undefined
            }}
          >
            <span>{module.emoji}</span>
            <b>{module.title}</b>
            <small>{module.text}</small>

            {index < recommendedCount && (
              <small>⭐ RECOMENDADA</small>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

/* ===========================
   COMPONENTE DE ATIVIDADE
=========================== */

function Activity({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="gameCard">{children}</div>
    </section>
  );
}

/* ===========================
   LETRAS
=========================== */

function Letters({
  complete,
  wrong
}: {
  complete: (
    label: string,
    score?: number,
    kind?: 'letters'
  ) => void;
  wrong: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState('');

  const [upper, _lower, word, emoji] = letters[index];
  void _lower;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(`LETRA ${upper}. ${word}.`);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [index, upper, word]);

  const next = () => {
    setIndex((current) => (current + 1) % letters.length);
    setMessage('');
  };

  const previous = () => {
    setIndex(
      (current) =>
        (current - 1 + letters.length) % letters.length
    );
    setMessage('');
  };

  const check = () => {
    complete(`Letra ${upper}`, 8, 'letters');
    setMessage(`Muito bem! ${upper} de ${word} 🎉`);
    speak(`${upper}. ${word}.`);
  };

  return (
    <Activity title="🔤 Conhecendo as letras">
      <p className="instruction">
        Letra {index + 1} de {letters.length}
      </p>

      <div className="picture">{emoji}</div>

      <div className="trace">
        {upper}
      </div>

      <h3 style={{ textAlign: 'center' }}>{word}</h3>

      <div className="row">
        <button
          className="audio"
          onClick={() => speak(`Letra ${upper}. ${word}`)}
        >
          <Volume2 />
          Ouvir
        </button>

        <button className="primary" onClick={check}>
          ⭐ Eu pratiquei
        </button>
      </div>

      {message && <p className="good">{message}</p>}

      <div className="row">
        <button className="soft" onClick={previous}>
          ← Anterior
        </button>

        <button className="soft" onClick={next}>
          Próxima →
        </button>
      </div>
    </Activity>
  );
}

/* ===========================
   SÍLABAS
=========================== */

function Syllables({
  complete,
  wrong
}: {
  complete: (
    label: string,
    score?: number,
    kind?: 'syllables'
  ) => void;
  wrong: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState('');
  const current = syllables[index];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(`REPITA A SÍLABA ${current}`);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [index, current]);

  const next = () => {
    setIndex((currentIndex) =>
      (currentIndex + 1) % syllables.length
    );
    setMessage('');
  };

  return (
    <Activity title="🧩 Vamos praticar sílabas">
      <p className="instruction">
        Sílaba {index + 1} de {syllables.length}
      </p>

      <div className="trace">{current}</div>

      <div className="row">
        <button
          className="audio"
          onClick={() => speak(current)}
        >
          <Volume2 />
          Ouvir sílaba
        </button>

        <button
          className="primary"
          onClick={() => {
            complete(`Sílaba ${current}`, 10, 'syllables');
            setMessage(`Muito bem! Você praticou ${current} 🌟`);
            setTimeout(next, 900);
          }}
        >
          ✅ Consegui repetir
        </button>
      </div>

      {message && <p className="good">{message}</p>}

      <div className="row">
        <button
          className="soft"
          onClick={() => {
            wrong();
            setMessage('Tudo bem! Ouça novamente e tente repetir 😊');
          }}
        >
          Ainda estou aprendendo
        </button>

        <button className="soft" onClick={next}>
          Próxima →
        </button>
      </div>
    </Activity>
  );
}

/* ===========================
   PALAVRAS
=========================== */

type WordQuestion = {
  emoji: string;
  pattern: string;
  options: readonly string[];
  answer: string;
  word: string;
};

function Quiz({
  title,
  questions,
  complete,
  wrong
}: {
  title: string;
  questions: readonly WordQuestion[];
  complete: () => void;
  wrong: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [message, setMessage] = useState('');

  const question = questions[index];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(
        `OLHE A IMAGEM E ESCOLHA A LETRA QUE COMPLETA A PALAVRA ${question.word}. OPÇÕES: ${question.options.join(', ')}`
      );
    }, 450);

    return () => window.clearTimeout(timer);
  }, [index]);

  const displayedPattern = selectedLetter
    ? question.pattern.replace('_', selectedLetter)
    : question.pattern;

  const choose = (option: string) => {
    setSelectedLetter(option);

    if (option === question.answer) {
      setMessage(`Parabéns! 🎉 Você formou ${question.word}!`);
      speak(question.word);
      complete();

      setTimeout(() => {
        setMessage('');
        setSelectedLetter('');
        setIndex(
          (current) => (current + 1) % questions.length
        );
      }, 1100);
    } else {
      wrong();
      setMessage(
        'Quase! Veja a letra que você colocou e tente novamente 😊'
      );
    }
  };

  return (
    <Activity title={title}>
      <p className="instruction">
        Palavra {index + 1} de {questions.length}
      </p>

      <div className="picture">{question.emoji}</div>

      <div className="pattern">{displayedPattern}</div>

      <div className="answers">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => choose(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {message && (
        <p
          className={
            message.includes('Parabéns') ? 'good' : 'hint'
          }
        >
          {message}
        </p>
      )}
    </Activity>
  );
}

/* ===========================
   LEITURA
=========================== */

function Reading({
  complete,
  wrong
}: {
  complete: () => void;
  wrong: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState('');

  const question = readingQuestions[index];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(
        `OLHE A IMAGEM E ESCOLHA A PALAVRA CORRETA. OPÇÕES: ${question.options.join(', ')}`
      );
    }, 450);

    return () => window.clearTimeout(timer);
  }, [index]);

  const choose = (option: string) => {
    if (option === question.answer) {
      setMessage(`Muito bem! É ${question.answer} 🎉`);
      speak(question.answer);
      complete();

      setTimeout(() => {
        setMessage('');
        setIndex(
          (current) =>
            (current + 1) % readingQuestions.length
        );
      }, 1000);
    } else {
      wrong();
      setMessage('Quase! Observe a imagem e tente outra palavra 😊');
    }
  };

  return (
    <Activity title="📖 Vamos ler">
      <p className="instruction">
        Questão {index + 1} de {readingQuestions.length}
      </p>

      <div className="picture">{question.emoji}</div>

      <div className="answers words">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => choose(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {message && (
        <p
          className={
            message.includes('Muito bem') ? 'good' : 'hint'
          }
        >
          {message}
        </p>
      )}
    </Activity>
  );
}

/* ===========================
   ESCRITA
=========================== */

function Writing({
  complete,
  wrong
}: {
  complete: () => void;
  wrong: () => void;
}) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState('');
  const canvasRef = React.useRef<CanvasHandle>(null);
  const upper = alphabet[index];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(
        `FAÇA A LETRA ${upper}. PASSE O DEDO OU O MOUSE POR CIMA DO MODELO.`
      );
    }, 450);

    return () => window.clearTimeout(timer);
  }, [index, upper]);

  const nextLetter = () => {
    setIndex((current) => (current + 1) % alphabet.length);
    setMessage('');
  };

  const previousLetter = () => {
    setIndex(
      (current) =>
        (current - 1 + alphabet.length) % alphabet.length
    );
    setMessage('');
  };

  const evaluateWriting = () => {
    const correct = canvasRef.current?.validate();

    if (!correct) {
      wrong();
      setMessage(
        `😊 Tente novamente! Passe o lápis por cima da letra ${upper}.`
      );
      speak(
        `Tente novamente. Faça a letra ${upper} seguindo o modelo.`
      );
      return;
    }

    setMessage(`🎉 Muito bem! Você escreveu a letra ${upper}!`);
    speak(`Muito bem! Letra ${upper}.`);
    complete();

    setTimeout(nextLetter, 1000);
  };

  return (
    <Activity title="✍️ Hora de escrever">
      <p className="instruction">
        Letra {index + 1} de {alphabet.length}
      </p>

      <div className="trace">{upper}</div>

      <button
        className="audio"
        onClick={() => speak(`Letra ${upper}`)}
      >
        <Volume2 />
        Ouvir letra
      </button>

      <p className="instruction">
        Passe o dedo ou o mouse por cima da letra {upper}.
      </p>

      <Canvas
        key={upper}
        ref={canvasRef}
        letter={upper}
      />

      {message && (
        <p
          className={
            message.includes('Muito bem') ? 'good' : 'hint'
          }
        >
          {message}
        </p>
      )}

      <div className="row">
        <button className="soft" onClick={previousLetter}>
          ← Anterior
        </button>

        <button className="primary" onClick={evaluateWriting}>
          ✅ Avaliar escrita
        </button>

        <button className="soft" onClick={nextLetter}>
          Próxima →
        </button>
      </div>
    </Activity>
  );
}

/* ===========================
   JOGOS VARIADOS
=========================== */

const findLetterPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const letterWords: Record<string, string[]> = {
  A: ['ABELHA', 'AVIÃO', 'ANEL'],
  B: ['BOLA', 'BOCA', 'BOTA'],
  C: ['CASA', 'CAMA', 'COPO'],
  D: ['DADO', 'DENTE', 'DOCE'],
  E: ['ELEFANTE', 'ESCADA', 'ESTRELA'],
  F: ['FACA', 'FOCA', 'FLOR'],
  G: ['GATO', 'GALO', 'GIRAFA'],
  H: ['HIPOPÓTAMO', 'HOTEL', 'HOMEM'],
  I: ['ILHA', 'IGREJA', 'IOIÔ'],
  J: ['JACARÉ', 'JANELA', 'JOGO'],
  K: ['KIWI', 'KARATÊ', 'KETCHUP'],
  L: ['LEÃO', 'LATA', 'LOBO'],
  M: ['MALA', 'MAPA', 'MOTO'],
  N: ['NAVIO', 'NINHO', 'NARIZ'],
  O: ['OVO', 'OLHO', 'ONÇA'],
  P: ['PATO', 'PIPA', 'PATO'],
  Q: ['QUEIJO', 'QUADRO', 'QUATI'],
  R: ['RATO', 'REDE', 'RODA'],
  S: ['SAPO', 'SUCO', 'SINO'],
  T: ['TATU', 'TOMATE', 'TIGRE'],
  U: ['UVA', 'URSO', 'UNHA'],
  V: ['VACA', 'VELA', 'VASO'],
  W: ['WIFI', 'WEB', 'WAFFLE'],
  X: ['XÍCARA', 'XADREZ', 'XALE'],
  Y: ['YOGA', 'YAKISOBA', 'YOUTUBE'],
  Z: ['ZEBRA', 'ZERO', 'ZÍPER']
};

const combineGames = [
  { emoji: '🐱', answer: 'GATO', options: ['PATO', 'GATO', 'BOLA'] },
  { emoji: '🐄', answer: 'VACA', options: ['VACA', 'CASA', 'SAPO'] },
  { emoji: '🦆', answer: 'PATO', options: ['MALA', 'PATO', 'RATO'] },
  { emoji: '🐢', answer: 'TATU', options: ['TATU', 'GATO', 'MOTO'] },
  { emoji: '⚽', answer: 'BOLA', options: ['BOTA', 'BOLA', 'BOCA'] },
  { emoji: '🏠', answer: 'CASA', options: ['CASA', 'MALA', 'MAPA'] },
  { emoji: '🐸', answer: 'SAPO', options: ['SAPO', 'SINO', 'SUCO'] },
  { emoji: '🐭', answer: 'RATO', options: ['GATO', 'RATO', 'PATO'] },
  { emoji: '🦁', answer: 'LEÃO', options: ['LOBO', 'LEÃO', 'GATO'] },
  { emoji: '🐺', answer: 'LOBO', options: ['LEÃO', 'LOBO', 'RATO'] },
  { emoji: '🍇', answer: 'UVA', options: ['UVA', 'OVO', 'SUCO'] },
  { emoji: '🥚', answer: 'OVO', options: ['UVA', 'OVO', 'BOLA'] },
  { emoji: '🚢', answer: 'NAVIO', options: ['MAPA', 'MOTO', 'NAVIO'] },
  { emoji: '🦓', answer: 'ZEBRA', options: ['VACA', 'ZEBRA', 'GIRAFA'] },
  { emoji: '🧀', answer: 'QUEIJO', options: ['QUEIJO', 'DOCE', 'BOLO'] },
  { emoji: '☕', answer: 'XÍCARA', options: ['COPO', 'XÍCARA', 'VASO'] },
  { emoji: '🌼', answer: 'FLOR', options: ['FLOR', 'FACA', 'FOCA'] },
  { emoji: '🐝', answer: 'ABELHA', options: ['ABELHA', 'AVIÃO', 'ANEL'] },
  { emoji: '🐊', answer: 'JACARÉ', options: ['JANELA', 'JACARÉ', 'GIRAFA'] },
  { emoji: '🦛', answer: 'HIPOPÓTAMO', options: ['ELEFANTE', 'HIPOPÓTAMO', 'JACARÉ'] },
  { emoji: '🐻', answer: 'URSO', options: ['URSO', 'GATO', 'LOBO'] },
  { emoji: '🐯', answer: 'TIGRE', options: ['LEÃO', 'TIGRE', 'ZEBRA'] },
  { emoji: '🍅', answer: 'TOMATE', options: ['TOMATE', 'QUEIJO', 'UVA'] },
  { emoji: '🥝', answer: 'KIWI', options: ['UVA', 'KIWI', 'TOMATE'] },
  { emoji: '👃', answer: 'NARIZ', options: ['BOCA', 'NARIZ', 'OLHO'] },
  { emoji: '👁️', answer: 'OLHO', options: ['OLHO', 'BOCA', 'UNHA'] },
  { emoji: '🦷', answer: 'DENTE', options: ['DENTE', 'NARIZ', 'BOCA'] },
  { emoji: '🕯️', answer: 'VELA', options: ['VASO', 'VELA', 'REDE'] },
  { emoji: '🪁', answer: 'PIPA', options: ['PIPA', 'MAPA', 'MALA'] },
  { emoji: '🎲', answer: 'DADO', options: ['DADO', 'DOCE', 'DENTE'] }
];

const organizeWords = [
  'CASA', 'BOLA', 'PATO', 'SAPO', 'MALA',
  'GATO', 'VACA', 'TATU', 'RATO', 'MAPA',
  'DADO', 'BOCA', 'MOTO', 'LATA', 'PIPA',
  'BOTA', 'CAMA', 'LOBO', 'SUCO', 'UVA',
  'OVO', 'LEÃO', 'NAVIO', 'ZEBRA', 'FLOR',
  'FOCA', 'URSO', 'VELA', 'VASO', 'RODA',
  'SINO', 'REDE', 'UNHA', 'OLHO', 'NARIZ',
  'TIGRE', 'DOCE', 'COPO', 'ANEL', 'JOGO'
];

const completeWordGames = [
  { emoji: '🐱', pattern: 'G _ T O', answer: 'A', options: ['A', 'O', 'U'], word: 'GATO' },
  { emoji: '🏠', pattern: 'C A _ A', answer: 'S', options: ['S', 'T', 'P'], word: 'CASA' },
  { emoji: '⚽', pattern: 'B O _ A', answer: 'L', options: ['L', 'R', 'M'], word: 'BOLA' },
  { emoji: '🐸', pattern: 'S A _ O', answer: 'P', options: ['P', 'T', 'L'], word: 'SAPO' },
  { emoji: '🐄', pattern: 'V A _ A', answer: 'C', options: ['C', 'T', 'P'], word: 'VACA' },
  { emoji: '🐭', pattern: 'R A _ O', answer: 'T', options: ['T', 'P', 'D'], word: 'RATO' },
  { emoji: '🍇', pattern: '_ V A', answer: 'U', options: ['U', 'O', 'A'], word: 'UVA' },
  { emoji: '🥚', pattern: 'O _ O', answer: 'V', options: ['V', 'B', 'D'], word: 'OVO' },
  { emoji: '🦓', pattern: 'Z E _ R A', answer: 'B', options: ['B', 'P', 'D'], word: 'ZEBRA' },
  { emoji: '🚢', pattern: 'N A _ I O', answer: 'V', options: ['V', 'B', 'F'], word: 'NAVIO' },
  { emoji: '🌼', pattern: 'F L _ R', answer: 'O', options: ['O', 'A', 'E'], word: 'FLOR' },
  { emoji: '🐻', pattern: 'U R _ O', answer: 'S', options: ['S', 'T', 'P'], word: 'URSO' },
  { emoji: '🐯', pattern: 'T I _ R E', answer: 'G', options: ['G', 'C', 'D'], word: 'TIGRE' },
  { emoji: '👃', pattern: 'N A R _ Z', answer: 'I', options: ['I', 'A', 'O'], word: 'NARIZ' },
  { emoji: '🕯️', pattern: 'V E _ A', answer: 'L', options: ['L', 'R', 'M'], word: 'VELA' }
];

const shuffle = <T,>(items: readonly T[]) =>
  [...items].sort(() => Math.random() - 0.5);

function Games({
  complete,
  wrong
}: {
  complete: (
    label: string,
    score?: number,
    kind?: 'letters' | 'syllables' | 'words'
  ) => void;
  wrong: () => void;
}) {
  const [target, setTarget] = useState(
    findLetterPool[Math.floor(Math.random() * findLetterPool.length)]
  );
  const [letterOptions, setLetterOptions] = useState<string[]>([]);
  const [letterMessage, setLetterMessage] = useState('');

  const [combineIndex, setCombineIndex] = useState(
    Math.floor(Math.random() * combineGames.length)
  );
  const [combineMessage, setCombineMessage] = useState('');

  const [wordIndex, setWordIndex] = useState(
    Math.floor(Math.random() * organizeWords.length)
  );
  const [order, setOrder] = useState<string[]>([]);
  const [organizeMessage, setOrganizeMessage] = useState('');

  const [completeIndex, setCompleteIndex] = useState(
    Math.floor(Math.random() * completeWordGames.length)
  );
  const [completeLetter, setCompleteLetter] = useState('');
  const [completeMessage, setCompleteMessage] = useState('');

  const combine = combineGames[combineIndex];
  const organizeWord = organizeWords[wordIndex];
  const completeGame = completeWordGames[completeIndex];

  const nextRandomIndex = (length: number, current: number) => {
    if (length <= 1) return 0;

    let next = current;

    while (next === current) {
      next = Math.floor(Math.random() * length);
    }

    return next;
  };

  const refreshLetterGame = (newTarget?: string) => {
    const chosen =
      newTarget ??
      findLetterPool[
        Math.floor(Math.random() * findLetterPool.length)
      ];

    const distractors = shuffle(
      findLetterPool.filter((letter) => letter !== chosen)
    ).slice(0, 5);

    setTarget(chosen);
    setLetterOptions(shuffle([chosen, ...distractors]));
  };

  useEffect(() => {
    refreshLetterGame(target);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const examples = letterWords[target] ?? [];
      const exampleText = examples.length
        ? `COMO EM ${examples.join(', ')}`
        : '';

      speak(`ENCONTRE A LETRA ${target}. ${exampleText}`);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [target]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(
        `OLHE A IMAGEM E ESCOLHA A PALAVRA CORRETA. OPÇÕES: ${combine.options.join(', ')}`
      );
    }, 450);

    return () => window.clearTimeout(timer);
  }, [combineIndex]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(
        `ORGANIZE AS LETRAS PARA FORMAR A PALAVRA ${organizeWord}`
      );
    }, 450);

    return () => window.clearTimeout(timer);
  }, [wordIndex]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      speak(
        `COMPLETE A PALAVRA ${completeGame.word}. ESCOLHA A LETRA QUE ESTÁ FALTANDO.`
      );
    }, 450);

    return () => window.clearTimeout(timer);
  }, [completeIndex]);

  const chooseLetter = (letter: string) => {
    if (letter === target) {
      const examples = letterWords[target] ?? [];
      const example =
        examples[Math.floor(Math.random() * examples.length)];

      setLetterMessage(
        `ACHOU A LETRA ${target}! ${example ? `${target} DE ${example}!` : ''} 🎉`
      );

      complete('Jogo: encontre a letra', 10, 'letters');

      setTimeout(() => {
        setLetterMessage('');
        refreshLetterGame();
      }, 1100);
    } else {
      wrong();
      setLetterMessage('QUASE! TENTE OUTRA LETRA 😊');
    }
  };

  const chooseCombine = (word: string) => {
    if (word === combine.answer) {
      setCombineMessage(
        `MUITO BEM! ${combine.emoji} É ${combine.answer}! 🎉`
      );

      speak(combine.answer);
      complete('Jogo: combine imagem e palavra', 12, 'words');

      setTimeout(() => {
        setCombineMessage('');
        setCombineIndex((current) =>
          nextRandomIndex(combineGames.length, current)
        );
      }, 1100);
    } else {
      wrong();
      setCombineMessage(
        'QUASE! OLHE A IMAGEM E TENTE OUTRA PALAVRA 😊'
      );
    }
  };

  const addLetter = (letter: string) => {
    if (order.length >= organizeWord.length) return;
    setOrder((current) => [...current, letter]);
  };

  const checkWord = () => {
    if (order.join('') === organizeWord) {
      setOrganizeMessage(`${organizeWord} FORMADA! 🌟`);
      speak(organizeWord);
      complete('Jogo: organize a palavra', 15, 'words');

      setTimeout(() => {
        setOrder([]);
        setOrganizeMessage('');
        setWordIndex((current) =>
          nextRandomIndex(organizeWords.length, current)
        );
      }, 1100);
    } else {
      wrong();
      setOrganizeMessage('QUASE! LIMPE E TENTE OUTRA VEZ 😊');
    }
  };

  const chooseCompleteLetter = (letter: string) => {
    setCompleteLetter(letter);

    if (letter === completeGame.answer) {
      setCompleteMessage(
        `MUITO BEM! VOCÊ FORMOU ${completeGame.word}! 🎉`
      );
      speak(completeGame.word);
      complete('Jogo: complete a palavra', 12, 'words');

      setTimeout(() => {
        setCompleteLetter('');
        setCompleteMessage('');
        setCompleteIndex((current) =>
          nextRandomIndex(completeWordGames.length, current)
        );
      }, 1100);
    } else {
      wrong();
      setCompleteMessage('QUASE! TENTE OUTRA LETRA 😊');
    }
  };

  const shuffledLetters = useMemo(
    () => shuffle(organizeWord.split('')),
    [organizeWord]
  );

  const displayedCompletePattern = completeLetter
    ? completeGame.pattern.replace('_', completeLetter)
    : completeGame.pattern;

  return (
    <section>
      <h2>🎮 JOGOS EDUCATIVOS VARIADOS</h2>

      <button
        className="audio"
        onClick={() =>
          speak(
            'AQUI TEM QUATRO JOGOS DIFERENTES. AS LETRAS, IMAGENS E PALAVRAS MUDAM A CADA RODADA.'
          )
        }
        style={{ marginBottom: '18px' }}
      >
        <Volume2 />
        OUVIR COMO JOGAR
      </button>

      <div className="gameCard">
        <h3>JOGO 1 — ENCONTRE A LETRA</h3>

        <p>
          ENCONTRE A LETRA <b>{target}</b>
        </p>

        <button
          className="audio"
          onClick={() => {
            const examples = letterWords[target] ?? [];
            speak(
              `ENCONTRE A LETRA ${target}. ${examples.length ? `COMO EM ${examples.join(', ')}` : ''}`
            );
          }}
        >
          <Volume2 />
          OUVIR
        </button>

        <div className="answers">
          {letterOptions.map((letter) => (
            <button
              key={letter}
              onClick={() => chooseLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {letterMessage && <p className="good">{letterMessage}</p>}
      </div>

      <div className="grid mini">
        <div className="gameCard">
          <h3>JOGO 2 — IMAGEM E PALAVRA</h3>

          <div className="picture">{combine.emoji}</div>

          <button
            className="audio"
            onClick={() =>
              speak(
                `ESCOLHA A PALAVRA CORRETA. OPÇÕES: ${combine.options.join(', ')}`
              )
            }
          >
            <Volume2 />
            OUVIR
          </button>

          <div className="answers words">
            {combine.options.map((word) => (
              <button
                key={word}
                onClick={() => chooseCombine(word)}
              >
                {word}
              </button>
            ))}
          </div>

          {combineMessage && <p className="good">{combineMessage}</p>}
        </div>

        <div className="gameCard">
          <h3>JOGO 3 — ORGANIZE A PALAVRA</h3>

          <div className="pattern">
            {order.length
              ? order.join(' ')
              : organizeWord
                  .split('')
                  .map(() => '_')
                  .join(' ')}
          </div>

          <button
            className="audio"
            onClick={() =>
              speak(
                `ORGANIZE AS LETRAS PARA FORMAR ${organizeWord}`
              )
            }
          >
            <Volume2 />
            OUVIR PALAVRA
          </button>

          <div className="answers">
            {shuffledLetters.map((letter, index) => (
              <button
                key={`${letter}-${index}`}
                onClick={() => addLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="row">
            <button
              className="soft"
              onClick={() => {
                setOrder([]);
                setOrganizeMessage('');
              }}
            >
              LIMPAR
            </button>

            <button
              className="primary"
              onClick={checkWord}
            >
              CONFERIR
            </button>
          </div>

          {organizeMessage && (
            <p className="good">{organizeMessage}</p>
          )}
        </div>
      </div>

      <div className="gameCard" style={{ marginTop: '20px' }}>
        <h3>JOGO 4 — COMPLETE A PALAVRA</h3>

        <div className="picture">{completeGame.emoji}</div>

        <div className="pattern">
          {displayedCompletePattern}
        </div>

        <button
          className="audio"
          onClick={() =>
            speak(
              `COMPLETE A PALAVRA ${completeGame.word}. ESCOLHA A LETRA QUE ESTÁ FALTANDO.`
            )
          }
        >
          <Volume2 />
          OUVIR
        </button>

        <div className="answers">
          {completeGame.options.map((letter) => (
            <button
              key={letter}
              onClick={() => chooseCompleteLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {completeMessage && (
          <p
            className={
              completeMessage.includes('MUITO BEM')
                ? 'good'
                : 'hint'
            }
          >
            {completeMessage}
          </p>
        )}
      </div>
    </section>
  );
}

/* ===========================
   CONQUISTAS
=========================== */

function Achievements({
  progress
}: {
  progress: Progress;
}) {
  const achievements = [
    {
      emoji: '🌱',
      title: 'Primeiro passo',
      unlocked: progress.activities >= 1
    },
    {
      emoji: '⭐',
      title: 'Super estudante',
      unlocked: progress.activities >= 10
    },
    {
      emoji: '🔤',
      title: 'Mestre das letras',
      unlocked: progress.letters >= 20
    },
    {
      emoji: '📖',
      title: 'Leitor iniciante',
      unlocked: progress.words >= 10
    },
    {
      emoji: '🏆',
      title: 'Campeão das atividades',
      unlocked: progress.activities >= 25
    }
  ];

  return (
    <section>
      <h2>🏆 Minhas conquistas</h2>

      <button
        className="audio"
        onClick={() =>
          speak(
            'Aqui estão suas conquistas. Continue fazendo atividades para ganhar novas recompensas.'
          )
        }
        style={{ marginBottom: '18px' }}
      >
        <Volume2 />
        Ouvir
      </button>

      <div className="grid">
        {achievements.map((achievement) => (
          <div
            className="module"
            key={achievement.title}
            style={{
              opacity: achievement.unlocked ? 1 : 0.45
            }}
          >
            <span>{achievement.emoji}</span>
            <b>{achievement.title}</b>
            <small>
              {achievement.unlocked
                ? 'Conquistado! 🎉'
                : 'Continue aprendendo para desbloquear.'}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===========================
   PERFIL DO ALUNO
=========================== */

function Profile({
  name,
  avatar,
  progress,
  learning,
  go
}: {
  name: string;
  avatar: string;
  progress: Progress;
  learning: LearningState;
  go: (p: Page) => void;
}) {
  void learning;

  return (
    <section>
      <h2>👤 Meu perfil</h2>

      <div className="gameCard">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '82px' }}>{avatar}</div>
          <h2>{name}</h2>

          <button
            className="audio"
            onClick={() =>
              speak(
                `Este é o seu perfil, ${name}. Você tem ${progress.stars} estrelas, concluiu ${progress.activities} atividades e ganhou ${progress.points} pontos. Continue aprendendo!`
              )
            }
          >
            <Volume2 />
            Ouvir meu progresso
          </button>
        </div>

        <div className="grid mini" style={{ marginTop: '20px' }}>
          <Stat
            icon="⭐"
            label="Estrelas"
            value={String(progress.stars)}
          />
          <Stat
            icon="🎯"
            label="Atividades"
            value={String(progress.activities)}
          />
          <Stat
            icon="🏅"
            label="Pontos"
            value={String(progress.points)}
          />
        </div>

        <div
          className="gameCard"
          style={{ marginTop: '20px' }}
        >
          <h3>🌟 Continue aprendendo!</h3>
          <p>
            Cada atividade concluída ajuda você a praticar
            letras, sílabas, palavras, leitura e escrita.
          </p>

          <button
            className="audio"
            onClick={() =>
              speak(
                'Cada atividade concluída ajuda você a praticar letras, sílabas, palavras, leitura e escrita. Continue aprendendo!'
              )
            }
          >
            <Volume2 />
            Ouvir mensagem
          </button>
        </div>

        <button
          className="soft"
          onClick={() => go('role')}
        >
          🔄 Trocar perfil
        </button>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="module">
      <span>{icon}</span>
      <b>{value}</b>
      <small>{label}</small>
    </div>
  );
}

/* ===========================
   ÁREA DO PROFESSOR
=========================== */

function TeacherArea({
  students,
  selectedStudent,
  selectedProgress,
  selectedLearning,
  onAddStudent,
  onDeleteStudent,
  onViewStudent,
  onChangeLevel,
  onBack
}: {
  students: Student[];
  selectedStudent: Student | null;
  selectedProgress: Progress | null;
  selectedLearning: LearningState | null;
  onAddStudent: (
    studentName: string,
    studentAvatar: string
  ) => boolean;
  onDeleteStudent: (id: string) => void;
  onViewStudent: (student: Student) => void;
  onChangeLevel: (
    studentId: string,
    level: Level | null
  ) => void;
  onBack: () => void;
}) {
  const [studentName, setStudentName] = useState('');
  const [studentAvatar, setStudentAvatar] = useState('🧒');
  const [message, setMessage] = useState('');

  const avatars = ['🧒', '👧', '👦', '🧑', '👩', '👨'];

  const add = () => {
    const ok = onAddStudent(studentName, studentAvatar);

    if (!ok) {
      setMessage('Digite o nome do aluno.');
      return;
    }

    setStudentName('');
    setMessage('Aluno cadastrado com sucesso! ✅');
  };

  const accuracy =
    selectedLearning && selectedLearning.totalAttempts > 0
      ? Math.round(
          (selectedLearning.correctAnswers /
            selectedLearning.totalAttempts) *
            100
        )
      : 0;

  const currentLevel = selectedLearning
    ? getCurrentLevel(selectedLearning)
    : null;

  return (
    <div className="app teacher-area" style={{ minHeight: '100vh' }}>
      <header>
        <button className="brand" onClick={onBack}>
          <span>👩‍🏫</span>
          <b>Área do Professor</b>
        </button>

        <button className="soft" onClick={onBack}>
          Trocar perfil
        </button>
      </header>

      <main>
        <section>
          <h2>👩‍🏫 Painel pedagógico</h2>

          <div className="gameCard">
            <h3>➕ Cadastrar aluno</h3>

            <input
              value={studentName}
              onChange={(event) =>
                setStudentName(event.target.value)
              }
              placeholder="Nome do aluno"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                border: '1px solid #ddd',
                fontSize: '16px',
                marginBottom: '14px'
              }}
            />

            <div className="answers">
              {avatars.map((item) => (
                <button
                  key={item}
                  onClick={() => setStudentAvatar(item)}
                  style={{
                    transform:
                      studentAvatar === item
                        ? 'scale(1.12)'
                        : 'none'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="primary" onClick={add}>
              Cadastrar aluno
            </button>

            {message && <p className="good">{message}</p>}
          </div>

          <div className="grid" style={{ marginTop: '24px' }}>
            {students.map((student) => {
              const learning = loadLearningState(student.id);
              const level = getCurrentLevel(learning);

              return (
                <div className="module" key={student.id}>
                  <span style={{ fontSize: '54px' }}>
                    {student.avatar}
                  </span>

                  <b>{student.name}</b>

                  <small>
                    {learning.assessmentCompleted
                      ? `Nível: ${level}`
                      : 'Sondagem pendente'}
                  </small>

                  <button
                    className="primary"
                    onClick={() => onViewStudent(student)}
                  >
                    <BarChart3 size={18} />
                    Ver progresso
                  </button>

                  <button
                    className="soft"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Excluir o aluno ${student.name}?`
                        )
                      ) {
                        onDeleteStudent(student.id);
                      }
                    }}
                  >
                    Excluir
                  </button>
                </div>
              );
            })}
          </div>

          {students.length === 0 && (
            <div
              className="gameCard"
              style={{
                marginTop: '24px',
                textAlign: 'center'
              }}
            >
              <p>
                Nenhum aluno cadastrado ainda.
              </p>
            </div>
          )}

          {selectedStudent &&
            selectedProgress &&
            selectedLearning && (
              <div
                className="gameCard"
                style={{ marginTop: '28px' }}
              >
                <h2>
                  {selectedStudent.avatar}{' '}
                  {selectedStudent.name}
                </h2>

                <div className="grid mini">
                  <Stat
                    icon="📚"
                    label="Nível atual"
                    value={
                      currentLevel ??
                      'Sondagem pendente'
                    }
                  />
                  <Stat
                    icon="🎯"
                    label="Atividades"
                    value={String(
                      selectedProgress.activities
                    )}
                  />
                  <Stat
                    icon="⭐"
                    label="Pontos"
                    value={String(
                      selectedProgress.points
                    )}
                  />
                  <Stat
                    icon="✅"
                    label="Taxa de acerto"
                    value={`${accuracy}%`}
                  />
                </div>

                <div
                  className="gameCard"
                  style={{ marginTop: '20px' }}
                >
                  <h3>
                    <ClipboardCheck size={20} /> Indicadores
                    pedagógicos
                  </h3>

                  <p>
                    Sondagem inicial:{' '}
                    <b>
                      {selectedLearning.assessmentCompleted
                        ? `${selectedLearning.assessmentScore}/6`
                        : 'Não realizada'}
                    </b>
                  </p>

                  <p>
                    Nível inicial:{' '}
                    <b>
                      {selectedLearning.initialLevel ??
                        'Pendente'}
                    </b>
                  </p>

                  <p>
                    Nível sugerido pelo sistema:{' '}
                    <b>
                      {selectedLearning.suggestedLevel ??
                        'Pendente'}
                    </b>
                  </p>

                  <p>
                    Acertos:{' '}
                    <b>
                      {selectedLearning.correctAnswers}
                    </b>{' '}
                    • Dificuldades:{' '}
                    <b>
                      {selectedLearning.wrongAnswers}
                    </b>
                  </p>

                  <p className="instruction">
                    O nível apresentado pelo sistema é um
                    indicador automático baseado na sondagem e
                    no desempenho nas atividades. A decisão
                    pedagógica final continua sendo do professor.
                  </p>
                </div>

                <div
                  className="gameCard"
                  style={{ marginTop: '20px' }}
                >
                  <h3>
                    <Pencil size={20} /> Editar nível do aluno
                  </h3>

                  <p>
                    Se você discordar da sugestão automática,
                    selecione manualmente o nível que considera
                    adequado.
                  </p>

                  <select
                    value={
                      selectedLearning.manualLevel ??
                      'automatico'
                    }
                    onChange={(event) => {
                      const value = event.target.value;

                      onChangeLevel(
                        selectedStudent.id,
                        value === 'automatico'
                          ? null
                          : (value as Level)
                      );
                    }}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '14px',
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }}
                  >
                    <option value="automatico">
                      Usar nível sugerido automaticamente
                    </option>

                    {LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>

                  {selectedLearning.manualLevel && (
                    <p className="good">
                      Nível definido manualmente pelo professor:
                      {' '}
                      <b>
                        {selectedLearning.manualLevel}
                      </b>
                    </p>
                  )}

                  {!selectedLearning.manualLevel &&
                    selectedLearning.assessmentCompleted && (
                      <p className="good">
                        O sistema está atualizando o nível
                        automaticamente conforme o desempenho.
                      </p>
                    )}
                </div>

                <div
                  className="gameCard"
                  style={{ marginTop: '20px' }}
                >
                  <h3>🕒 Histórico de evolução</h3>

                  {selectedLearning.levelHistory.length === 0 ? (
                    <p>
                      Ainda não há mudanças de nível registradas.
                    </p>
                  ) : (
                    <div
                      style={{
                        display: 'grid',
                        gap: '10px'
                      }}
                    >
                      {[...selectedLearning.levelHistory]
                        .reverse()
                        .map((entry, index) => (
                          <div
                            key={`${entry.at}-${index}`}
                            style={{
                              padding: '12px',
                              borderRadius: '12px',
                              border: '1px solid #ddd'
                            }}
                          >
                            <b>{entry.level}</b>
                            <div>
                              <small>
                                {new Date(
                                  entry.at
                                ).toLocaleDateString('pt-BR')}{' '}
                                •{' '}
                                {entry.source === 'sondagem'
                                  ? 'SONDAGEM INICIAL'
                                  : entry.source === 'professor'
                                  ? 'ALTERAÇÃO DO PROFESSOR'
                                  : 'ATUALIZAÇÃO AUTOMÁTICA'}
                              </small>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div
                  className="gameCard"
                  style={{ marginTop: '20px' }}
                >
                  <h3>📈 Progresso por habilidade</h3>

                  <p>
                    Letras: {selectedProgress.letters}/26
                  </p>
                  <div className="progressBar">
                    <span
                      style={{
                        width: `${pct(
                          selectedProgress.letters,
                          26
                        )}%`
                      }}
                    />
                  </div>

                  <p>
                    Sílabas: {selectedProgress.syllables}/75
                  </p>
                  <div className="progressBar">
                    <span
                      style={{
                        width: `${pct(
                          selectedProgress.syllables,
                          75
                        )}%`
                      }}
                    />
                  </div>

                  <p>
                    Palavras: {selectedProgress.words}/25
                  </p>
                  <div className="progressBar">
                    <span
                      style={{
                        width: `${pct(
                          selectedProgress.words,
                          25
                        )}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
        </section>
      </main>
    </div>
  );
}
