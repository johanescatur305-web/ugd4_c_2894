export default function DifficultySelector({ level, setLevel }) {
  return (
    <div className="flex gap-2 mb-4">
      {["easy", "medium", "hard"].map((lvl) => (
        <button
          key={lvl}
          onClick={() => setLevel(lvl)}
          className={`px-3 py-1 rounded-full ${
            level === lvl ? "bg-yellow-400 text-black" : "bg-white/20"
          }`}
        >
          {lvl}
        </button>
      ))}
    </div>
  );
}