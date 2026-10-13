import React, { useEffect, useMemo, useState } from 'react';
import { QUESTIONS } from './data/questions.js';
import { ArrowRight, ArrowLeft, BookOpen, Check, Clock3, Crown, Download, GraduationCap, Heart, Lightbulb, RotateCcw, Share2, Sparkles, Target, Trophy, Users, Zap, X } from 'lucide-react';

const TAGS = [
  { min: 0, max: 10, art: 'ghost', emoji: '👻', accent: '#9b8cff', title: 'Campus NPC', line: 'তোমাকে campus-এ দেখা যায় না, শুধু attendance sheet-এ তোমার অস্তিত্ব আছে।🤲' },
  { min: 11, max: 20, art: 'chick', emoji: '🐣', accent: '#ffd36a', title: 'Lost Freshie', line: 'ভাই, ভুল করে অন্য department-এ ঢুকেছো?☠️' },
  { min: 21, max: 30, art: 'gamepad', emoji: '🎮', accent: '#6be3c0', title: 'Tutorial Mode', line: 'Campus life-এর tutorial শেষ করো আগে, তারপর main story!😔' },
  { min: 31, max: 40, art: 'bed', emoji: '🛌', accent: '#8db5ff', title: 'Attendance Warrior', line: 'পড়তে আসো না, absent হওয়ার ঝুঁকি নিতে আসো!🤨' },
  { min: 41, max: 50, art: 'friends', emoji: '🤝', accent: '#f4a7d8', title: 'NPC With Friends', line: 'না ভালো, না খারাপ—তুমিই মাঝখানের মানুষ!🌚' },
  { min: 51, max: 60, art: 'cool', emoji: '😎', accent: '#ffb16e', title: 'Certified Viber', line: 'Class মোটামুটি, canteen attendance 100%!👀' },
  { min: 61, max: 70, art: 'gossip', emoji: '🗣️', accent: '#d4a6ff', title: 'Gossip Department Head', line: 'তোমাকে ছাড়া campus boring!🌚' },
  { min: 71, max: 80, art: 'heart', emoji: '💘', accent: '#ff8fbd', title: 'Campus Main Character', line: 'নিজের life একটা movie, আর crush হলো unpaid co-star!🙂' },
  { min: 81, max: 90, art: 'crown', emoji: '👑', accent: '#f3cc71', title: 'Campus Legend', line: 'তুমি campus-এ আসো না, campus তোমার জন্য অপেক্ষা করে!🤲' },
  { min: 91, max: 99, art: 'boss', emoji: '💀', accent: '#8ef0b0', title: 'Final Boss', line: 'Sir পর্যন্ত তোমার নাম জানে—কিন্তু কোন কারণে, সেটা প্রশ্ন!☠️' },
  { min: 100, max: 100, art: 'menace', emoji: '☠️', accent: '#ff777f', title: 'Campus Menace', line: 'University তোমাকে নিয়ে research করা উচিত!👀' },
];
const getTag = (percentage) => TAGS.find(tag => percentage >= tag.min && percentage <= tag.max) || TAGS[0];
const BEST_SCORE_KEY = 'vuian-personal-best';
const getBest = () => { try { const value = Number(window.localStorage.getItem(BEST_SCORE_KEY) || 0); return Number.isFinite(value) ? Math.max(0, Math.min(QUESTIONS.length, value)) : 0; } catch { return 0; } };

