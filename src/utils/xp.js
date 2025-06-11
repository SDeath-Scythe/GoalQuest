export const levelThresholds = [0, 300, 600, 1000, 1500, 2000];

export function getLevel(xp) {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (xp >= levelThresholds[i]) return i;
  }
  return 0;
}

export function getNextLevelXP(level) {
  return levelThresholds[level + 1] || levelThresholds[level];
}

export function getXPProgress(xp) {
  const level = getLevel(xp);
  const currentLevelXP = levelThresholds[level];
  const nextLevelXP = getNextLevelXP(level);

  const progress = (xp - currentLevelXP) / (nextLevelXP - currentLevelXP);
  return { level, progress };
}
