import { useState, useEffect, useMemo, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { getIcons } from '../utility/getIcons';
import Menubar from './ui/menubar/Menubar';
import Gameboard from './ui/gameboard/Gameboard';
import Stats from './ui/stats/Stats';
import ResultCard from './ui/resultCard/ResultCard';
import StartCard from './ui/startCard/StartCard';
import PauseMenu from './ui/pauseMenu/PauseMenu';
import { AppContext } from './context/AppContext';
import './app.scss';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState({
    theme: 'numbers',
    gridSize: 16,
  });
  const [gameStats, setGameStats] = useState({
    time: 0,
    moves: 0,
  });
  const [players, setPlayers] = useState(
    [...new Array(1)].map((item, index) => ({
      name: `Player ${index + 1}`,
      score: 0,
    })),
  );
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const { theme, gridSize } = gameSettings;

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
        return i === index ? { ...item, score: item.score + 1 } : { ...item };
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

  function shuffleArr(arr) {
    const shuffledArr = [...arr];

    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }

    return shuffledArr;
  }

  const initGameboard = useCallback((valuesArr) => {
    return [...shuffleArr(valuesArr), ...shuffleArr(valuesArr)].map((item) => ({
      id: nanoid(),
      value: item,
      active: false,
      guessed: false,
    }));
  }, []);

  const numberValues = [...Array(gameSettings.gridSize / 2).fill(1)].map(
    (x, i) => x + i,
  );

  const iconValues = getIcons().slice(0, gridSize / 2);

  const gameboardValues = theme === 'numbers' ? numberValues : iconValues;

  const [gameboard, setGameboard] = useState(() =>
    initGameboard(gameboardValues),
  );

  const gameOver = useMemo(() => {
    return (
      gameStarted &&
      gameboard.length > 0 &&
      gameboard.every((tile) => tile.guessed)
    );
  }, [gameStarted, gameboard]);

  const hasFlippedTile = useMemo(() => {
    return gameboard.some((tile) => tile.active || tile.guessed);
  }, [gameboard]);

  const updateGameSettings = useCallback(
    (key, prop) => {
      const newSettings = { ...gameSettings, [key]: prop };
      setGameSettings(newSettings);

      // Reset gameboard with new settings
      const newNumberValues = [...Array(newSettings.gridSize / 2).fill(1)].map(
        (x, i) => x + i,
      );
      const newIconValues = getIcons().slice(0, newSettings.gridSize / 2);
      const newGameboardValues =
        newSettings.theme === 'numbers' ? newNumberValues : newIconValues;

      setGameboard(initGameboard(newGameboardValues));
    },
    [gameSettings, initGameboard],
  );

  const resetGame = useCallback(
    (type) => {
      if (type === 'restart') {
        setGameboard(initGameboard(gameboardValues));
      }

      if (type === 'new-game') {
        setGameboard(initGameboard(gameboardValues));
        setGameStarted(false);
      }

      setGameStats({
        time: 0,
        moves: 0,
      });

      setPlayers((prevVal) =>
        prevVal.map((player) => ({ ...player, score: 0 })),
      );

      setActivePlayerIndex(0);
    },
    [gameboardValues, initGameboard],
  );

  // =========================================================================
  useEffect(() => {
    if (!gameStarted || gameOver || players.length > 1 || !hasFlippedTile) {
      return;
    }

    const timer = setInterval(() => {
      setGameStats((prevVal) => ({ ...prevVal, time: prevVal.time + 1 }));
    }, 1000);

    if (paused) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, paused, players.length, hasFlippedTile]);
  // =========================================================================

  const contextValue = useMemo(
    () => ({
      gameSettings,
      updateGameSettings,
      setGameStarted,
      setPlayersCount,
      players,
      gameboard,
      setGameboard,
      resetGame,
      gameStats,
      setGameStats,
      setPaused,
      activePlayerIndex,
      changeActivePlayer,
      incrementScore,
    }),
    [
      gameSettings,
      updateGameSettings,
      setPlayersCount,
      players,
      gameboard,
      resetGame,
      gameStats,
      activePlayerIndex,
      changeActivePlayer,
      incrementScore,
    ],
  );

  return (
    <AppContext.Provider value={contextValue}>
      <main className="app">
        {gameStarted ? (
          <div className="app-wrapper">
            <Menubar />
            <div className="game-wrapper">
              <Gameboard />
              <Stats />
            </div>
          </div>
        ) : (
          <StartCard />
        )}
        {gameStarted && gameOver && (
          <ResultCard
            variant={`result-${players.length === 1 ? 'solo' : 'mult'}`}
          />
        )}
        {paused && <PauseMenu />}
      </main>
    </AppContext.Provider>
  );
}