function Brand({ onClick }) { return <button className="brand" onClick={onClick} aria-label="গর্বিত VUian home"><span className="brand-mark"><Crown size={19}/></span><span className="brand-word">গর্বিত <b>VUian</b><small>YOUR CAMPUS. YOUR STORY.</small></span></button>; }
function Header({ page, setPage }) { return <header className="topbar"><div className="topbar-inner"><Brand onClick={() => setPage('home')}/><div className="header-tag"><span className="status-dot"/> VU TRIVIA + CAMPUS FUN</div><button className="button button-small button-primary" onClick={() => setPage(page === 'quiz' ? 'quiz' : 'setup')}>{page === 'quiz' ? 'চলো খেলি' : 'খেলা শুরু'} <ArrowRight size={15}/></button></div></header>; }
function SectionEyebrow({ children }) { return <div className="eyebrow"><span className="eyebrow-line"/>{children}</div>; }
function HomePage({ setPage, best }) { return <main className="page-shell"><section className="hero"><div className="hero-grid"/><div className="hero-copy"><SectionEyebrow>THE VUian EXPERIENCE</SectionEyebrow><h1>তোমার <span>ক্যাম্পাস।</span><br/>তোমার <em>গল্প।</em></h1><p className="hero-description">১৫টি relatable campus প্রশ্ন, student-life-এর মজার মুহূর্ত আর শেষে তোমার ultimate CAMPUS VIBES tag!</p><div className="hero-actions"><button className="button button-primary button-large" onClick={() => setPage('setup')}>চ্যালেঞ্জ শুরু করো <ArrowRight size={18}/></button><button className="button button-ghost button-large" onClick={() => document.getElementById('how-to-play')?.scrollIntoView({ behavior: 'smooth' })}>কীভাবে খেলবে <BookOpen size={17}/></button></div><div className="hero-proof"><div className="proof-avatars"><span>V</span><span>U</span><span>!</span></div><div><b>কোনো account লাগবে না</b><small>১৫টি প্রশ্ন · নিজের best score</small></div></div></div><div className="hero-visual"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-emblem"><div className="emblem-ring"><GraduationCap size={61}/></div><div className="emblem-word">VU<span>IAN</span></div><div className="emblem-caption">CAMPUS KNOWLEDGE · GOOD VIBES</div></div><div className="floating-card float-rank"><span className="mini-icon gold"><Trophy size={16}/></span><div><small>PERSONAL BEST</small><b>{best} <i>/ 15</i></b></div></div><div className="floating-card float-streak"><span className="mini-icon purple"><Zap size={16}/></span><div><small>YOUR MISSION</small><b>Have some fun.</b></div></div><div className="visual-label"><span/> READY WHEN YOU ARE</div></div><div className="hero-bottom"><span>01 / YOUR VU STORY</span><span>SCROLL TO EXPLORE ↓</span></div></section><section className="stats-strip"><div className="stat-item"><span className="stat-icon"><GraduationCap size={18}/></span><div><strong>Campus Fun</strong><small>Relatable moments</small></div></div><div className="stat-item"><span className="stat-icon"><Heart size={18}/></span><div><strong>Student Life</strong><small>Relatable moments</small></div></div><div className="stat-item"><span className="stat-icon"><Clock3 size={18}/></span><div><strong>১৫ সেকেন্ড</strong><small>প্রতি প্রশ্নে</small></div></div><div className="stat-item"><span className="stat-icon"><Target size={18}/></span><div><strong>১৫ পয়েন্ট</strong><small>সর্বোচ্চ স্কোর</small></div></div></section><section className="section how-section" id="how-to-play"><div className="section-title"><div><SectionEyebrow>HOW TO PLAY</SectionEyebrow><h2>সহজ rules। <span className="text-gradient">মজার challenge.</span></h2><p>Nickname দাও, প্রশ্নের উত্তর দাও, শেষে নিজের result দেখো।</p></div></div><div className="steps-grid"><article className="step-card"><div className="step-top"><span>01</span><span className="step-icon"><Users/></span></div><h3>নিজের নাম বেছে নাও</h3><p>একটি nickname দাও। কোনো account বা registration নেই।</p><div className="step-bottom">MAKE IT YOURS <ArrowRight size={14}/></div></article><article className="step-card"><div className="step-top"><span>02</span><span className="step-icon"><Lightbulb/></span></div><h3>১৫টি প্রশ্নের উত্তর দাও</h3><p>প্রতিটি প্রশ্নে ১৫ সেকেন্ড। প্রতিটি প্রশ্নে recommended option মিললে ১ পয়েন্ট; শেষে তোমার CAMPUS VIBES tag!</p><div className="step-bottom">TRIVIA + CAMPUS LIFE <ArrowRight size={14}/></div></article><article className="step-card"><div className="step-top"><span>03</span><span className="step-icon"><Sparkles/></span></div><h3>নিজের title unlock করো</h3><p>স্কোর অনুযায়ী funny title দেখো, উত্তর review করো, আবার খেলো।</p><div className="step-bottom">YOUR OWN RESULT <ArrowRight size={14}/></div></article></div></section><section className="final-cta"><div className="cta-glow"/><SectionEyebrow>YOUR CAMPUS. YOUR STORY.</SectionEyebrow><h2>প্রস্তুত তো, VUian?</h2><p>দেখি তোমার campus spirit কতটা strong।</p><button className="button button-primary button-large" onClick={() => setPage('setup')}>আমি প্রস্তুত <ArrowRight size={18}/></button><span className="cta-footnote">FREE TO PLAY · NO ACCOUNT · JUST FUN</span></section><Footer setPage={setPage}/></main>; }
function Footer({ setPage }) { return <footer className="footer"><div className="footer-top"><Brand onClick={() => setPage('home')}/><p>ক্যাম্পাসের গল্প, এবার quiz-এর ছলে। <span>Keep it fun. Keep it kind.</span></p><button className="back-top" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>BACK TO TOP ↑</button></div><div className="footer-bottom"><span>© 2026 গর্বিত VUian · Independent fun quiz project</span><span className="footer-disclaimer">Not an official Varendra University platform.</span></div></footer>; }
function SetupPage({ setPage, player, setPlayer }) { const [error, setError] = useState(''); const start = (e) => { e.preventDefault(); const name = player.trim(); if (name.length < 2) { setError('কমপক্ষে ২ অক্ষরের nickname দাও।'); return; } if (name.length > 18) { setError('Nickname সর্বোচ্চ ১৮ অক্ষরের হতে পারবে।'); return; } setPlayer(name); setPage('quiz'); }; return <main className="subpage"><button className="back-link" onClick={() => setPage('home')}><ArrowLeft size={16}/> হোমে ফিরে যাও</button><div className="setup-layout"><div className="setup-aside"><SectionEyebrow>READY, PLAYER ONE?</SectionEyebrow><h1>তোমার নাম,<br/><span className="text-gradient">তোমার vibe.</span></h1><p>Nickname বেছে নাও। তারপর শুরু হোক Campus Fun Quiz—দেখি তোমার campus vibe কেমন।</p><div className="setup-feature"><span><Check size={16}/></span><div><b>কোনো account লাগবে না</b><small>শুধু nickname, তারপর খেলা।</small></div></div><div className="setup-feature"><span><Check size={16}/></span><div><b>১৫টি প্রশ্ন · ১৫ সেকেন্ড</b><small>Trivia-তে সঠিক উত্তর, fun প্রশ্নে উত্তর দিলেই পয়েন্ট।</small></div></div><div className="setup-feature"><span><Check size={16}/></span><div><b>নিজের best score</b><small>এই browser-এ personal best save হবে।</small></div></div></div><form className="setup-panel" onSubmit={start}><div className="panel-icon"><GraduationCap size={25}/></div><div className="eyebrow">PLAYER SETUP</div><h2>চলো পরিচিত হই।</h2><p>তুমি কী নামে খেলতে চাও?</p><label className="field-label" htmlFor="nickname">YOUR NICKNAME</label><input id="nickname" className="nickname-input" value={player} onChange={e => { setPlayer(e.target.value); setError(''); }} placeholder="যেমন: VUianRafi" maxLength={18} autoComplete="nickname" autoFocus/><div className="input-hint"><span>২–১৮ অক্ষর</span><span>{player.trim().length}/18</span></div>{error && <p className="form-error">{error}</p>}<button className="button button-primary button-large setup-submit" type="submit">Quiz শুরু করো <ArrowRight size={18}/></button><div className="privacy-note"><ShieldIcon/> তোমার nickname ও personal best শুধু এই browser-এ থাকবে।</div></form></div><Footer setPage={setPage}/></main>; }
function ShieldIcon(){return <span className="shield-small">✓</span>}
function QuizPage({ player, onFinish, setPage }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(15);
  const [locked, setLocked] = useState(false);
  const question = QUESTIONS[index];
  const selected = answers[index];

  const choose = (choice) => {
    if (locked || selected !== null) return;
    setAnswers(prev => prev.map((a, i) => i === index ? choice : a));
    setLocked(true);
  };

  const advance = () => {
    if (index === QUESTIONS.length - 1) {
      onFinish(answers, player);
      return;
    }
    setIndex(i => i + 1);
    setTimeLeft(15);
    setLocked(false);
  };

  useEffect(() => {
    if (locked) return;
    if (timeLeft <= 0) {
      setLocked(true);
      return;
    }
    const id = window.setTimeout(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => window.clearTimeout(id);
  }, [index, locked, timeLeft]);

  function setPageHomeSafe() {
    if (window.confirm('Quiz ছেড়ে হোমে ফিরবে? এই run-এর result save হবে না।')) setPage('home');
  }

  const funQuestion = question.type === 'fun';
  return <main className="subpage quiz-page">
    <div className="quiz-topline">
      <button className="back-link" onClick={setPageHomeSafe}><ArrowLeft size={16}/> হোম</button>
      <div className="quiz-player"><span className="player-avatar mini-avatar">{player.slice(0,1).toUpperCase()}</span><span>{player}</span><span className="quiz-chip">VUian challenge</span></div>
    </div>
    <div className="quiz-container">
      <div className="quiz-progress-meta"><span>QUESTION <b>{String(index+1).padStart(2,'0')}</b> <i>/ {QUESTIONS.length}</i></span><span className={timeLeft <= 5 ? 'timer danger' : 'timer'}><Clock3 size={15}/>{String(timeLeft).padStart(2,'0')}s</span></div>
      <div className="progress-track"><span style={{width:`${(index+1)/QUESTIONS.length*100}%`}}/></div>
      <div className="question-meta"><span className="question-category">{question.category}</span><span className="question-points"><Zap size={13}/> {funQuestion ? '+1 VIBE POINT' : '+1 POINT'}</span></div>
      <h1 className="question-title">{question.q}</h1>
      <p className="question-subtitle">{funQuestion ? 'তোমার সঙ্গে যেটা বেশি যায়, সেটি বেছে নাও—এখানে ভুল উত্তর নেই।' : 'নিজের best guess বেছে নাও। উত্তর শেষে review করতে পারবে।'}</p>
      <div className="answers-grid">{question.options.map((option, i) => {
        const isSelected = selected === i;
        return <button key={option} className={`answer-option ${isSelected ? 'selected' : ''}`} onClick={() => choose(i)} disabled={locked} aria-pressed={isSelected}>
          <span className="option-letter">{String.fromCharCode(65+i)}</span><span>{option}</span><span className="option-state">{isSelected ? <Check size={16}/> : null}</span>
        </button>;
      })}</div>
      {locked && <div className="answer-explanation neutral-feedback" role="status"><span className="feedback-icon"><Sparkles size={17}/></span><div><b>{selected === null ? 'সময় শেষ!' : 'উত্তর সেভ হয়েছে।'}</b><p>{selected === null ? 'এই প্রশ্নটি skip হলো। পরের প্রশ্নে এগিয়ে চলো।' : 'সঠিক বা ভুল এখন দেখানো হচ্ছে না—সবশেষে result review করতে পারবে।'}</p></div></div>}
      <div className="quiz-footer"><span className="answered-count">{answers.filter(a => a !== null).length} answered · {QUESTIONS.length-index-1} left</span><button className="button button-primary" onClick={advance} disabled={!locked}>{index === QUESTIONS.length-1 ? 'Result দেখো' : 'পরের প্রশ্ন'} <ArrowRight size={17}/></button></div>
      <div className="question-dots" aria-label="Question progress">{QUESTIONS.map((q,i)=><span key={q.q} className={`${i===index?'current':''} ${answers[i]!==null?'done':''}`}/>)}</div>
    </div>
  </main>;
}

async function makeStoryCanvas(result, tag) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported in this browser.');

  const bg = ctx.createLinearGradient(0, 0, 1080, 1920);
  bg.addColorStop(0, '#090b12');
  bg.addColorStop(0.48, '#171329');
  bg.addColorStop(1, '#080a0f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft colored glow and editorial rings.
  const glow = ctx.createRadialGradient(540, 640, 40, 540, 640, 590);
  glow.addColorStop(0, `${tag.accent}44`);
  glow.addColorStop(1, `${tag.accent}00`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 80, 1080, 1160);
  ctx.strokeStyle = `${tag.accent}35`;
  ctx.lineWidth = 2;
  [290, 360, 430].forEach((radius) => {
    ctx.beginPath();
    ctx.arc(540, 620, radius, 0, Math.PI * 2);
    ctx.stroke();
  });

  const roundRect = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  };
  const centered = (text, y, font, color) => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, 540, y, 900);
  };

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f0c66a';
  ctx.font = '800 30px Arial, sans-serif';
  ctx.fillText('গর্বিত VUian', 540, 120);
  ctx.fillStyle = '#a8adbd';
  ctx.font = '700 20px Arial, sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillText('YOUR CAMPUS. YOUR STORY.', 540, 166);
  ctx.letterSpacing = '0px';

  // Tag sticker illustration.
  const sticker = ctx.createLinearGradient(260, 300, 820, 940);
  sticker.addColorStop(0, `${tag.accent}2c`);
  sticker.addColorStop(1, '#ffffff08');
  ctx.fillStyle = sticker;
  roundRect(220, 300, 640, 640, 72);
  ctx.fill();
  ctx.strokeStyle = `${tag.accent}88`;
  ctx.lineWidth = 3;
  roundRect(220, 300, 640, 640, 72);
  ctx.stroke();
  try {
    const illustration = new Image();
    illustration.src = `/tags/${tag.art}.svg`;
    await illustration.decode();
    ctx.drawImage(illustration, 260, 340, 560, 560);
  } catch {
    centered(tag.emoji, 710, '230px "Apple Color Emoji", "Segoe UI Emoji", sans-serif', '#ffffff');
  }
  centered('CAMPUS VIBES TAG', 1010, '800 24px Arial, sans-serif', tag.accent);

  // Player name and score.
  centered(result.name, 1100, '800 58px "Noto Sans Bengali", "Hind Siliguri", Arial, sans-serif', '#ffffff');
  centered(`${result.points} / ${result.total} POINTS`, 1175, '700 30px Arial, sans-serif', '#c5c9d5');
  ctx.fillStyle = `${tag.accent}20`;
  roundRect(250, 1225, 580, 170, 38);
  ctx.fill();
  ctx.strokeStyle = `${tag.accent}70`;
  ctx.lineWidth = 2;
  roundRect(250, 1225, 580, 170, 38);
  ctx.stroke();
  centered(`${result.percentage}%`, 1340, '900 88px Arial, sans-serif', tag.accent);

  centered(tag.title, 1490, '800 46px "Noto Sans Bengali", "Hind Siliguri", Arial, sans-serif', '#ffffff');
  ctx.font = '500 29px "Noto Sans Bengali", "Hind Siliguri", Arial, sans-serif';
  ctx.fillStyle = '#c4c7d3';
  const words = tag.line.split(' ');
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > 830 && line) { lines.push(line); line = word; }
    else line = test;
  });
  if (line) lines.push(line);
  lines.slice(0, 3).forEach((text, i) => ctx.fillText(text, 540, 1560 + i * 46));

  ctx.strokeStyle = '#ffffff1c';
  ctx.beginPath();
  ctx.moveTo(100, 1740);
  ctx.lineTo(980, 1740);
  ctx.stroke();
  centered('তুমিও খেলো — CAMPUS VIBES', 1800, '700 28px "Noto Sans Bengali", "Hind Siliguri", Arial, sans-serif', '#f0c66a');
  centered(window.location.host || 'campus-vibes', 1850, '500 20px Arial, sans-serif', '#8d93a4');
  return canvas;
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Could not generate story image.')), 'image/png');
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function ResultPage({ setPage, result, best, isNewBest }) {
  const [showReview, setShowReview] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  const title = getTag(result.percentage);

  const downloadStory = async () => {
    try {
      const blob = await canvasToBlob(makeStoryCanvas(result, title));
      downloadBlob(blob, `vuian-campus-vibes-${title.art}.png`);
      setShareStatus('Story image download শুরু হয়েছে। Instagram/Facebook Story-তে upload করো।');
    } catch (error) {
      setShareStatus('Image তৈরি করা যায়নি। অন্য browser-এ চেষ্টা করো।');
    }
  };

  const shareStory = async () => {
    setShareStatus('');
    try {
      const blob = await canvasToBlob(makeStoryCanvas(result, title));
      const file = new File([blob], `vuian-campus-vibes-${title.art}.png`, { type: 'image/png' });
      const shareText = `🎓 গর্বিত VUian Campus Vibes\nআমার tag: ${title.emoji} ${title.title}\nScore: ${result.points}/${result.total}\n${title.line}`;
      if (typeof File !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: 'গর্বিত VUian — Campus Vibes', text: shareText, files: [file] });
        setShareStatus('Share menu খোলা হয়েছে। Instagram/Facebook বা পছন্দের app বেছে নাও।');
        return;
      }
      downloadBlob(blob, `vuian-campus-vibes-${title.art}.png`);
      setShareStatus('এই browser image সরাসরি share করতে দেয় না, তাই Story image download হয়েছে। এখন Instagram/Facebook Story-তে upload করো।');
    } catch (error) {
      if (error?.name === 'AbortError') return;
      setShareStatus('Share করা যায়নি। Story image download button ব্যবহার করো।');
    }
  };

  return <main className="subpage result-page"><div className="result-glow"/><div className="result-container">
    <div className="eyebrow"><Sparkles size={14}/> RUN COMPLETE</div><div className="result-crown"><Trophy size={36}/></div>
    <h1>ভালো খেলেছ, <span className="text-gradient">{result.name}!</span></h1><p className="result-subtitle">সব প্রশ্ন শেষ! এবার তোমার CAMPUS VIBES tag দেখো।</p>
    <div className={`tag-art-card tag-art-${title.art}`} style={{ '--tag-accent': title.accent }}>
      <div className="tag-art-orbit tag-art-orbit-one"/><div className="tag-art-orbit tag-art-orbit-two"/>
      <div className="tag-art-topline"><span>গর্বিত VUian</span><span>YOUR CAMPUS. YOUR STORY.</span></div>
      <div className="tag-art-sticker" role="img" aria-label={`${title.title} funny illustration`}><img src={`/tags/${title.art}.svg`} alt={`${title.title} funny illustration`}/></div>
      <div className="tag-art-label">YOUR CAMPUS VIBES TAG</div>
      <h2>{title.title}</h2><p>{title.line}</p>
      <div className="tag-art-score"><span>YOUR SCORE</span><strong>{result.points}<small>/{result.total}</small></strong><b>{result.percentage}%</b></div>
    </div>
    <div className="score-card"><div className="score-ring" style={{'--score':`${result.percentage}%`}}><div className="score-ring-inner"><small>YOUR POINTS</small><strong>{result.points}<i>/{result.total}</i></strong><span>{result.percentage}%</span></div></div>
      <div className="score-details"><div><span>Recommended option মিলেছে</span><b>{result.points} <small>/ {result.total}</small></b></div><div><span>উত্তর দিয়েছ</span><b>{result.answered} <small>/ {result.total}</small></b></div><div><span>তোমার title</span><b className="rank-text">{title.emoji} {title.title}</b></div><div><span>Personal best</span><b>{best} / {result.total} {isNewBest && <small className="new-best">NEW BEST!</small>}</b></div></div>
    </div>
    <div className="result-message"><Sparkles size={19}/><div><b>{title.emoji} {title.title}</b><p>{title.line}</p></div></div>
    <div className="result-actions"><button className="button button-primary button-large" onClick={() => setPage('setup')}><RotateCcw size={17}/> আবার খেলো</button><button className="button button-ghost button-large" onClick={shareStory}><Share2 size={17}/> Story share করো</button></div>
    <button className="button button-ghost button-large story-download-button" onClick={downloadStory}><Download size={17}/> Story image download করো</button>
    {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
    <button className="review-toggle" onClick={() => setShowReview(!showReview)}>{showReview?'উত্তর review বন্ধ করো':'সব উত্তর review করো'} <ArrowRight size={15} className={showReview?'rotate':''}/></button>
    {showReview && <div className="review-list">{result.questions.map((q,i) => {
      const answer = result.answers[i];
      if (q.type === 'fun') { const matched = answer !== null && answer === q.answer; return <div className="review-item fun-review" key={q.id || q.q}><span className={`review-status ${matched?'correct':'fun-status'}`}>{matched?<Check size={15}/>:<Heart size={15}/>}</span><div><b>{i+1}. {q.q}</b><small>তোমার উত্তর: {answer === null ? 'সময় শেষ—উত্তর দেওয়া হয়নি' : q.options[answer]}</small><small className="review-result">Recommended answer: {q.options[q.answer]}{matched ? ' · +1 point 🎉' : ''}</small>{answer !== null && <small>তোমার vibe: {q.results?.[answer] || 'Campus Mood ✨'}</small>}<small>{q.explain}</small></div></div>; }
      const correct = answer === q.answer;
      return <div className="review-item" key={q.id || q.q}><span className={`review-status ${correct?'correct':'wrong'}`}>{correct?<Check size={15}/>:<X size={15}/>}</span><div><b>{i+1}. {q.q}</b><small>সঠিক উত্তর: {q.options[q.answer]}{answer !== null && answer !== q.answer ? ` · তোমার উত্তর: ${q.options[answer]}` : answer === null ? ' · তুমি উত্তর দাওনি' : ' · তোমার উত্তর সঠিক'}</small><small>{q.explain}</small></div></div>;
    })}</div>}
    <p className="result-disclaimer">গর্বিত VUian একটি independent fun project; এটি Varendra University-এর official platform নয়।</p>
  </div><Footer setPage={setPage}/></main>;
}

