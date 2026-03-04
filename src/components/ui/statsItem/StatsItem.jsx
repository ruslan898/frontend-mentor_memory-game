import clsx from 'clsx';
import './statsItem.scss';

export default function StatsItem({ title, value, variant }) {
  const classes = clsx('stats-item', variant && `stats-item-${variant}`);

  return (
    <div className={classes}>
      <h3 className="stats-item-title">{title}</h3>
      <span className="stats-item-value">{value}</span>
    </div>
  );
}
