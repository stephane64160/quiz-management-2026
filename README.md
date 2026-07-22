# Quiz Management France 2026 — temps réel (type Kahoot)

Quiz de 5 questions sur le management en France en 2026, à jouer en direct
pendant une formation. Chaque participant rejoint depuis son **téléphone** en
scannant un **QR code**, choisit un **pseudo**, et l'animateur voit l'**analyse
des réponses par question en direct** sur son tableau de bord.

## Contenu

| Fichier | Rôle |
|---|---|
| `server.js` | Serveur temps réel (Express + Socket.IO). Détient l'état de la partie et valide les réponses. |
| `public/host.html` | Tableau de bord **animateur** : QR code, joueurs connectés, barres live, classement. |
| `public/play.html` | Page **participant** (mobile) : pseudo → questions → feedback. |
| `quiz-data.js` | Les 5 questions, réponses et sources. **Modifiez ici pour changer le quiz.** |

## 1. Lancer en local (test)

Prérequis : [Node.js](https://nodejs.org) 18 ou plus.

```bash
npm install
npm start
```

Puis, sur ce PC :

- **Animateur** → http://localhost:3000/host
- **Joueur** → http://localhost:3000/

## 2. Jouer sur le même Wi-Fi (sans Internet)

1. Trouvez l'IP locale de ce PC :
   - Windows : `ipconfig` → ligne « Adresse IPv4 » (ex. `192.168.1.20`)
2. Ouvrez le tableau de bord : `http://192.168.1.20:3000/host`
   Le QR code affiché pointe automatiquement vers la bonne adresse.
3. Les participants scannent le QR (même réseau Wi-Fi) → ils arrivent sur la page pseudo.
4. Autorisez le port 3000 dans le pare-feu Windows si demandé.

## 3. Déployer sur Internet (participants à distance)

Vous avez choisi un accès **par Internet**. Deux options :

### Option A — Render (hébergement gratuit, URL publique permanente)

1. Créez un dépôt Git avec ces fichiers et poussez-le sur GitHub.
2. Sur [render.com](https://render.com) → **New → Web Service** → connectez le dépôt.
3. Réglages :
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - Render fournit automatiquement la variable `PORT` (déjà gérée dans `server.js`).
4. Une fois déployé, votre URL ressemble à `https://mon-quizz.onrender.com`.
   - Animateur : `https://mon-quizz.onrender.com/host`
   - Le QR code du tableau de bord encode automatiquement l'URL publique.

> Astuce : le plan gratuit Render « s'endort » après inactivité. Ouvrez le
> tableau de bord 1–2 minutes avant la formation pour le réveiller.

### Option B — Tunnel ngrok (rapide, depuis ce PC)

Gardez le serveur local lancé (`npm start`), puis dans un autre terminal :

```bash
npx ngrok http 3000
```

ngrok affiche une URL publique `https://xxxx.ngrok-free.app`. Ouvrez
`https://xxxx.ngrok-free.app/host` : le QR encode cette URL, jouable depuis
n'importe quel réseau.

## Déroulé le jour J

1. Projetez le **tableau de bord animateur** (`/host`).
2. Les participants scannent le **QR code** et saisissent leur **pseudo** → ils apparaissent en direct.
3. Cliquez **Démarrer le quiz**.
4. Pour chaque question : les réponses remplissent les **barres en direct** → cliquez **Révéler la bonne réponse** (affiche la statistique + la source) pour lancer la discussion → **Question suivante**.
5. À la fin : **podium et classement**. Bouton **Nouvelle partie** pour rejouer.

## Notes

- Les bonnes réponses restent **côté serveur** et ne sont envoyées aux téléphones qu'au moment de la révélation (pas de triche).
- Score = bonnes réponses + **bonus de rapidité** (répondre vite rapporte plus).
- Le quiz gère **une salle** à la fois (idéal pour un groupe en formation).
- Les statistiques proviennent d'articles et baromètres RH 2025-2026 (voir sources dans `quiz-data.js`) ; vérifiez les chiffres que vous mettez le plus en avant avant de les présenter comme officiels.
