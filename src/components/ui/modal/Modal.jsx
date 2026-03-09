import { useContext } from 'react';
import clsx from 'clsx';
import StatsItem from '../statsItem/StatsItem';
import Button from '../button/Button';
import { AppContext } from '../../context/AppContext';
import './modal.scss';

export default function Modal({ variant = 'start' }) {
  const {
    updateGameSettings,
    gameSettings,
    setGameStarted,
    setPlayersCount,
    playersCount,
    resetGame,
    gameStats,
  } = useContext(AppContext);

  const { theme, gridSize } = gameSettings;
  const { time, moves } = gameStats;

  const classes = clsx('modal', `modal-${variant}`);

  if (variant === 'start') {
    return (
      <div className={classes}>
        <div className="selection">
          <div className="selection-item">
            <h2 className="selection-title">Select Theme</h2>
            <div className="selection-btns">
              <Button
                variant="selection"
                onClick={() => updateGameSettings('theme', 'numbers')}
                active={theme === 'numbers'}
              >
                Numbers
              </Button>
              <Button
                variant="selection"
                onClick={() => updateGameSettings('theme', 'icons')}
                active={theme === 'icons'}
              >
                Icons
              </Button>
            </div>
          </div>
          <div className="selection-item">
            <h2 className="selection-title">Numbers of Players</h2>
            <div className="selection-btns players">
              <Button
                variant="selection"
                onClick={() => setPlayersCount(1)}
                active={playersCount === 1}
              >
                1
              </Button>
              <Button
                variant="selection"
                onClick={() => setPlayersCount(2)}
                active={playersCount === 2}
              >
                2
              </Button>
              <Button
                variant="selection"
                onClick={() => setPlayersCount(3)}
                active={playersCount === 3}
              >
                3
              </Button>
              <Button
                variant="selection"
                onClick={() => setPlayersCount(4)}
                active={playersCount === 4}
              >
                4
              </Button>
            </div>
          </div>
          <div className="selection-item">
            <h2 className="selection-title">Grid Size</h2>
            <div className="selection-btns">
              <Button
                variant="selection"
                onClick={() => updateGameSettings('gridSize', 16)}
                active={gridSize === 16}
              >
                4x4
              </Button>
              <Button
                variant="selection"
                onClick={() => updateGameSettings('gridSize', 36)}
                active={gridSize === 36}
              >
                6x6
              </Button>
            </div>
          </div>
        </div>
        <Button variant="big" onClick={() => setGameStarted(true)}>
          Start Game
        </Button>
      </div>
    );
  }

  if (variant === 'result-solo') {
    return (
      <div className={classes}>
        <div className="modal-result-header">
          <h2 className="modal-result-title">You did it!</h2>
          <p className="modal-result-subtitle">
            Game over! Here’s how you got on…
          </p>
        </div>
        <div className="modal-result-stats">
          <StatsItem title="Time Elapsed" value={time} variant="modal" />
          <StatsItem
            title="Moves Taken"
            value={`${moves} Moves`}
            variant="modal"
          />
        </div>
        <div className="modal-btns">
          <Button variant="primary" onClick={() => resetGame('restart')}>
            Restart
          </Button>
          <Button variant="secondary" onClick={() => resetGame('new-game')}>
            Setup New Game
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'menu') {
    return (
      <div className={classes}>
        <Button variant="primary" onClick={() => resetGame('restart')}>
          Restart
        </Button>
        <Button variant="secondary" onClick={() => resetGame('new-game')}>
          New Game
        </Button>
        <Button variant="secondary">Resume Game</Button>
      </div>
    );
  }

  throw new Error('Invalid modal variant');
}
