import { BeatLoader } from 'react-spinners';
import classes from './Categories.module.scss';
import CategoryItem from './CategoryItem';

function Categories({
  categories,
  categoriesIsLoading,
  categoriesIsError,
  selectedCategory,
  setSelectedCategory,
  setQuery,
}) {
  if (categoriesIsError) {
    return ('Error');
  }
  if (categoriesIsLoading) {
    return <BeatLoader loading={categoriesIsLoading} color="#fff" />;
  }
  return (
    <div className={classes.categories__container}>
      {categories.map((item) => (
        <CategoryItem
          key={item.idCategory}
          category={item}
          selectedCategory={selectedCategory}
          onClickHandler={() => {
            setSelectedCategory(item.strCategory);
            setQuery('');
          }}
        />
      ))}
    </div>
  );
}

export default Categories;
