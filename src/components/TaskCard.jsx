export default function TaskCard({ task, onToggle }) {
  const { id, title, xp, completed } = task;

  return (
    <label
      htmlFor={id}
      className={`cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg shadow-md transition
        ${completed ? "bg-green-100 text-green-900 line-through" : "bg-white text-gray-900 hover:bg-gray-50"}
      `}
    >
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="checkbox"
          checked={completed}
          onChange={(e) => onToggle(id, e.target.checked)}
          className="w-5 h-5 accent-green-500"
        />
        <span className="text-base sm:text-lg font-medium">{title}</span>
      </div>
      <span className="text-sm font-semibold">{xp} XP</span>
    </label>
  );
}