export default function App() { const [page, setPage] = useState('home'); const [player, setPlayer] = useState(''); const [best, setBest] = useState(getBest); const [result, setResult] = useState(null); const [isNewBest, setIsNewBest] = useState(false); useEffect(() => { document.title = `${({home:'Home',setup:'Player Setup',quiz:'Quiz',result:'Result'})[page] || 'Home'} — গর্বিত VUian`; window.scrollTo(0,0); }, [page]); useEffect(() => { const handleHash = () => { if (window.location.hash === '#home') { setPage('home'); window.history.replaceState(null,'',window.location.pathname); } }; const syncBest = (event) => { if (event.key === BEST_SCORE_KEY) setBest(getBest()); }; window.addEventListener('hashchange',handleHash); window.addEventListener('storage',syncBest); return () => { window.removeEventListener('hashchange',handleHash); window.removeEventListener('storage',syncBest); }; }, []); const finish = (answers, name) => { const answered = answers.filter(answer => answer !== null).length; const points = QUESTIONS.filter((q,i) => answers[i] !== null && answers[i] === q.answer).length; const percentage = Math.round(points/QUESTIONS.length*100); const previousBest = Math.max(getBest(), best); const nextBest = Math.max(previousBest, points); setIsNewBest(points > previousBest); setBest(nextBest); try { window.localStorage.setItem(BEST_SCORE_KEY, String(nextBest)); } catch (error) { console.warn('Personal best could not be saved in this browser:', error); } setResult({ name, answers, points, correctFacts:points, factTotal:QUESTIONS.length, funAnswered:answered, funTotal:QUESTIONS.length, answered, percentage, total:QUESTIONS.length, questions:QUESTIONS }); setPage('result'); }; return <><Header page={page} setPage={setPage}/>{page==='home'&&<HomePage setPage={setPage} best={best}/>}{page==='setup'&&<SetupPage setPage={setPage} player={player} setPlayer={setPlayer}/>}{page==='quiz'&&<QuizPage player={player||'VUian'} onFinish={finish} setPage={setPage}/>}{page==='result'&&result&&<ResultPage setPage={setPage} result={result} best={best} isNewBest={isNewBest}/>}</>; }
