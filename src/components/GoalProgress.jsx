import React from 'react';

export default function GoalProgress({ title, importance, progress }) {
  // progress is 0 to 1 (fraction)

  const progressPercent = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <div className="mb-6 bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-gray-400">Importance: {importance}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="text-right text-sm text-gray-300 mt-1">{progressPercent.toFixed(0)}%</div>
    </div>
  );
}
