# গর্বিত VUian — Mobile-first Fun Quiz MVP

A responsive Bangla single-player quiz game built with React + Vite. This is an independent fun project concept, not an official Varendra University platform.

## Features
- Cinematic dark UI with gold and violet accents, tuned for mobile-first play
- VU-related knowledge questions and fictional/relatable student-life scenarios
- Nickname setup; no account or login
- 15 questions, 15-second timer per question
- No correct/wrong feedback during the quiz; trivia answers are revealed only in the final review
- Trivia: 1 point for a correct answer; fun scenarios: 1 participation point for answering, with no right/wrong judgement
- Result score, trivia accuracy, funny result title, answer review, replay and share result
- Personal-best score stored locally in the current browser
- Responsive layout for common Android/iPhone screens and desktop
- No leaderboard, admin panel, authentication or backend

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## How to edit or add questions

Edit `src/data/questions.js`.

A trivia question uses `type: 'fact'`, `options`, an `answer` index (0 means the first option), and an `explain` string. Example:

```js
{
  category: 'VU KNOWLEDGE',
  type: 'fact',
  q: 'তোমার প্রশ্ন এখানে?',
  options: ['উত্তর A', 'উত্তর B', 'উত্তর C', 'উত্তর D'],
  answer: 1,
  explain: 'এই ব্যাখ্যাটি result review-তে দেখা যাবে।'
}
```

A fun question uses `type: 'fun'`, `options`, and one `results` entry per option. Do not add an `answer` property to a fun question, because these are opinion/personality prompts rather than right/wrong questions.

```js
{
  category: 'CAMPUS LIFE 😂',
  type: 'fun',
  q: 'Assignment-এর আগের রাতে তোমার vibe কী?',
  options: ['Calm', 'Panic', 'Teamwork', 'Allah ভরসা'],
  results: ['Calm Soul 🌿', 'Deadline Survivor ⏳', 'Team Player 🤝', 'Last-Minute Legend ✨'],
  explain: 'প্রত্যেকের student-life experience আলাদা!'
}
```

Keep each question object comma-separated inside the `QUESTIONS` array. If you add or remove questions, the game updates the total from the array automatically. Keep the `results` array the same length as `options` for fun questions.

## Notes and limitations
- Personal best is stored in localStorage; it is not shared between devices and can be cleared/edited by the user.
- Student-life questions are lighthearted scenarios, not claims about real students or official university policy.
- Verify university-specific facts before adding them.
- The game is not affiliated with or endorsed by Varendra University.
