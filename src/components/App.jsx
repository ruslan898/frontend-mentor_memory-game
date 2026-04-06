import { useState, useEffect, useMemo, useCallback } from 'react';
import Menubar from './ui/menubar/Menubar';
import Gameboard from './ui/gameboard/Gameboard';
import Stats from './ui/stats/Stats';
import ResultCard from './ui/resultCard/ResultCard';
import StartCard from './ui/startCard/StartCard';
import PauseMenu from './ui/pauseMenu/PauseMenu';
import { AppContext } from './context/AppContext';
import { useGameboard } from '../hooks/useGameboard';
import { useGameSettings } from '../hooks/useGameSettings';
import './app.scss';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
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
  const [hasFlippedTile, setHasFlippedTile] = useState(false);

  const { gameSettings, updateGameSettings } = useGameSettings();
  const { gameboard, setGameboard, setGameboardValues, gameboardValues } =
    useGameboard(gameSettings);

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

  const gameOver = useMemo(() => {
    return (
      gameStarted &&
      gameboard.length > 0 &&
      gameboard.every((tile) => tile.guessed)
    );
  }, [gameStarted, gameboard]);

  const resetGame = useCallback(
    (type) => {
      if (type === 'restart') {
        setGameboard(setGameboardValues(gameboardValues));
      }

      if (type === 'new-game') {
        setGameboard(setGameboardValues(gameboardValues));
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

      setHasFlippedTile(false);
    },
    [gameboardValues, setGameboardValues, setGameboard],
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
      hasFlippedTile,
      setHasFlippedTile,
    }),
    [
      gameSettings,
      updateGameSettings,
      setPlayersCount,
      players,
      gameboard,
      setGameboard,
      resetGame,
      gameStats,
      activePlayerIndex,
      changeActivePlayer,
      incrementScore,
      hasFlippedTile,
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
