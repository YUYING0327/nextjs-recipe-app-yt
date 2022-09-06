import clsx from 'clsx';
import classes from './PointText.module.scss';
import Text from './Text';

function PointText({ className, children }) {
  return (
    <div className={clsx(classes.pointText, className)}>
      <div className={classes.circle} />
      <Text>{children}</Text>
    </div>
  );
}

export default PointText;
