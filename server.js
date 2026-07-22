// =====================================================================
//  Serveur temps reel — Console de formation 2026
//  Une seule salle (un groupe). L'animateur choisit une activite dans
//  un sommaire : quiz (plusieurs disponibles) ou mur de mots collaboratif.
//  Les bonnes reponses des quiz restent cote serveur jusqu'a la revelation.
// =====================================================================

const express = require('express');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const QRCode = require('qrcode');
const { Server } = require('socket.io');

const QUIZZES = require('./quiz-data');

// --- Configuration du Mur de mots (editable) ---
const WALL = {
  id: 'wordwall',
  title: 'Mur de mots',
  subtitle: 'Nuage de mots collaboratif en direct',
  icon: '💬',
  prompt: 'En un ou plusieurs mots, exprimez-vous 👇'
};

const PORT = process.env.PORT || 3000;
const ANSWER_WINDOW_MS = 20000;     // fenetre du bonus de rapidite (quiz)
const MAX_WORD_LEN = 28;            // longueur max d'un mot (mur de mots)
const MAX_WORDS_PER_SUBMIT = 6;     // mots max par envoi

const app = express();
app.set('trust proxy', true);
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'play.html')));
app.get('/host', (req, res) => res.sendFile(path.join(__dirname, 'public', 'host.html')));

app.get('/api/join-info', async (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  const joinUrl = base + '/';
  try {
    const qr = await QRCode.toDataURL(joinUrl, {
      margin: 1, width: 640, errorCorrectionLevel: 'M',
      color: { dark: '#12151c', light: '#ffffff' }
    });
    res.json({ joinUrl, qr });
  } catch (e) { res.status(500).json({ error: 'qr_failed' }); }
});

// ---------------------------------------------------------------------
//  Etat de la session
// ---------------------------------------------------------------------
const S = {
  mode: 'menu',        // 'menu' | 'quiz' | 'wordwall'
  players: new Map(),  // id -> { id, pseudo, socketId, score, answers:Map }
  // sous-etat quiz :
  quizId: null, quizTitle: '', questions: [], phase: 'lobby', currentQ: -1, startedAt: 0,
  // sous-etat mur de mots :
  wall: [], wallCounts: new Map() // wallCounts: key -> { key, text, count }
};
const hosts = new Set();

function menuList() {
  return [
    ...QUIZZES.map(q => ({ id: q.id, kind: 'quiz', title: q.title, subtitle: q.subtitle, icon: q.icon || '📊', count: q.questions.length })),
    { id: WALL.id, kind: 'wordwall', title: WALL.title, subtitle: WALL.subtitle, icon: WALL.icon }
  ];
}

// ---------------------------------------------------------------------
//  Helpers quiz
// ---------------------------------------------------------------------
function publicQuestion(i) {
  const q = S.questions[i];
  if (!q) return null;
  return { index: i, total: S.questions.length, theme: q.theme, multi: q.multi, q: q.q, options: q.options };
}
function revealData(i) {
  const q = S.questions[i];
  if (!q) return null;
  return { index: i, correct: q.correct, explain: q.explain, fig: q.fig, figLabel: q.figLabel, source: q.source };
}
function isCorrect(i, choice) {
  const c = S.questions[i].correct;
  if (choice.length !== c.length) return false;
  const s = [...c].sort((a, b) => a - b);
  return [...choice].sort((a, b) => a - b).every((v, k) => v === s[k]);
}
function aggregate(i) {
  const q = S.questions[i];
  const counts = q ? q.options.map(() => 0) : [];
  let answered = 0, correct = 0;
  for (const p of S.players.values()) {
    const a = p.answers.get(i);
    if (a) { answered++; a.choice.forEach(c => { if (counts[c] != null) counts[c]++; }); if (a.correct) correct++; }
  }
  return { qIndex: i, counts, answered, total: S.players.size, correct };
}
function leaderboard() {
  return [...S.players.values()]
    .map(p => ({ id: p.id, pseudo: p.pseudo, score: p.score, correctCount: [...p.answers.values()].filter(a => a.correct).length }))
    .sort((a, b) => b.score - a.score);
}
function rankOf(id) {
  const arr = [...S.players.values()].sort((a, b) => b.score - a.score);
  return arr.findIndex(p => p.id === id) + 1;
}
function roster() {
  return [...S.players.values()].map(p => ({ id: p.id, pseudo: p.pseudo, score: p.score, answered: p.answers.has(S.currentQ) }));
}

// ---------------------------------------------------------------------
//  Helpers mur de mots
// ---------------------------------------------------------------------
function normKey(w) {
  return w.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}
