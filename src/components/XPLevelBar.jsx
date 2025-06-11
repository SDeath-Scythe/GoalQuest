import { getNextLevelXP, getXPProgress } from "../utils/xp";

export default function XPLevelBar({ xp }) {
  const { level, progress } = getXPProgress(xp);
  const nextLevelXP = getNextLevelXP(level);

  return (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md text-white w-full">
      <div className="flex justify-between mb-1 text-sm sm:text-base">
        <span>Level {level}</span>
        <span>{Math.floor(progress * 100)}% to level {level + 1}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-5 overflow-hidden">
        <div
          className="bg-blue-500 h-5 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>
      <p className="mt-2 text-xs sm:text-sm text-gray-300">
        {xp} XP / {nextLevelXP} XP
      </p>
    </div>
  );
}
