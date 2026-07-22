// =====================================================================
//  Serveur temps reel du quiz "Management France 2026"
//  Express + Socket.IO. Etat de partie en memoire (une seule salle).
//  Les bonnes reponses restent cote serveur : elles ne sont envoyees
//  aux joueurs qu'au moment de la revelation par l'animateur.
// =====================================================================

const express = require('express');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const QRCode = require('qrcode');
const { Server } = require('socket.io');

const QUESTIONS = require('./quiz-data');

const PORT = process.env.PORT || 3000;
const ANSWER_WINDOW_MS = 20000; // fenetre pour le bonus de rapidite

const app = express();
app.set('trust proxy', true); // URL correcte derriere un proxy (Render, ngrok...)
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'play.html')));
app.get('/host', (req, res) => res.sendFile(path.join(__dirname, 'public', 'host.html')));

// URL d'inscription + QR code (calcule d'apres l'hote reel de la requete)
app.get('/api/join-info', async (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  const joinUrl = base + '/';
  try {
    const qr = await QRCode.toDataURL(joinUrl, {
      margin: 1, width: 640, errorCorrectionLevel: 'M',
      color: { dark: '#12151c', light: '#ffffff' }
    });
    res.json({ joinUrl, qr });
  } catch (e) {
    res.status(500).json({ error: 'qr_failed' });
  }
});

// ---------------------------------------------------------------------
//  Etat de la partie
// ---------------------------------------------------------------------
const game = {
  phase: 'lobby',   // 'lobby' | 'question' | 'reveal' | 'ended'
  currentQ: -1,
  startedAt: 0,
  players: new Map() // playerId -> { id, pseudo, socketId, score, answers:Map<qIndex,{choice,correct,ms,pts}> }
};
const hosts = new Set();

// ---------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------
function publicQuestion(i) {
  const q = QUESTIONS[i];
  if (!q) return null;
  return { index: i, total: QUESTIONS.length, theme: q.theme, multi: q.multi, q: q.q, options: q.options };
}
function revealData(i) {
  const q = QUESTIONS[i];
  if (!q) return null;
  return { index: i, correct: q.correct, explain: q.explain, fig: q.fig, figLabel: q.figLabel, source: q.source };
}
function isCorrect(qIndex, choice) {
  const correct = QUESTIONS[qIndex].correct;
  if (choice.length !== correct.length) return false;
  const s = [...correct].sort((a, b) => a - b);
  return [...choice].sort((a, b) => a - b).every((v, k) => v === s[k]);
}
function aggregate(qIndex) {
  const q = QUESTIONS[qIndex];
  const counts = q ? q.options.map(() => 0) : [];
  let answered = 0, correct = 0;
  for (const p of game.players.values()) {
    const a = p.answers.get(qIndex);
    if (a) {
      answered++;
      a.choice.forEach(c => { if (counts[c] != null) counts[c]++; });
      if (a.correct) correct++;
    }
  }
  return { qIndex, counts, answered, total: game.players.size, correct };
}
function leaderboard() {
  return [...game.players.values()]
    .map(p => ({
      id: p.id,
      pseudo: p.pseudo,
      score: p.score,
      correctCount: [...p.answers.values()].filter(a => a.correct).length
    }))
    .sort((a, b) => b.score - a.score);
}
function rankOf(id) {
  const arr = [...game.players.values()].sort((a, b) => b.score - a.score);
  return arr.findIndex(p => p.id === id) + 1;
}
function rosterForHost() {
  return [...game.players.values()].map(p => ({
    id: p.id, pseudo: p.pseudo, score: p.score, answered: p.answers.has(game.currentQ)
  }));
}
function hostState() {
  return {
    phase: game.phase,
    currentQ: game.currentQ,
    total: QUESTIONS.length,
    roster: rosterForHost(),
    question: game.currentQ >= 0 ? publicQuestion(game.currentQ) : null,
    aggregate: game.currentQ >= 0 ? aggregate(game.currentQ) : null,
    reveal: game.phase === 'reveal' ? revealData(game.currentQ) : null,
    leaderboard: game.phase === 'ended' ? leaderboard() : null
  };
}
function broadcastHost() { io.to('hosts').emit('host:state', hostState()); }

