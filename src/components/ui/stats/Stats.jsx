import { useContext } from 'react';
import clsx from 'clsx';
import { AppContext } from '../../context/AppContext';
import StatsItem from '../statsItem/StatsItem';
import './stats.scss';

export default function Stats({ variant = 'solo' }) {
  const { gameStats } = useContext(AppContext);
  const { time, moves } = gameStats;

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

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
      <StatsItem title="Time" value={formatTime(time)} />
      <StatsItem title="Moves" value={moves} />
    </div>
  );
}
