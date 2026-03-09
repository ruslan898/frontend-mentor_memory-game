import clsx from 'clsx';
import './gameboardItem.scss';

export default function GameboardItem({ info, ...props }) {
  const { value, active, guessed } = info;

  const classes = clsx({
    'gameboard-item': true,
    active: active,
    guessed: guessed,
  });

  return (
    <div className={classes} {...props}>
      {(active || guessed) && value}
    </div>
  );
}
