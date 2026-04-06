import { useState } from 'react';

export function useGameSettings() {
  const [gameSettings, setGameSettings] = useState({
    theme: 'numbers',
    gridSize: 16,
  });

  function updateGameSettings(key, prop) {
    const newSettings = { ...gameSettings, [key]: prop };
    setGameSettings(newSettings);
  }

  return { gameSettings, updateGameSettings };
}
