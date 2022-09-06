import clsx from 'clsx';
import classes from './Text.module.scss';

function Text({ children, className }) {
  return (
    <p className={clsx(classes.text, className)}>{children}</p>
  );
}

export default Text;