// ---------------------------------------------------------------------
//  Transitions pilotees par l'animateur
// ---------------------------------------------------------------------
function startQuestion(i) {
  game.currentQ = i;
  game.phase = 'question';
  game.startedAt = Date.now();
  io.to('players').emit('question:show', publicQuestion(i));
  broadcastHost();
}
function doReveal() {
  if (game.phase !== 'question') return;
  game.phase = 'reveal';
  const rev = revealData(game.currentQ);
  for (const p of game.players.values()) {
    io.to(p.socketId).emit('question:reveal', {
      ...rev,
      you: p.answers.get(game.currentQ) || null,
      score: p.score,
      rank: rankOf(p.id),
      totalPlayers: game.players.size
    });
  }
  broadcastHost();
}
function nextQuestion() {
  if (game.currentQ + 1 < QUESTIONS.length) {
    startQuestion(game.currentQ + 1);
  } else {
    game.phase = 'ended';
    const lb = leaderboard();
    for (const p of game.players.values()) {
      io.to(p.socketId).emit('game:over', {
        podium: lb.slice(0, 5).map(e => ({ pseudo: e.pseudo, score: e.score })),
        score: p.score,
        rank: rankOf(p.id),
        pseudo: p.pseudo,
        totalPlayers: game.players.size,
        correctCount: [...p.answers.values()].filter(a => a.correct).length,
        totalQ: QUESTIONS.length
      });
    }
    broadcastHost();
  }
}
function resetGame() {
  game.phase = 'lobby';
  game.currentQ = -1;
  game.startedAt = 0;
  for (const p of game.players.values()) { p.score = 0; p.answers = new Map(); }
  io.to('players').emit('game:reset');
  broadcastHost();
}

// ---------------------------------------------------------------------
//  Sockets
// ---------------------------------------------------------------------
io.on('connection', (socket) => {

  // --- Animateur ---
  socket.on('host:hello', () => {
    hosts.add(socket.id);
    socket.join('hosts');
    socket.emit('host:state', hostState());
  });
  socket.on('host:start', () => { if (hosts.has(socket.id) && game.players.size > 0) startQuestion(0); });
  socket.on('host:reveal', () => { if (hosts.has(socket.id)) doReveal(); });
  socket.on('host:next', () => { if (hosts.has(socket.id)) nextQuestion(); });
  socket.on('host:reset', () => { if (hosts.has(socket.id)) resetGame(); });

  // --- Joueur ---
  socket.on('player:hello', ({ playerId, pseudo } = {}) => {
    pseudo = String(pseudo || '').replace(/\s+/g, ' ').trim().slice(0, 24) || 'Anonyme';
    let id = String(playerId || '');
    let p = id && game.players.get(id);
    if (!p) {
      id = id || crypto.randomUUID();
      p = { id, pseudo, socketId: socket.id, score: 0, answers: new Map() };
      game.players.set(id, p);
    } else {
      p.pseudo = pseudo;
      p.socketId = socket.id;
    }
    socket.data.playerId = id;
    socket.join('players');

    const inRound = (game.phase === 'question' || game.phase === 'reveal');
    socket.emit('player:welcome', {
      id,
      pseudo: p.pseudo,
      phase: game.phase,
      question: inRound ? publicQuestion(game.currentQ) : null,
      answered: p.answers.has(game.currentQ),
      you: inRound ? (p.answers.get(game.currentQ) || null) : null,
      reveal: game.phase === 'reveal' ? revealData(game.currentQ) : null,
      score: p.score
    });
    broadcastHost();
  });

  socket.on('player:answer', ({ qIndex, choice } = {}) => {
    const id = socket.data.playerId;
    const p = id && game.players.get(id);
    if (!p) return;
    if (game.phase !== 'question' || qIndex !== game.currentQ) return;
    if (p.answers.has(qIndex)) return;

    choice = Array.isArray(choice) ? [...new Set(choice.map(Number).filter(Number.isInteger))] : [];
    const q = QUESTIONS[qIndex];
    if (!q || choice.length === 0) return;
    if (choice.some(c => c < 0 || c >= q.options.length)) return;

    const correct = isCorrect(qIndex, choice);
    const ms = Date.now() - game.startedAt;
    const pts = correct ? (500 + Math.round(500 * Math.max(0, (ANSWER_WINDOW_MS - ms) / ANSWER_WINDOW_MS))) : 0;
    p.answers.set(qIndex, { choice, correct, ms, pts });
    p.score += pts;

    socket.emit('answer:ok', { qIndex });
    io.to('hosts').emit('host:aggregate', aggregate(qIndex));
    broadcastHost();
  });

  socket.on('disconnect', () => {
    hosts.delete(socket.id);
    // Les joueurs sont conserves (reconnexion possible via leur playerId memorise).
    broadcastHost();
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Quiz Management 2026 — serveur demarre`);
  console.log(`  Animateur (tableau de bord) : http://localhost:${PORT}/host`);
  console.log(`  Joueurs (page d'accueil)    : http://localhost:${PORT}/`);
  console.log(`  (En reseau local, remplacez localhost par l'IP de ce PC.)\n`);
});
