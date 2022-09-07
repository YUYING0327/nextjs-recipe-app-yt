import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeartBroken, FaHeart } from 'react-icons/fa';
import classes from './meals.module.scss';
import Text from '../../components/text/Text';
import Title from '../../components/text/Title';
import PointText from '../../components/text/PointText';
import IngredientsTable from '../../components/mealsPage/IngredientsTable';
import { Button } from '../../components/buttons/Button';

export const getSingleMeal = async ({ queryKey }) => {
  const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.meals?.[0];
};

function SingleMealPage() {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    data, isLoading, isError, error,
  } = useQuery(['signleMeal', id], getSingleMeal);

  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
      if (savedMeals.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    } else {
      localStorage.setItem('savedMeals', JSON.stringify([]));
    }
  }, [id]);

  if (isError) {
    return (
      <Text>
        Error:
        {' '}
        {error.message}
      </Text>
    );
  }

  if (isLoading || !data) {
    return <BeatLoader color="#fff" />;
  }

  const ingredients = Object.keys(data)
    .filter((key) => key.startsWith('strIngredient'))
    .filter((key) => data[key] !== '' && data[key] !== null);

  const ingredientsWithMeasures = ingredients.map((key, index) => (
    {
      index: index + 1,
      ingredient: data[key],
      measure: data[`strMeasure${index + 1}`],
    }
  ));

  const handleSaveButtonClick = () => {
    const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
    if (!isSaved) {
      savedMeals.push(data.idMeal);
      localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
      toast.success('Meal Saved Successfully');
      setIsSaved(true);
    } else {
      savedMeals.splice(savedMeals.indexOf(data.idMeal), 1);
      localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
      setIsSaved(false);
      toast.error('Meal Removed Successfully');
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.topContainer}>
        <div className={classes.img}>
          <Image src={data.strMealThumb} height={300} width={300} />
        </div>
        <div className={classes.info}>
          <Title variant="primary">{data.strMeal}</Title>
          <PointText className={classes.info}>
            Category:
            {' '}
            {data.strCategory}
          </PointText>
          <PointText className={classes.info}>
            Area:
            {' '}
            {data.strArea}
          </PointText>
          <PointText className={classes.info}>
            Tags:
            {' '}
            {data?.strTags?.split(',').join(', ')}
          </PointText>
          {isSaved && (
            <Text className={classes.greenText}>You already saved the meal.</Text>
          )}
          <Button
            variant="primary"
            className={classes.saveButton}
            onClick={handleSaveButtonClick}
          >
            {isSaved ? (
              <>
                <FaHeartBroken />
                {' '}
                Remove
              </>
            ) : (
              <>
                <FaHeart className={classes.saveIcon} />
                {' '}
                Save
              </>
            )}
          </Button>
        </div>
      </div>
      <div className={classes.ingredientsTable}>
        <IngredientsTable ingredientsWithMeasures={ingredientsWithMeasures} />
      </div>
      <div className={classes.instructions}>
        <Title>Instructions</Title>
        {data.strInstructions
          .split('.')
          .filter((sentence) => sentence !== '')
          .map((sentence) => (
            <PointText key={sentence}>
              {sentence}
              .
            </PointText>
          ))}
      </div>
    </div>
  );
}

export default SingleMealPage;
