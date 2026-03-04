import clsx from 'clsx';
import StatsItem from '../statsItem/StatsItem';
import Button from '../button/Button';
import './modal.scss';

export default function Modal({ variant = 'start' }) {
  const classes = clsx('modal', `modal-${variant}`);

  if (variant === 'start') {
    return (
      <div className={classes}>
        <div className="selection">
          <div className="selection-item">
            <h2 className="selection-title">Select Theme</h2>
            <div className="selection-btns">
              <Button variant="selection">Numbers</Button>
              <Button variant="selection">Icons</Button>
            </div>
          </div>
          <div className="selection-item">
            <h2 className="selection-title">Numbers of Players</h2>
            <div className="selection-btns players">
              <Button variant="selection">1</Button>
              <Button variant="selection">2</Button>
              <Button variant="selection">3</Button>
              <Button variant="selection">4</Button>
            </div>
          </div>
          <div className="selection-item">
            <h2 className="selection-title">Grid Size</h2>
            <div className="selection-btns">
              <Button variant="selection">4x4</Button>
              <Button variant="selection">6x6</Button>
            </div>
          </div>
        </div>
        <Button variant="big">Start Game</Button>
      </div>
    );
  }

  if (variant === 'result-solo' || variant === 'result-mult') {
    return (
      <div className={classes}>
        <div className="modal-result-header">
          <h2 className="modal-result-title">You did it!</h2>
          <p className="modal-result-subtitle">
            Game over! Here’s how you got on…
          </p>
        </div>
        <div className="modal-result-stats">
          <StatsItem title="Time Elapsed" value="1:53" variant="modal" />
          <StatsItem title="Moves Taken" value="39 Moves" variant="modal" />
        </div>
        <div className="modal-btns">
          <Button variant="primary">Restart</Button>
          <Button variant="secondary">Setup New Game</Button>
        </div>
      </div>
    );
  }

  if (variant === 'menu') {
    return (
      <div className={classes}>
        <Button variant="primary">Restart</Button>
        <Button variant="secondary">New Game</Button>
        <Button variant="secondary">Resume Game</Button>
      </div>
    );
  }

  throw new Error('Invalid modal variant');
}
