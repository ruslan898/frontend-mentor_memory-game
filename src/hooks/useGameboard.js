import { useState, useCallback, useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { getIcons } from '../utility/getIcons';

export function useGameboard(gameSettings) {
  const { theme, gridSize } = gameSettings;

  function shuffleArr(arr) {
    const shuffledArr = [...arr];

    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }

    return shuffledArr;
  }

  const setGameboardValues = useCallback((valuesArr) => {
    return [...shuffleArr(valuesArr), ...shuffleArr(valuesArr)].map((item) => ({
      id: nanoid(),
      value: item,
      active: false,
      guessed: false,
    }));
  }, []);

  const gameboardValues = useMemo(() => {
    const numberValues = [...Array(gridSize / 2).fill(1)].map((x, i) => x + i);
    const iconValues = getIcons().slice(0, gridSize / 2);

    return theme === 'numbers' ? numberValues : iconValues;
  }, [theme, gridSize]);

  const [gameboard, setGameboard] = useState(() =>
    setGameboardValues(gameboardValues),
  );

  useEffect(() => {
    setGameboard(setGameboardValues(gameboardValues));
  }, [gameboardValues, setGameboardValues]);

  return { gameboard, setGameboard, setGameboardValues, gameboardValues };
}
