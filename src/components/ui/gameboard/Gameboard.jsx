import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import GameboardItem from '../gameboardItem/GameboardItem';
import { AppContext } from '../../context/AppContext';
import './gameboard.scss';

export default function Gameboard({ className }) {
  const {
    gameSettings,
    gameboard,
    setGameboard,
    setGameStats,
    changeActivePlayer,
    incrementScore,
  } = useContext(AppContext);
  const { gridSize } = gameSettings;

  const [activeChars, setActiveChars] = useState([]);

  useEffect(() => {
    if (activeChars.length !== 2) {
      return;
    }

    const [firstChar, secondChar] = activeChars;
    const isMatch = firstChar.value === secondChar.value;

    const timeoutId = setTimeout(() => {
      setGameboard((prevVal) =>
        prevVal.map((obj) => {
          if (obj.id === firstChar.id || obj.id === secondChar.id) {
            return {
              ...obj,
              active: false,
              guessed: isMatch ? true : obj.guessed,
            };
          }

          return obj;
        }),
      );

      setActiveChars([]);
      setGameStats((prevVal) => ({ ...prevVal, moves: prevVal.moves + 1 }));
      if (isMatch) {
        incrementScore();
      } else {
        changeActivePlayer();
      }
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [
    activeChars,
    setGameboard,
    setGameStats,
    changeActivePlayer,
    incrementScore,
  ]);

  function guessChar(id) {
    const guessedChar = gameboard.find((obj) => obj.id === id);
    if (!guessedChar || guessedChar.guessed || guessedChar.active) {
      return;
    }

    if (activeChars.length < 2) {
      setActiveChars((prevVal) => {
        if (prevVal.length >= 2 || prevVal.some((char) => char.id === id)) {
          return prevVal;
        }

        return [...prevVal, guessedChar];
      });

      setGameboard((prevVal) =>
        prevVal.map((obj) => {
          if (obj.id === id) {
            return { ...obj, active: true };
          } else {
            return obj;
          }
        }),
      );
    }
  }

  const gridItems = gameboard.map((obj) => (
    <GameboardItem info={obj} onClick={() => guessChar(obj.id)} key={obj.id} />
  ));

  const classes = clsx('gameboard', `gameboard-${gridSize}`, className);

  return <div className={classes}>{gridItems}</div>;
}
