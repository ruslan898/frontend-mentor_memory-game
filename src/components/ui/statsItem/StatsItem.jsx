import clsx from 'clsx';
import './statsItem.scss';

export default function StatsItem({ title, value, variant, active, winner }) {
  const classes = clsx(
    'stats-item',
    variant && `stats-item-${variant}`,
    active && 'active',
    winner && 'winner',
  );
  return (
    <div className={classes}>
      <h3 className="stats-item-title">
        {title} {winner && '(Winner!)'}
      </h3>
      <span className="stats-item-value">{value}</span>
    </div>
  );
}
