import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import PointText from '../components/text/PointText';
import Text from '../components/text/Text';
import Title from '../components/text/Title';
import { getSingleMeal } from './meals/[id]';
import classes from './savedMeals.module.scss';

function SavedMeals() {
  const [savedMealsId, setSavedMealsId] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      setSavedMealsId(JSON.parse(localStorage.getItem('savedMeals')));
    }
  }, []);

  const queries = savedMealsId.map((id) => ({
    queryKey: ['singleMeal', id],
    queryFn: getSingleMeal,
  }));

  const result = useQueries({ queries });

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>
        My Saved Meal List
      </Title>
      <div className={classes.list_container}>
        {savedMealsId.length <= 0 && <Text>You have no saved meals</Text>}
        {result && result.map(({ data, isLoading }, index) => {
          if (isLoading) {
            return (
              <BeatLoader color="#fff" key={savedMealsId[index]} />
            );
          }
          return (
            <Link href={`/meals/${data.idMeal}`} key={data.idMeal}>
              <a className={classes.singleMeal}>
                <Title variant="secondary" className={classes.mealTitle}>
                  {data.strMeal}
                </Title>
                <PointText>
                  Category:
                  {' '}
                  {data.strCategory}
                </PointText>
                <PointText>
                  Area:
                  {' '}
                  {data.strArea}
                </PointText>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SavedMeals;
