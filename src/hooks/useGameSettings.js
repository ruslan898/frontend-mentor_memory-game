import { useState } from "react";

export function useGameSettings() {
  const [gameSettings, setGameSettings] = useState({
    theme: 'numbers',
    gridSize: 16,
  });


  function updateGameSettings(key, prop) {
    const newSettings = { ...gameSettings, [key]: prop };
    setGameSettings(newSettings);

    // Reset gameboard with new settings
    // const newNumberValues = [...Array(newSettings.gridSize / 2).fill(1)].map(
    //   (x, i) => x + i,
    // );
    // const newIconValues = getIcons().slice(0, newSettings.gridSize / 2);
    // const newGameboardValues =
    //   newSettings.theme === 'numbers' ? newNumberValues : newIconValues;

    // setGameboard(setGameboardValues(newGameboardValues));
  }


  return {gameSettings, updateGameSettings}
}
