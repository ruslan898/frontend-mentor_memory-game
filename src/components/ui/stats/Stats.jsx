import { useContext } from 'react';
import clsx from 'clsx';
import { AppContext } from '../../context/AppContext';
import { formatTime } from '../../../utility/formatTime';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import StatsItem from '../statsItem/StatsItem';
import './stats.scss';

export default function Stats() {
  const { gameStats, players, activePlayerIndex } = useContext(AppContext);
  const { time, moves } = gameStats;

  const isMult = players.length > 1;
  const variant = !isMult ? 'solo' : 'mult';

  const classes = clsx('stats', `stats-${variant}`);

  const windowWidth = useWindowWidth();

  if (variant === 'mult') {
    return (
      <div className={classes}>
        {players.map((item, index) => {
          const { name, score } = item;

          return (
            <StatsItem
              title={
                windowWidth < 768
                  ? `${name[0]}${name[name.length - 1]}`
                  : `${name} `
              }
              value={score}
              active={index === activePlayerIndex}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={classes}>
      <StatsItem title="Time" value={formatTime(time)} />
      <StatsItem title="Moves" value={moves} variant={variant} />
    </div>
  );
}
