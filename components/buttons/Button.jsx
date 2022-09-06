import clsx from 'clsx';
import Link from 'next/link';
import classes from './Button.module.scss';

function ButtonWithLink({ link = '/', children, variant = 'secondary' }) {
  return (
    <Link href={link}>
      <a
        type="button"
        className={clsx(classes.button, classes[`variant__${variant}`])}
      >
        {children}
      </a>
    </Link>
  );
}

function Button({ children, variant = 'secondary' }) {
  return (
    <button
      type="button"
      className={clsx(classes.button, classes[`variant__${variant}`])}
    >
      {children}
    </button>
  );
}

export default ButtonWithLink;
export { Button };
