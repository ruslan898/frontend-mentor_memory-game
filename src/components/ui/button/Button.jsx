import clsx from 'clsx';
import './button.scss';

export default function Button({ variant = 'primary', className, children }) {
  const classes = clsx('btn', `btn-${variant}`, className);

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
