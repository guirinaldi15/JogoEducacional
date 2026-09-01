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
  ShieldCheck
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


type Student = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

const STUDENTS_KEY = 'alfabetizacao-students';

const cloneInitialProgress = (): Progress =>
  JSON.parse(JSON.stringify(initialProgress)) as Progress;

const studentProgressKey = (id: string) =>
  `alfabetizacao-progress-${id}`;

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


const speak = (t: string) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(t);

    u.lang = 'pt-BR';
    u.rate = 0.82;

    speechSynthesis.speak(u);
  }
};

const pct = (n: number, max: number) =>
  Math.min(100, Math.round((n / max) * 100));

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

  const [name, setName] = useState('Aluno');
  const [avatar, setAvatar] = useState('🧒');

  useEffect(() => {
    localStorage.setItem(
      STUDENTS_KEY,
      JSON.stringify(students)
    );
  }, [students]);

  useEffect(() => {
    if (!activeStudentId) return;

    localStorage.setItem(
      studentProgressKey(activeStudentId),
      JSON.stringify(progress)
    );
  }, [progress, activeStudentId]);

  const selectStudent = (student: Student) => {
    setActiveStudentId(student.id);
    setName(student.name);
    setAvatar(student.avatar);
    setProgress(loadStudentProgress(student.id));
    setPage('home');
  };

  const addStudent = (
    studentName: string,
    studentAvatar: string
  ) => {
    const cleanName = studentName.trim();

    if (!cleanName) {
      return false;
    }

    const newStudent: Student = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      name: cleanName,
      avatar: studentAvatar,
      createdAt: new Date().toISOString()
    };

    setStudents((current) => [
      ...current,
      newStudent
    ]);

    localStorage.setItem(
      studentProgressKey(newStudent.id),
      JSON.stringify(cloneInitialProgress())
    );

    return true;
  };

  const deleteStudent = (id: string) => {
    setStudents((current) =>
      current.filter((student) => student.id !== id)
    );

    localStorage.removeItem(studentProgressKey(id));

    if (teacherSelectedId === id) {
      setTeacherSelectedId(null);
    }

    if (activeStudentId === id) {
      setActiveStudentId(null);
    }
  };

  const complete = (
    label: string,
    score = 10,
    kind?: 'letters' | 'syllables' | 'words'
  ) => {
    setProgress((p) => {
      let n = { ...p };

      if (kind) {
        n = {
          ...n,
          [kind]: Math.min(
            (n as any)[kind] + 1,
            kind === 'letters'
              ? 26
              : kind === 'syllables'
              ? 20
              : 20
          )
        };
      }

      return reward(n, label, score);
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 }
    });
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

  if (page === 'adult') {
    const selectedStudent =
      students.find(
        (student) => student.id === teacherSelectedId
      ) || null;

    const selectedProgress =
      selectedStudent
        ? loadStudentProgress(selectedStudent.id)
        : null;

    return (
      <TeacherArea
        students={students}
        selectedStudent={selectedStudent}
        selectedProgress={selectedProgress}
        onAddStudent={addStudent}
        onDeleteStudent={deleteStudent}
        onViewStudent={(student) =>
          setTeacherSelectedId(student.id)
        }
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
    <div className="app">
      <header>
        <button
          className="brand"
          onClick={() => setPage('home')}
        >
          <span>🌈</span>
          <b>Alfabetização Infantil Interativa</b>
        </button>

        <div className="score">
          <Star size={18} />
          {progress.stars}
          <b>⭐</b>
          <span>{progress.points} pts</span>
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
            go={setPage}
          />
        )}

        {page === 'learn' && (
          <Learn go={setPage} />
        )}

        {page === 'letters' && (
          <Letters complete={complete} />
        )}

        {page === 'syllables' && (
          <Syllables complete={complete} />
        )}

        {page === 'words' && (
          <Quiz
            title="🧩 Forme a palavra"
            questions={wordQuestions}
            complete={() =>
              complete(
                'Formação de palavras',
                15,
                'words'
              )
            }
          />
        )}

        {page === 'reading' && (
          <Reading
            complete={() =>
              complete('Leitura', 15, 'words')
            }
          />
        )}

        {page === 'writing' && (
          <Writing
            complete={() =>
              complete('Prática de escrita', 12)
            }
          />
        )}

        {page === 'games' && (
          <Games complete={complete} />
        )}

        {page === 'achievements' && (
          <Achievements progress={progress} />
        )}

        {page === 'profile' && (
          <Profile
            name={name}
            avatar={avatar}
            setName={setName}
            setAvatar={setAvatar}
            progress={progress}
            go={setPage}
          />
        )}
      </main>

      <nav>
        {nav.map(([p, I, l]) => (
          <button
            className={page === p ? 'active' : ''}
            onClick={() => setPage(p as Page)}
            key={p}
          >
            <I />
            <span>{l}</span>
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
      className="app"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '900px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '64px' }}>
          🌈📚
        </div>

        <h1>
          Alfabetização Infantil Interativa
        </h1>

        <p className="instruction">
          Escolha como você deseja entrar.
        </p>

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
            <span style={{ fontSize: '72px' }}>
              🧒
            </span>

            <b style={{ fontSize: '28px' }}>
              Entrar como Aluno
            </b>

            <small style={{ fontSize: '16px' }}>
              Escolha seu perfil e comece a aprender.
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
            <span style={{ fontSize: '72px' }}>
              👩‍🏫
            </span>

            <b style={{ fontSize: '28px' }}>
              Entrar como Professor
            </b>

            <small style={{ fontSize: '16px' }}>
              Cadastre alunos e acompanhe o progresso.
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
      className="app"
      style={{
        minHeight: '100vh',
        padding: '24px'
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '980px',
          margin: '0 auto'
        }}
      >
        <button
          className="back"
          onClick={onBack}
        >
          <ArrowLeft />
          Voltar
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '60px' }}>
            🎒✨
          </div>

          <h1>Quem vai aprender hoje?</h1>

          <p className="instruction">
            Escolha o seu nome para entrar no seu perfil.
          </p>
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
            <div style={{ fontSize: '54px' }}>
              👩‍🏫
            </div>

            <h3>Nenhum aluno cadastrado</h3>

            <p>
              Peça para a professora cadastrar um aluno
              antes de entrar.
            </p>
          </div>
        ) : (
          <div
            className="grid"
            style={{
              marginTop: '32px'
            }}
          >
            {students.map((student) => (
              <button
                className="module"
                key={student.id}
                onClick={() => onSelect(student)}
                style={{
                  minHeight: '210px',
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
                  Toque aqui para começar 🚀
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
   HOME
=========================== */

function HomePage({
  name,
  avatar,
  progress,
  go
}: {
  name: string;
  avatar: string;
  progress: Progress;
  go: (p: Page) => void;
}) {
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

          <div className="bar">
            <i
              style={{
                width: `${pct(
                  progress.activities,
                  20
                )}%`
              }}
            />
          </div>

          <span>
            {progress.activities} atividades •{' '}
            {progress.stars} estrelas
          </span>
        </div>
      </div>

      <div className="heroArt">
        📚
        <span>🦉</span>
        <small>ABC</small>
      </div>
    </section>
  );
}

/* ===========================
   MENU APRENDER
=========================== */

function Learn({
  go
}: {
  go: (p: Page) => void;
}) {
  const cards = [
    [
      'letters',
      '🔤',
      'Letras',
      'Conheça o alfabeto'
    ],
    [
      'syllables',
      '🧩',
      'Sílabas',
      'Junte sons e pedacinhos'
    ],
    [
      'words',
      '📖',
      'Palavras',
      'Complete e forme palavras'
    ],
    [
      'reading',
      '👀',
      'Leitura',
      'Leia palavras e imagens'
    ],
    [
      'writing',
      '✍️',
      'Escrita',
      'Trace letras e pratique'
    ]
  ] as const;

  return (
    <section>
      <h2>O que vamos aprender hoje? 🌟</h2>

      <div className="grid">
        {cards.map((c) => (
          <button
            className="module"
            onClick={() => go(c[0])}
            key={c[0]}
          >
            <span>{c[1]}</span>
            <b>{c[2]}</b>
            <small>{c[3]}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ===========================
   LETRAS
=========================== */

function Letters({
  complete
}: {
  complete: (
    a: string,
    b?: number,
    c?: 'letters'
  ) => void;
}) {
  const [i, setI] = useState(0);

  const l = letters[i];

  return (
    <Activity title="🔤 Descobrindo as letras">
      <div className="letterBig">
        {l[0]} <small>{l[1]}</small>
      </div>

      <div className="picture">
        {l[3]}
      </div>

      <h2>
        {l[0]} de {l[2]}
      </h2>

      <button
        className="audio"
        onClick={() =>
          speak(
            `${l[0]}. ${l[0]} de ${l[2]}`
          )
        }
      >
        <Volume2 />
        Ouvir
      </button>

      <div className="row">
        <button
          className="soft"
          disabled={i === 0}
          onClick={() => setI(i - 1)}
        >
          Anterior
        </button>

        <button
          className="primary"
          onClick={() => {
            complete(
              `Letra ${l[0]}`,
              10,
              'letters'
            );

            setI(
              Math.min(
                i + 1,
                letters.length - 1
              )
            );
          }}
        >
          Aprendi! ⭐
        </button>

        <button
          className="soft"
          disabled={
            i === letters.length - 1
          }
          onClick={() => setI(i + 1)}
        >
          Próxima
        </button>
      </div>
    </Activity>
  );
}

/* ===========================
   SÍLABAS
=========================== */

function Syllables({
  complete
}: {
  complete: (
    a: string,
    b?: number,
    c?: 'syllables'
  ) => void;
}) {
  const [i, setI] = useState(0);

  const s = syllables[i];

  return (
    <Activity title="🧩 Brincando com sílabas">
      <div className="syllable">
        {s}
      </div>

      <button
        className="audio"
        onClick={() => speak(s)}
      >
        <Volume2 />
        Ouvir e repetir
      </button>

      <p className="instruction">
        Fale bem devagar e bata uma palma para
        cada pedacinho.
      </p>

      <div className="row">
        <button
          className="soft"
          onClick={() =>
            setI(
              (i - 1 + syllables.length) %
                syllables.length
            )
          }
        >
          ←
        </button>

        <button
          className="primary"
          onClick={() => {
            complete(
              `Sílaba ${s}`,
              10,
              'syllables'
            );

            setI(
              (i + 1) %
                syllables.length
            );
          }}
        >
          Consegui! 🎉
        </button>

        <button
          className="soft"
          onClick={() =>
            setI(
              (i + 1) %
                syllables.length
            )
          }
        >
          →
        </button>
      </div>
    </Activity>
  );
}

/* ===========================
   PALAVRAS
=========================== */

function Quiz({
  title,
  questions,
  complete
}: {
  title: string;
  questions: any[];
  complete: () => void;
}) {
  const [i, setI] = useState(0);
  const [msg, setMsg] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  const q = questions[i];

  const displayedPattern = selectedLetter
    ? q.pattern.replace('_', selectedLetter)
    : q.pattern;

  const choose = (o: string) => {
    // A letra escolhida aparece imediatamente no espaço vazio.
    setSelectedLetter(o);

    if (o === q.answer) {
      setMsg(
        `Parabéns! 🎉 Você formou ${q.word}!`
      );

      speak(q.word);
      complete();

      setTimeout(() => {
        setMsg('');
        setSelectedLetter('');

        setI(
          (current) =>
            (current + 1) %
            questions.length
        );
      }, 1200);
    } else {
      setMsg(
        'Quase! Veja a letra que você colocou e tente novamente 😊'
      );
    }
  };

  return (
    <Activity title={title}>
      <p className="instruction">
        Palavra {i + 1} de {questions.length}
      </p>

      <div className="picture">
        {q.emoji}
      </div>

      <div className="pattern">
        {displayedPattern}
      </div>

      <p className="instruction">
        Escolha a letra que completa a palavra.
      </p>

      <div className="answers">
        {q.options.map(
          (o: string) => (
            <button
              onClick={() => choose(o)}
              key={o}
            >
              {o}
            </button>
          )
        )}
      </div>

      <p
        className={
          msg.startsWith('Parabéns')
            ? 'good'
            : 'hint'
        }
      >
        {msg}
      </p>
    </Activity>
  );
}

/* ===========================
   LEITURA
=========================== */

function Reading({
  complete
}: {
  complete: () => void;
}) {
  const [i, setI] =
    useState(0);

  const [msg, setMsg] =
    useState('');

  const q =
    readingQuestions[i];

  return (
    <Activity title="📖 Leitura com imagens">
      <div className="picture">
        {q.emoji}
      </div>

      <p className="instruction">
        Qual palavra combina com a imagem?
      </p>

      <div className="answers words">
        {q.options.map((o) => (
          <button
            key={o}
            onClick={() => {
              if (
                o === q.answer
              ) {
                setMsg(
                  'Muito bem! 🌟'
                );

                complete();

                setTimeout(
                  () => {
                    setI(
                      (i + 1) %
                        readingQuestions.length
                    );

                    setMsg('');
                  },
                  700
                );
              } else {
                setMsg(
                  'Quase! Olhe a imagem e tente de novo 😊'
                );
              }
            }}
          >
            {o}
          </button>
        ))}
      </div>

      <button
        className="audio"
        onClick={() =>
          speak(
            q.options.join(
              ', '
            )
          )
        }
      >
        <Volume2 />
        Ouvir opções
      </button>

      <p className="good">
        {msg}
      </p>
    </Activity>
  );
}

/* ===========================
   ESCRITA
   A ATÉ Z
=========================== */

function Writing({
  complete
}: {
  complete: () => void;
}) {
  const alphabet = [
    ['A', 'a'],
    ['B', 'b'],
    ['C', 'c'],
    ['D', 'd'],
    ['E', 'e'],
    ['F', 'f'],
    ['G', 'g'],
    ['H', 'h'],
    ['I', 'i'],
    ['J', 'j'],
    ['K', 'k'],
    ['L', 'l'],
    ['M', 'm'],
    ['N', 'n'],
    ['O', 'o'],
    ['P', 'p'],
    ['Q', 'q'],
    ['R', 'r'],
    ['S', 's'],
    ['T', 't'],
    ['U', 'u'],
    ['V', 'v'],
    ['W', 'w'],
    ['X', 'x'],
    ['Y', 'y'],
    ['Z', 'z']
  ];

  const [i, setI] = useState(0);
  const [message, setMessage] = useState('');

  const canvasRef = React.useRef<CanvasHandle>(null);

  const [upper, lower] = alphabet[i];

  const nextLetter = () => {
    setI((current) => (current + 1) % alphabet.length);
    setMessage('');
  };

  const previousLetter = () => {
    setI(
      (current) =>
        (current - 1 + alphabet.length) % alphabet.length
    );
    setMessage('');
  };

  const evaluateWriting = () => {
    const correct = canvasRef.current?.validate();

    if (!correct) {
      setMessage(
        `😊 Tente novamente! Passe o lápis por cima da letra ${upper}.`
      );

      speak(
        `Tente novamente. Faça a letra ${upper} seguindo o modelo.`
      );

      return;
    }

    setMessage(
      `🎉 Muito bem! Você escreveu a letra ${upper}!`
    );

    speak(
      `Muito bem! Letra ${upper}.`
    );

    complete();

    setTimeout(() => {
      nextLetter();
    }, 1000);
  };

  return (
    <Activity title="✍️ Hora de escrever">
      <p className="instruction">
        Letra {i + 1} de {alphabet.length}
      </p>

      <div className="trace">
        {upper} {lower}
      </div>

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
            message.includes('Muito bem')
              ? 'good'
              : 'hint'
          }
        >
          {message}
        </p>
      )}

      <div className="row">
        <button
          className="soft"
          onClick={previousLetter}
        >
          ← Anterior
        </button>

        <button
          className="primary"
          onClick={evaluateWriting}
        >
          ✅ Avaliar escrita
        </button>

        <button
          className="soft"
          onClick={nextLetter}
        >
          Próxima →
        </button>
      </div>
    </Activity>
  );
}

/* ===========================
   JOGOS
=========================== */

function Games({
  complete
}: {
  complete: (
    a: string,
    b?: number
  ) => void;
}) {
  const [
    target,
    setTarget
  ] = useState('B');

  const [
    msg,
    setMsg
  ] = useState('');

  const [
    memory,
    setMemory
  ] = useState('');

  const [
    order,
    setOrder
  ] =
    useState<string[]>([]);

  const chars = [
    'A',
    'B',
    'C',
    'D',
    'M',
    'P'
  ];

  const chooseMemory = (
    v: string
  ) => {
    if (v === 'GATO') {
      setMemory(
        'Combinação certa! 🐱 = GATO 🎉'
      );

      complete(
        'Jogo da memória',
        12
      );
    } else {
      setMemory(
        'Quase! Procure a palavra do gatinho 😊'
      );
    }
  };

  const toggle = (
    c: string
  ) =>
    setOrder((o) =>
      o.length >= 4
        ? o
        : [...o, c]
    );

  return (
    <section>
      <h2>
        🎮 Jogos educativos
      </h2>

      <div className="gameCard">
        <h3>
          Jogo 1 — Encontre a letra
        </h3>

        <p>
          Encontre a letra{' '}
          <b>{target}</b>
        </p>

        <div className="answers">
          {chars.map((c) => (
            <button
              key={c}
              onClick={() => {
                if (
                  c === target
                ) {
                  setMsg(
                    'Achou! 🎉'
                  );

                  complete(
                    'Jogo: encontre a letra',
                    10
                  );

                  setTarget(
                    chars[
                      (
                        chars.indexOf(
                          target
                        ) + 1
                      ) %
                        chars.length
                    ]
                  );
                } else {
                  setMsg(
                    'Quase! Tente outra 😊'
                  );
                }
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="good">
          {msg}
        </p>
      </div>

      <div className="grid mini">

        <div className="gameCard">

          <h3>
            Jogo 2 — Combine
          </h3>

          <div className="picture">
            🐱
          </div>

          <div className="answers words">
            {[
              'PATO',
              'GATO',
              'BOLA'
            ].map((v) => (
              <button
                key={v}
                onClick={() =>
                  chooseMemory(
                    v
                  )
                }
              >
                {v}
              </button>
            ))}
          </div>

          <p className="good">
            {memory}
          </p>

        </div>

        <div className="gameCard">

          <h3>
            Jogo 3 — Organize
          </h3>

          <p>
            Monte a palavra{' '}
            <b>CASA</b>
          </p>

          <div className="pattern">
            {order.join(' ') ||
              '_ _ _ _'}
          </div>

          <div className="answers">
            {[
              'C',
              'A',
              'S',
              'A'
            ].map(
              (
                c,
                i
              ) => (
                <button
                  key={i}
                  onClick={() =>
                    toggle(c)
                  }
                >
                  {c}
                </button>
              )
            )}
          </div>

          <div className="row">

            <button
              className="soft"
              onClick={() =>
                setOrder([])
              }
            >
              Limpar
            </button>

            <button
              className="primary"
              onClick={() => {
                if (
                  order.join(
                    ''
                  ) === 'CASA'
                ) {
                  complete(
                    'Jogo: organize a palavra',
                    15
                  );

                  setMsg(
                    'CASA formada! 🌟'
                  );

                  setOrder([]);
                } else {
                  setMsg(
                    'Quase! Tente montar C-A-S-A 😊'
                  );
                }
              }}
            >
              Conferir
            </button>

          </div>

        </div>

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
  const a = [
    [
      'primeira',
      '🏆',
      'Primeira palavra',
      'Concluiu sua primeira atividade'
    ],
    [
      'letras',
      '🔤',
      'Mestre das letras',
      'Aprendeu várias letras'
    ],
    [
      'super',
      '⭐',
      'Super estudante',
      'Completou 10 atividades'
    ],
    [
      'leitor',
      '📚',
      'Leitor iniciante',
      'Continue praticando leitura'
    ]
  ];

  return (
    <section>
      <h2>
        🏆 Minhas conquistas
      </h2>

      <div className="grid">
        {a.map(
          ([
            id,
            e,
            t,
            d
          ]) => (
            <div
              key={id}
              className={`achievement ${
                progress.badges.includes(
                  id
                )
                  ? 'unlocked'
                  : ''
              }`}
            >
              <span>{e}</span>

              <b>{t}</b>

              <small>
                {progress.badges.includes(
                  id
                )
                  ? 'Desbloqueada! 🎉'
                  : d}
              </small>
            </div>
          )
        )}
      </div>
    </section>
  );
}

/* ===========================
   PERFIL
=========================== */

function Profile({
  name,
  avatar,
  setName,
  setAvatar,
  progress,
  go
}: {
  name: string;
  avatar: string;
  setName: (s: string) => void;
  setAvatar: (s: string) => void;
  progress: Progress;
  go: (p: Page) => void;
}) {
  const av = [
    '👧🏻',
    '👦🏽',
    '👧🏾',
    '👦🏻',
    '🧒🏼',
    '👧🏽'
  ];

  return (
    <section>
      <h2>👤 Meu perfil</h2>

      <div className="profileCard">

        <div className="avatar">
          {avatar}
        </div>

        <input
          value={name}
          onChange={(e) => {
            setName(
              e.target.value
            );

            localStorage.setItem(
              'alfabetizacao-name',
              e.target.value
            );
          }}
        />

        <div className="avatars">
          {av.map((a) => (
            <button
              key={a}
              onClick={() => {
                setAvatar(a);

                localStorage.setItem(
                  'alfabetizacao-avatar',
                  a
                );
              }}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="stats">

          <b>
            {progress.points}
            <small>
              {' '}
              pontos
            </small>
          </b>

          <b>
            {progress.stars}
            <small>
              {' '}
              estrelas
            </small>
          </b>

          <b>
            {progress.activities}
            <small>
              {' '}
              atividades
            </small>
          </b>

        </div>

        <button
          className="secondary"
          onClick={() =>
            go('role')
          }
        >
          <ShieldCheck />
          Trocar perfil
        </button>

      </div>
    </section>
  );
}

/* ===========================
   ÁREA DO PROFESSOR
=========================== */

function TeacherArea({
  students,
  selectedStudent,
  selectedProgress,
  onAddStudent,
  onDeleteStudent,
  onViewStudent,
  onBack
}: {
  students: Student[];
  selectedStudent: Student | null;
  selectedProgress: Progress | null;
  onAddStudent: (
    name: string,
    avatar: string
  ) => boolean;
  onDeleteStudent: (id: string) => void;
  onViewStudent: (student: Student) => void;
  onBack: () => void;
}) {
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('🧒');
  const [message, setMessage] = useState('');

  const avatars = [
    '👧🏻',
    '👦🏽',
    '👧🏾',
    '👦🏻',
    '🧒🏼',
    '👧🏽',
    '👦🏼',
    '🧒🏾'
  ];

  const registerStudent = () => {
    const created = onAddStudent(
      newName,
      newAvatar
    );

    if (!created) {
      setMessage(
        'Digite o nome do aluno.'
      );

      return;
    }

    setNewName('');
    setNewAvatar('🧒');

    setMessage(
      'Aluno cadastrado com sucesso! ✅'
    );
  };

  return (
    <div
      className="app"
      style={{
        minHeight: '100vh',
        paddingBottom: '40px'
      }}
    >
      <header>
        <button
          className="brand"
          onClick={onBack}
        >
          <span>👩‍🏫</span>
          <b>Área do Professor</b>
        </button>

        <button
          className="soft"
          onClick={onBack}
        >
          🔄 Trocar perfil
        </button>
      </header>

      <main>
        <button
          className="back"
          onClick={onBack}
        >
          <ArrowLeft />
          Voltar
        </button>

        <section>
          <h2>
            👩‍🏫 Turma e acompanhamento
          </h2>

          <div className="gameCard">
            <h3>
              ➕ Cadastrar novo aluno
            </h3>

            <p className="instruction">
              O aluno cadastrado aparecerá na tela
              “Entrar como Aluno”.
            </p>

            <input
              value={newName}
              onChange={(e) =>
                setNewName(e.target.value)
              }
              placeholder="Nome do aluno"
              style={{
                width: '100%',
                maxWidth: '420px',
                padding: '14px 16px',
                borderRadius: '14px',
                border: '2px solid #ddd',
                fontSize: '17px',
                marginBottom: '16px'
              }}
            />

            <p>
              <b>Escolha um avatar:</b>
            </p>

            <div className="avatars">
              {avatars.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setNewAvatar(item)
                  }
                  style={{
                    transform:
                      newAvatar === item
                        ? 'scale(1.15)'
                        : 'scale(1)',
                    outline:
                      newAvatar === item
                        ? '3px solid #7c3aed'
                        : 'none'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: '18px'
              }}
            >
              <button
                className="primary"
                onClick={registerStudent}
              >
                ➕ Cadastrar aluno
              </button>

              {message && (
                <span className="good">
                  {message}
                </span>
              )}
            </div>
          </div>

          <div className="gameCard">
            <h3>
              🎒 Alunos cadastrados ({students.length})
            </h3>

            {students.length === 0 ? (
              <p>
                Nenhum aluno cadastrado ainda.
              </p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gap: '12px'
                }}
              >
                {students.map((student) => {
                  const studentProgress =
                    loadStudentProgress(
                      student.id
                    );

                  return (
                    <div
                      key={student.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'space-between',
                        gap: '16px',
                        flexWrap: 'wrap',
                        padding: '16px',
                        borderRadius: '16px',
                        background:
                          'rgba(255,255,255,.7)'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '42px'
                          }}
                        >
                          {student.avatar}
                        </span>

                        <div>
                          <b
                            style={{
                              fontSize: '18px'
                            }}
                          >
                            {student.name}
                          </b>

                          <div>
                            <small>
                              {
                                studentProgress.activities
                              }{' '}
                              atividades •{' '}
                              {
                                studentProgress.points
                              }{' '}
                              pontos •{' '}
                              {
                                studentProgress.stars
                              }{' '}
                              estrelas
                            </small>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <button
                          className="secondary"
                          onClick={() =>
                            onViewStudent(
                              student
                            )
                          }
                        >
                          📊 Acompanhar
                        </button>

                        <button
                          className="soft"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Excluir o aluno ${student.name}?`
                              )
                            ) {
                              onDeleteStudent(
                                student.id
                              );
                            }
                          }}
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {selectedStudent &&
            selectedProgress && (
              <>
                <div className="gameCard">
                  <h3>
                    📊 Acompanhamento de{' '}
                    {selectedStudent.name}{' '}
                    {selectedStudent.avatar}
                  </h3>

                  <div className="adultGrid">
                    <Metric
                      t="Progresso geral"
                      v={`${pct(
                        selectedProgress.activities,
                        20
                      )}%`}
                    />

                    <Metric
                      t="Atividades"
                      v={String(
                        selectedProgress.activities
                      )}
                    />

                    <Metric
                      t="Pontuação"
                      v={String(
                        selectedProgress.points
                      )}
                    />

                    <Metric
                      t="Estrelas"
                      v={String(
                        selectedProgress.stars
                      )}
                    />
                  </div>
                </div>

                <div className="gameCard">
                  <h3>
                    Habilidades trabalhadas
                  </h3>

                  {[
                    [
                      'Letras',
                      selectedProgress.letters,
                      26
                    ],
                    [
                      'Sílabas',
                      selectedProgress.syllables,
                      20
                    ],
                    [
                      'Palavras e leitura',
                      selectedProgress.words,
                      20
                    ]
                  ].map(
                    ([
                      label,
                      value,
                      max
                    ]: any) => (
                      <div
                        className="skill"
                        key={label}
                      >
                        <span>
                          {label}
                        </span>

                        <div className="bar">
                          <i
                            style={{
                              width: `${pct(
                                value,
                                max
                              )}%`
                            }}
                          />
                        </div>

                        <b>
                          {pct(
                            value,
                            max
                          )}
                          %
                        </b>
                      </div>
                    )
                  )}
                </div>

                <div className="gameCard">
                  <h3>
                    Histórico recente
                  </h3>

                  {selectedProgress.history
                    .length ? (
                    selectedProgress.history
                      .slice(0, 10)
                      .map((item) => (
                        <div
                          className="history"
                          key={`${item.at}-${item.label}`}
                        >
                          <span>
                            {new Date(
                              item.at
                            ).toLocaleDateString(
                              'pt-BR'
                            )}
                          </span>

                          <b>
                            {item.label}
                          </b>

                          <em>
                            +{item.score} pts
                          </em>
                        </div>
                      ))
                  ) : (
                    <p>
                      Esse aluno ainda não
                      realizou atividades.
                    </p>
                  )}

                  <p className="note">
                    Indicadores de apoio
                    pedagógico: não substituem
                    a observação e avaliação do
                    professor.
                  </p>
                </div>
              </>
            )}
        </section>
      </main>
    </div>
  );
}

/* ===========================
   COMPONENTES AUXILIARES
=========================== */

function Metric({
  t,
  v
}: {
  t: string;
  v: string;
}) {
  return (
    <div className="metric">
      <small>{t}</small>
      <b>{v}</b>
    </div>
  );
}

function Activity({
  title,
  children
}: {
  title: string;
  children: any;
}) {
  return (
    <section className="activity">
      <h2>{title}</h2>

      <div className="activityBox">
        {children}
      </div>
    </section>
  );
}