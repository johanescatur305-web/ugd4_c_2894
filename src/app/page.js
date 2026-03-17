"use client";
import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import ScoreBoard from "../components/ScoreBoard";
import DifficultySelector from "../components/DifficultySelector";
import { FaAppleAlt, FaHeart, FaStar, FaBolt } from "react-icons/fa";

const ICONS = [
  { icon: FaAppleAlt, color: "text-red-400" },
  { icon: FaHeart, color: "text-pink-400" },
  { icon: FaStar, color: "text-yellow-400" },
  { icon: FaBolt, color: "text-blue-400" },
  { icon: FaAppleAlt, color: "text-green-400" },
  { icon: FaHeart, color: "text-purple-400" },
  { icon: FaStar, color: "text-orange-400" },
  { icon: FaBolt, color: "text-cyan-400" },
];

const LEVELS = {
  easy: 4,
  medium: 6,
  hard: 8,
};

export default function Home() {
  const [level, setLevel] = useState("easy");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const createCards = () => {
    const selected = ICONS.slice(0, LEVELS[level]);
    const paired = selected.flatMap((item, index) => [
      { id: index * 2, ...item, pairId: index },
      { id: index * 2 + 1, ...item, pairId: index },
    ]);
    return shuffleArray(paired);
  };

  useEffect(() => {
    setCards(createCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
  }, [level]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      setMoves((m) => m + 1);

      if (cards[first].pairId === cards[second].pairId) {
        setMatchedCards((prev) => [...prev, cards[first].pairId]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 800);
      }
    }
  }, [flippedCards]);

  const handleFlip = (index) => {
    if (!isPlaying) setIsPlaying(true);
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
  };

  const isComplete = matchedCards.length === LEVELS[level];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center text-white p-4">
      
      <h1 className="text-3xl font-bold mb-4">🧠 Memory Card</h1>

      <DifficultySelector level={level} setLevel={setLevel} />

      <ScoreBoard moves={moves} time={time} total={LEVELS[level]} matched={matchedCards.length} />

      {isComplete && (
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg mb-4 animate-pulse">
          🎉 Selesai dalam {time}s dengan {moves} percobaan!
        </div>
      )}

      <button
        onClick={resetGame}
        className="bg-yellow-400 text-black px-4 py-2 rounded-full mb-4 hover:bg-yellow-300"
      >
        🔄 Acak Ulang
      </button>

      <GameBoard
        cards={cards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        onFlip={handleFlip}
      />
    </div>
  );
}