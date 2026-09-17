import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../config/data';

const Hero = () => {
  const [text, setText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'game'

  // Snake Game State
  const GRID_SIZE = 14;
  const [snake, setSnake] = useState([[6, 6], [6, 7]]);
  const [direction, setDirection] = useState([0, -1]); // Up
  const [food, setFood] = useState([3, 3]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'gameover'

  const titles = portfolioData.titles;

  // Typing effect loop
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentTitle.substring(0, text.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setText(currentTitle.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      setTypingSpeed(100);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, titleIndex, titles]);

  // Game Loop Tick
  useEffect(() => {
    if (activeTab !== 'game' || gameState !== 'playing') return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const nextHead = [head[0] + direction[0], head[1] + direction[1]];

        // Wall collisions
        if (
          nextHead[0] < 0 ||
          nextHead[0] >= GRID_SIZE ||
          nextHead[1] < 0 ||
          nextHead[1] >= GRID_SIZE
        ) {
          setGameState('gameover');
          return prevSnake;
        }

        // Self collision
        for (const segment of prevSnake) {
          if (segment[0] === nextHead[0] && segment[1] === nextHead[1]) {
            setGameState('gameover');
            return prevSnake;
          }
        }

        const newSnake = [nextHead, ...prevSnake];

        // Eat food
        if (nextHead[0] === food[0] && nextHead[1] === food[1]) {
          setScore((prev) => {
            const nextScore = prev + 10;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          
          // Spawn new food coordinate not occupied by the snake
          let newFood;
          while (true) {
            newFood = [
              Math.floor(Math.random() * GRID_SIZE),
              Math.floor(Math.random() * GRID_SIZE)
            ];
            const onSnake = prevSnake.some((seg) => seg[0] === newFood[0] && seg[1] === newFood[1]);
            if (!onSnake) break;
          }
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 160);
    return () => clearInterval(intervalId);
  }, [activeTab, gameState, direction, food, highScore]);

  // Keyboard Event Listeners for Snake Game
  useEffect(() => {
    if (activeTab !== 'game' || gameState !== 'playing') return;

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault(); // Stop window scrolling
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction[1] !== 1) setDirection([0, -1]);
          break;
        case 'ArrowDown':
          if (direction[1] !== -1) setDirection([0, 1]);
          break;
        case 'ArrowLeft':
          if (direction[0] !== 1) setDirection([-1, 0]);
          break;
        case 'ArrowRight':
          if (direction[0] !== -1) setDirection([1, 0]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, gameState, direction]);

  const startGame = () => {
    setSnake([[6, 6], [6, 7], [6, 8]]);
    setDirection([0, -1]);
    setFood([3, 3]);
    setScore(0);
    setGameState('playing');
  };

  const renderGrid = () => {
    const cells = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const isHead = snake[0] && snake[0][0] === c && snake[0][1] === r;
        const isBody = snake.slice(1).some((seg) => seg[0] === c && seg[1] === r);
        const isFood = food[0] === c && food[1] === r;

        cells.push(
          <div
            key={`${c}-${r}`}
            className={`w-full aspect-square rounded-[3px] transition-all duration-75 ${
              isHead
                ? 'bg-gradient-to-tr from-dreamy-pink to-dreamy-violet shadow-neon-pink'
                : isBody
                ? 'bg-dreamy-blue/80'
                : isFood
                ? 'bg-emerald-400 animate-pulse scale-95'
                : 'bg-white/5'
            }`}
          />
        );
      }
    }
    return cells;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-25">
      {/* Ambient gradient backgrounds */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-dreamy-pink/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-dreamy-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glass Deck Container */}
      <div className="relative max-w-4xl w-full glass-card p-8 md:p-14 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-12 z-10">
        
        {/* Soft dot indicators */}
        <div className="absolute top-6 left-6 flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-dreamy-pink/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-dreamy-violet/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-dreamy-blue/80"></span>
        </div>

        {/* Hero Left Content */}
        <div className="flex-1 flex flex-col items-start text-left">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-slate-100 text-xs font-semibold rounded-full mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-dreamy-pink animate-spin duration-3000" />
            <span>AVAILABLE FOR CREATIVE CONTRACTS</span>
          </div>

          <h2 className="text-xs font-bold tracking-widest text-dreamy-blue uppercase mb-2">
            HELLO, I AM
          </h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white m-0 mb-4 drop-shadow-md">
            {portfolioData.name}
          </h1>

          {/* Typing Title */}
          <div className="h-12 flex items-center mb-6">
            <span className="text-2xl md:text-3xl font-extrabold text-gradient-dreamy">
              {text}
            </span>
            <span className="w-[3px] h-8 bg-dreamy-pink ml-1 animate-pulse" />
          </div>

          <p className="text-slate-100 font-sans text-md md:text-lg mb-8 leading-relaxed max-w-xl font-medium">
            {portfolioData.tagline}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-dreamy-pink to-dreamy-blue text-slate-900 font-bold text-sm rounded-full hover:opacity-95 shadow-lg shadow-dreamy-pink/30 hover:scale-105 transition-all duration-300"
            >
              EXPLORE MY WORK
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3.5 border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-full hover:scale-105 transition-all duration-300"
            >
              SAY HELLO
            </a>
          </div>
        </div>

        {/* Hero Right Code Visualizer (macOS Window Style in Glassmorphism with Snake mini-game) */}
        <div className="hidden lg:flex w-80 flex-col bg-slate-950/85 backdrop-blur-md border border-white/15 p-5 rounded-2xl font-mono text-xs text-slate-100 text-left relative overflow-hidden shadow-2xl z-10 min-h-[385px]">
          
          {/* macOS Title Bar Controls & Tabs */}
          <div className="flex flex-col border-b border-white/10 pb-2 mb-3">
            <div className="flex gap-1.5 items-center mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            
            {/* Editor Tabs Selection */}
            <div className="flex gap-1 mt-1 font-mono text-[9px] font-bold">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-t-lg transition-colors ${
                  activeTab === 'code'
                    ? 'bg-[#030308] border-t-2 border-t-dreamy-pink border-x border-x-white/10 text-white'
                    : 'text-slate-450 hover:text-slate-200'
                }`}
              >
                developer.json
              </button>
              <button
                onClick={() => {
                  setActiveTab('game');
                  if (gameState === 'idle') startGame();
                }}
                className={`px-3 py-1.5 rounded-t-lg transition-colors flex items-center gap-1 ${
                  activeTab === 'game'
                    ? 'bg-[#030308] border-t-2 border-t-dreamy-blue border-x border-x-white/10 text-white'
                    : 'text-slate-450 hover:text-slate-200'
                }`}
              >
                <span>snake.exe</span>
                <span className="text-dreamy-blue animate-pulse">🎮</span>
              </button>
            </div>
          </div>
          
          {/* Tab 1: JSON Code block */}
          {activeTab === 'code' && (
            <div className="space-y-1.5 leading-relaxed font-semibold animate-fadeIn">
              <div><span className="text-[#ff79c6]">const</span> dev = &#123;</div>
              <div className="pl-4">name: <span className="text-[#50fa7b]">"Ravi Kaushal"</span>,</div>
              <div className="pl-4">role: <span className="text-[#50fa7b]">"Fullstack Creative"</span>,</div>
              <div className="pl-4">skills: [</div>
              <div className="pl-8 text-[#8be9fd]">"Web", "App", "Game"</div>
              <div className="pl-4">],</div>
              <div className="pl-4">status: <span className="text-[#50fa7b]">"Always Coding"</span>,</div>
              <div className="pl-4">coffeeLevel: <span className="text-[#ff79c6]">99</span></div>
              <div>&#125;;</div>
              <div className="pt-2 text-slate-400 font-medium">// Processing stack...</div>
              <div className="text-[#50fa7b] font-bold">&gt; RUN dev.buildPortfolio()</div>
              <div className="text-[#8be9fd] font-bold">Success: 60fps achieved.</div>
            </div>
          )}

          {/* Tab 2: Snake Minigame */}
          {activeTab === 'game' && (
            <div className="flex flex-col items-center justify-between flex-1 font-mono animate-fadeIn relative">
              {/* Score bar */}
              <div className="w-full flex justify-between text-[10px] text-slate-350 font-bold border-b border-white/5 pb-1.5 mb-2.5">
                <span>SCORE: {score}</span>
                <span className="text-dreamy-pink">HIGH: {highScore}</span>
              </div>

              {/* Game Grid Board */}
              <div 
                className="grid gap-[2px] w-full max-w-[200px] aspect-square mx-auto border border-white/10 p-1 rounded-lg bg-[#030308]/90 relative overflow-hidden"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
              >
                {renderGrid()}

                {/* Overlays */}
                {gameState === 'idle' && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-[10px] font-bold text-white mb-2">RETRO SNAKE GAME</span>
                    <button
                      onClick={startGame}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-dreamy-pink to-dreamy-blue text-slate-900 font-extrabold text-[9px] tracking-wider rounded-lg"
                    >
                      START_GAME
                    </button>
                  </div>
                )}

                {gameState === 'gameover' && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs font-black text-rose-500 mb-1 tracking-widest">GAME_OVER</span>
                    <span className="text-[9px] text-slate-300 mb-3 font-semibold">FINAL SCORE: {score}</span>
                    <button
                      onClick={startGame}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-dreamy-pink to-dreamy-blue text-slate-900 font-extrabold text-[9px] tracking-wider rounded-lg"
                    >
                      PLAY_AGAIN
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Arrow controls / Directional Pad */}
              <div className="w-full flex flex-col items-center mt-3 scale-90">
                <div className="flex flex-col items-center gap-1">
                  {/* Up button */}
                  <button
                    onClick={() => { if (direction[1] !== 1) setDirection([0, -1]); }}
                    className="w-6 h-6 border border-white/15 bg-white/5 rounded flex items-center justify-center text-slate-200 hover:bg-white/10 active:scale-95"
                  >
                    ▲
                  </button>
                  <div className="flex gap-4">
                    {/* Left button */}
                    <button
                      onClick={() => { if (direction[0] !== 1) setDirection([-1, 0]); }}
                      className="w-6 h-6 border border-white/15 bg-white/5 rounded flex items-center justify-center text-slate-200 hover:bg-white/10 active:scale-95"
                    >
                      ◀
                    </button>
                    {/* Down button */}
                    <button
                      onClick={() => { if (direction[1] !== -1) setDirection([0, 1]); }}
                      className="w-6 h-6 border border-white/15 bg-white/5 rounded flex items-center justify-center text-slate-200 hover:bg-white/10 active:scale-95"
                    >
                      ▼
                    </button>
                    {/* Right button */}
                    <button
                      onClick={() => { if (direction[0] !== -1) setDirection([1, 0]); }}
                      className="w-6 h-6 border border-white/15 bg-white/5 rounded flex items-center justify-center text-slate-200 hover:bg-white/10 active:scale-95"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default Hero;
