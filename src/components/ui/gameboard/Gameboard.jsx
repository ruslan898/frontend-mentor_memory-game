import clsx from 'clsx';
import GameboardItem from '../gameboardItem/GameboardItem';
import './gameboard.scss';

export default function Gameboard({ size = 16, className }) {
  const classes = clsx('gameboard', `gameboard-${size}`, className);
  const gameboard = new Array(size).fill('');
  const gridItems = gameboard.map(() => <GameboardItem />);

  if (size !== 16 && size !== 36) {
    throw new Error('Invalid gameboard size')
  }

  return <div className={classes}>{gridItems}</div>;
}