function wallData() {
  return [...S.wallCounts.values()].sort((a, b) => b.count - a.count).slice(0, 140)
    .map(e => ({ text: e.text, count: e.count }));
}
function addWords(text) {
  const raw = String(text || '').split(/[\s,;/]+/).map(w => w.trim()).filter(Boolean).slice(0, MAX_WORDS_PER_SUBMIT);
  const added = [];
  for (let w of raw) {
    w = w.slice(0, MAX_WORD_LEN);
    const key = normKey(w);
    if (!key) continue;
    const e = S.wallCounts.get(key);
    if (e) e.count++;
    else S.wallCounts.set(key, { key, text: w, count: 1 });
    S.wall.push(w);
    added.push(w);
  }
  return added;
}

// ---------------------------------------------------------------------
//  Etat envoye a l'animateur
// ---------------------------------------------------------------------
function hostState() {
  const base = { mode: S.mode, menu: menuList(), roster: roster(), total: S.players.size };
  if (S.mode === 'quiz') {
    base.quiz = { id: S.quizId, title: S.quizTitle, totalQ: S.questions.length, phase: S.phase, currentQ: S.currentQ };
    base.question = S.currentQ >= 0 ? publicQuestion(S.currentQ) : null;
    base.aggregate = S.currentQ >= 0 ? aggregate(S.currentQ) : null;
    base.reveal = S.phase === 'reveal' ? revealData(S.currentQ) : null;
    base.leaderboard = S.phase === 'ended' ? leaderboard() : null;
  } else if (S.mode === 'wordwall') {
    base.wall = { title: WALL.title, prompt: WALL.prompt, items: wallData(), totalWords: S.wall.length };
  }
  return base;
}
function broadcastHost() { io.to('hosts').emit('host:state', hostState()); }

// ---------------------------------------------------------------------
//  Vue envoyee a un joueur (selon le mode courant)
// ---------------------------------------------------------------------
function sendViewTo(p) {
  const sock = io.sockets.sockets.get(p.socketId);
  if (!sock) return;
  sock.emit('player:view', viewFor(p));
}
function viewFor(p) {
  if (S.mode === 'menu') return { view: 'menu' };
  if (S.mode === 'wordwall') return { view: 'wall', title: WALL.title, prompt: WALL.prompt };
  // quiz
  if (S.phase === 'lobby') return { view: 'quiz-lobby', title: S.quizTitle };
  if (S.phase === 'question') return { view: 'question', question: publicQuestion(S.currentQ), answered: p.answers.has(S.currentQ), you: p.answers.get(S.currentQ) || null };
  if (S.phase === 'reveal') return { view: 'reveal', reveal: revealData(S.currentQ), you: p.answers.get(S.currentQ) || null, score: p.score, rank: rankOf(p.id), totalPlayers: S.players.size };
  if (S.phase === 'ended') return endedViewFor(p);
  return { view: 'menu' };
}
function endedViewFor(p) {
  const lb = leaderboard();
  return {
    view: 'ended',
    podium: lb.slice(0, 5).map(e => ({ pseudo: e.pseudo, score: e.score })),
    score: p.score, rank: rankOf(p.id), pseudo: p.pseudo, totalPlayers: S.players.size,
    correctCount: [...p.answers.values()].filter(a => a.correct).length, totalQ: S.questions.length
  };
}
// Diffuse la vue courante a tous les joueurs (chacun avec ses infos perso).
function broadcastPlayerView() { for (const p of S.players.values()) sendViewTo(p); }

// ---------------------------------------------------------------------
//  Transitions (animateur)
// ---------------------------------------------------------------------
function goMenu() {
  S.mode = 'menu'; S.phase = 'lobby'; S.currentQ = -1;
  broadcastPlayerView(); broadcastHost();
}
function pickQuiz(quizId) {
  const quiz = QUIZZES.find(q => q.id === quizId);
  if (!quiz) return;
  S.mode = 'quiz'; S.quizId = quiz.id; S.quizTitle = quiz.title; S.questions = quiz.questions;
  S.phase = 'lobby'; S.currentQ = -1; S.startedAt = 0;
  for (const p of S.players.values()) { p.score = 0; p.answers = new Map(); }
  broadcastPlayerView(); broadcastHost();
}
function pickWall() {
  S.mode = 'wordwall'; S.wall = []; S.wallCounts = new Map();
  broadcastPlayerView(); broadcastHost();
}
function startQuestion(i) {
  S.currentQ = i; S.phase = 'question'; S.startedAt = Date.now();
  broadcastPlayerView(); broadcastHost();
}
function startQuiz() { if (S.mode === 'quiz') startQuestion(0); }
function doReveal() {
  if (S.mode !== 'quiz' || S.phase !== 'question') return;
  S.phase = 'reveal';
  broadcastPlayerView(); broadcastHost();
}
function nextQuestion() {
  if (S.mode !== 'quiz') return;
  if (S.currentQ + 1 < S.questions.length) startQuestion(S.currentQ + 1);
  else { S.phase = 'ended'; broadcastPlayerView(); broadcastHost(); }
}
function resetQuiz() {
  if (S.mode !== 'quiz') return;
  S.phase = 'lobby'; S.currentQ = -1; S.startedAt = 0;
  for (const p of S.players.values()) { p.score = 0; p.answers = new Map(); }
  broadcastPlayerView(); broadcastHost();
}
function wallClear() {
  if (S.mode !== 'wordwall') return;
  S.wall = []; S.wallCounts = new Map();
  io.to('players').emit('wall:cleared');
  broadcastHost();
}
function clearRoom() {
  S.players.clear();
  S.mode = 'menu'; S.phase = 'lobby'; S.currentQ = -1;
  S.wall = []; S.wallCounts = new Map();
  io.to('players').emit('game:cleared');
  broadcastHost();
}

