export default function ScoreBoard({ moves, time, total, matched }) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="bg-white/20 px-4 py-2 rounded-lg">⏱ {time}s</div>
      <div className="bg-white/20 px-4 py-2 rounded-lg">🎯 {moves}</div>
      <div className="bg-white/20 px-4 py-2 rounded-lg">
        ✅ {matched}/{total}
      </div>
    </div>
  );
}