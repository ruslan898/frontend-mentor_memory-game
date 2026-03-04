import clsx from 'clsx';
import StatsItem from '../statsItem/StatsItem';
import './stats.scss';

export default function Stats({ variant = 'solo' }) {
  const classes = clsx('stats', `stats-${variant}`);

  if (variant === 'mult') {
    return (
      <div className={classes}>
        <StatsItem title="P1" value="0" />
        <StatsItem title="P2" value="0" />
        <StatsItem title="P3" value="0" />
        <StatsItem title="P4" value="0" />
      </div>
    );
  }

  return (
    <div className={classes}>
      <StatsItem title="Time" value="0:01" />
      <StatsItem title="Moves" value="0" />
    </div>
  );
}
