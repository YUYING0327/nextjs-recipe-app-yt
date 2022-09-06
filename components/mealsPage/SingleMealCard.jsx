import Image from 'next/image';
import Link from 'next/link';
import classes from './SingleMealCard.module.scss';
import Title from '../text/Title';

function SingleMealCard({ meal }) {
  return (
    <Link href={`/meals/${meal.idMeal}`}>
      <a className={classes.item}>
        <Image src={meal.strMealThumb} height="200" width="200" />
        <Title className={classes.title} variant="secondary">
          {meal.strMeal}
        </Title>
      </a>
    </Link>
  );
}

export default SingleMealCard;
