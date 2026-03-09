import clsx from 'clsx';
import './button.scss';

export default function Button({
  variant = 'primary',
  className,
  children,
  active,
  ...props
}) {
  const classes = clsx('btn', `btn-${variant}`, active && 'active', className);

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