// ---------------------------------------------------------------------
//  Sockets
// ---------------------------------------------------------------------
io.on('connection', (socket) => {
  // --- Animateur ---
  socket.on('host:hello', () => { hosts.add(socket.id); socket.join('hosts'); socket.emit('host:state', hostState()); });
  socket.on('host:pickQuiz', ({ quizId } = {}) => { if (hosts.has(socket.id)) pickQuiz(quizId); });
  socket.on('host:pickWall', () => { if (hosts.has(socket.id)) pickWall(); });
  socket.on('host:menu', () => { if (hosts.has(socket.id)) goMenu(); });
  socket.on('host:start', () => { if (hosts.has(socket.id) && S.players.size > 0) startQuiz(); });
  socket.on('host:reveal', () => { if (hosts.has(socket.id)) doReveal(); });
  socket.on('host:next', () => { if (hosts.has(socket.id)) nextQuestion(); });
  socket.on('host:reset', () => { if (hosts.has(socket.id)) resetQuiz(); });
  socket.on('host:wallClear', () => { if (hosts.has(socket.id)) wallClear(); });
  socket.on('host:clear', () => { if (hosts.has(socket.id)) clearRoom(); });

  // --- Joueur ---
  socket.on('player:hello', ({ playerId, pseudo } = {}) => {
    pseudo = String(pseudo || '').replace(/\s+/g, ' ').trim().slice(0, 24) || 'Anonyme';
    let id = String(playerId || '');
    let p = id && S.players.get(id);
    if (!p) {
      id = id || crypto.randomUUID();
      p = { id, pseudo, socketId: socket.id, score: 0, answers: new Map() };
      S.players.set(id, p);
    } else { p.pseudo = pseudo; p.socketId = socket.id; }
    socket.data.playerId = id;
    socket.join('players');
    socket.emit('player:welcome', { id, pseudo: p.pseudo });
    sendViewTo(p);
    broadcastHost();
  });

  socket.on('player:answer', ({ qIndex, choice } = {}) => {
    const id = socket.data.playerId;
    const p = id && S.players.get(id);
    if (!p || S.mode !== 'quiz' || S.phase !== 'question' || qIndex !== S.currentQ) return;
    if (p.answers.has(qIndex)) return;
    choice = Array.isArray(choice) ? [...new Set(choice.map(Number).filter(Number.isInteger))] : [];
    const q = S.questions[qIndex];
    if (!q || choice.length === 0 || choice.some(c => c < 0 || c >= q.options.length)) return;
    const correct = isCorrect(qIndex, choice);
    const ms = Date.now() - S.startedAt;
    const pts = correct ? (500 + Math.round(500 * Math.max(0, (ANSWER_WINDOW_MS - ms) / ANSWER_WINDOW_MS))) : 0;
    p.answers.set(qIndex, { choice, correct, ms, pts });
    p.score += pts;
    socket.emit('answer:ok', { qIndex });
    io.to('hosts').emit('host:aggregate', aggregate(qIndex));
    broadcastHost();
  });

  socket.on('player:word', ({ text } = {}) => {
    const id = socket.data.playerId;
    const p = id && S.players.get(id);
    if (!p || S.mode !== 'wordwall') return;
    const added = addWords(text);
    if (added.length) {
      socket.emit('word:ok', { added });
      io.to('hosts').emit('host:wall', { items: wallData(), totalWords: S.wall.length });
    }
  });

  socket.on('disconnect', () => {
    hosts.delete(socket.id);
    // En sommaire (salle d'attente) : on retire le joueur qui quitte.
    // Pendant une activite : on le conserve (reconnexion possible).
    const id = socket.data.playerId;
    if (id && S.mode === 'menu') {
      const p = S.players.get(id);
      if (p && p.socketId === socket.id) S.players.delete(id);
    }
    broadcastHost();
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Console de formation 2026 — serveur demarre`);
  console.log(`  Animateur (sommaire) : http://localhost:${PORT}/host`);
  console.log(`  Joueurs              : http://localhost:${PORT}/`);
  console.log(`  (En reseau local, remplacez localhost par l'IP de ce PC.)\n`);
});
