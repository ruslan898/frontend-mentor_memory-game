import { useState, useCallback } from 'react';

export function usePlayers() {
  const [players, setPlayers] = useState(
    [...new Array(1)].map((item, index) => ({
      name: `Player ${index + 1}`,
      score: 0,
    })),
  );
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  const changeActivePlayer = useCallback(() => {
    setActivePlayerIndex((prevVal) => {
      if (prevVal === players.length - 1) {
        return 0;
      } else {
        return prevVal + 1;
      }
    });
  }, [players.length]);


  const incrementScore = useCallback(() => {
    const index = activePlayerIndex;
    setPlayers((prevVal) =>
      prevVal.map((item, i) => {
        return i === index ? { ...item, score: item.score + 1 } : item;
      }),
    );
  }, [activePlayerIndex]);

  const setPlayersCount = useCallback((count) => {
    setPlayers(
      [...new Array(count)].map((item, index) => ({
        name: `Player ${index + 1}`,
        score: 0,
      })),
    );
  }, []);

  return {
    players,
    setPlayers,
    setPlayersCount,
    activePlayerIndex,
    setActivePlayerIndex,
    changeActivePlayer,
    incrementScore,
  };
}
