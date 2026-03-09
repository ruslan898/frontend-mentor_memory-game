import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { getIcons } from '../utility/getIcons';
import Menubar from './ui/menubar/Menubar';
import Gameboard from './ui/gameboard/Gameboard';
import Stats from './ui/stats/Stats';
import ResultCard from './ui/resultCard/ResultCard';
import StartCard from './ui/startCard/StartCard';
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

  const { theme, gridSize } = gameSettings;

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
    if (!gameStarted || gameOver) {
      return;
    }

    const timer = setInterval(() => {
      setGameStats((prevVal) => ({ ...prevVal, time: prevVal.time + 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);
  // =========================================================================


  console.log(gameboard);

  return (
    <AppContext.Provider
      value={{
        gameSettings,
        updateGameSettings,
        setGameStarted,
        setPlayersCount,
        playersCount: players.length,
        setGameOver,
        gameboard,
        setGameboard,
        resetGame,
        gameStats,
        setGameStats,
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
        {gameOver && <ResultCard />}
      </main>
    </AppContext.Provider>
  );
}
