import { useState, useEffect } from 'react';
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
  const [gameOver, setGameOver] = useState(false);
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

  console.log(activePlayerIndex);

  function changeActivePlayer() {
    setActivePlayerIndex((prevVal) => {
      if (prevVal === players.length - 1) {
        return 0;
      } else {
        return prevVal + 1;
      }
    });
  }

  function incrementScore() {
    const index = activePlayerIndex;

    setPlayers((prevVal) =>
      prevVal.map((item, i) => {
        return i === index ? { ...item, score: item.score++ } : { ...item };
      }),
    );
  }

  function setPlayersCount(count) {
    setPlayers(
      [...new Array(count)].map((item, index) => ({
        name: `Player ${index + 1}`,
        score: 0,
      })),
    );
  }

  function updateGameSettings(key, prop) {
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
  }

  const numberValues = [...Array(gameSettings.gridSize / 2).fill(1)].map(
    (x, i) => x + i,
  );

  const iconValues = getIcons().slice(0, gridSize / 2);

  const gameboardValues = theme === 'numbers' ? numberValues : iconValues;

  function shuffleArr(arr) {
    const shuffledArr = [...arr];

    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }

    return shuffledArr;
  }

  function initGameboard(valuesArr) {
    return [...shuffleArr(valuesArr), ...shuffleArr(valuesArr)].map((item) => ({
      id: nanoid(),
      value: item,
      active: false,
      guessed: false,
    }));
  }

  function resetGame(type) {
    setGameOver(false);
    if (type === 'restart') {
      setGameboard(initGameboard(gameboardValues));
    }

    if (type === 'new-game') {
      setGameStarted(false);
    }

    setGameStats({
      time: 0,
      moves: 0,
    });

    setPlayers((prevVal) => prevVal.map((player) => ({ ...player, score: 0 })));

    setActivePlayerIndex(0);
  }

  const [gameboard, setGameboard] = useState(() =>
    initGameboard(gameboardValues),
  );

  // =========================================================================
  useEffect(() => {
    const isGameOver =
      gameboard.length > 0 && gameboard.every((obj) => obj.guessed === true);
    setGameOver(isGameOver);
  }, [gameboard]);

  useEffect(() => {
    if (!gameStarted || gameOver || players.length > 1) {
      return;
    }

    const timer = setInterval(() => {
      setGameStats((prevVal) => ({ ...prevVal, time: prevVal.time + 1 }));
    }, 1000);

    if (paused) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, paused]);
  // =========================================================================

  console.log(gameboard);

  return (
    <AppContext.Provider
      value={{
        gameSettings,
        updateGameSettings,
        setGameStarted,
        setPlayersCount,
        players,
        setGameOver,
        gameboard,
        setGameboard,
        resetGame,
        gameStats,
        setGameStats,
        setPaused,
        activePlayerIndex,
        changeActivePlayer,
        incrementScore,
      }}
    >
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
        {gameOver && (
          <ResultCard
            variant={`result-${players.length === 1 ? 'solo' : 'mult'}`}
          />
        )}
        {paused && <PauseMenu />}
      </main>
    </AppContext.Provider>
  );
}
