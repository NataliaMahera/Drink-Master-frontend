// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import DrinkPageHero from 'components/DrinkPageHero/DrinkPageHero';
// import DrinkIngredientsList from 'components/DrinkIngredientsList/DrinkIngredientsList';
// import RecipePreparation from 'components/RecipePreparation/RecipePreparation';
// import Loader from 'components/Loader/Loader.jsx';

// import {
//   selectGetCurrentCocktail,
//   selectIsLoading,
// } from '../../redux/drinkIdStorageReducer/drinkIdStorageReducer.selectors';
// import { fetchCocktailsById } from '../../redux/drinkIdStorageReducer/services/drinkIdServices';
// import { selectAuthError } from '../../redux/auth/authSelectors.js';
// import { mapIngredientsOfCocktail } from 'helpers/createIngredientsCollection.js';
// import { scrollToTop } from 'helpers/scrollToTop.js';
// import { useFilters } from 'hooks/useFilters.js';
// import { useGetCocktailForIdQuery } from '../../redux/drinkIdStorageReducer/drinkIdStorageReducer.js';
// import { useEffect } from 'react';
// import ScrollBtn from '../../components/reUseComponents/Buttons/ScrollBtn.jsx/ScrollBtn.jsx';

// const DrinkPage = () => {
//   const { drinkId } = useParams();
//   const { data, isLoading } = useGetCocktailForIdQuery(drinkId);
//   const isError = useSelector(selectAuthError);
//   const { ingredients } = useFilters();

//   const ingIds = mapIngredientsOfCocktail(data);

//   const ingredByFilter =
//     ingredients &&
//     ingredients.filter((ingr) =>
//       ingIds.find(({ ingredientId }) => ingredientId === ingr._id)
//     );

//   const mergedIngred = ingredByFilter.map((ingredient) => {
//     const correspondingMeasure = ingIds.find(
//       (item) => item.ingredientId === ingredient._id
//     );
//     const measure = correspondingMeasure
//       ? correspondingMeasure.measure
//       : 'Unknown';
//     return {
//       ...ingredient,
//       measure: measure,
//     };
//   });

//   useEffect(() => {
//     scrollToTop();
//   }, []);

//   return (
//     <section className="py-[80px] md:py-[140px] lg:pt-[132px]">
//       {isLoading && <Loader isStatic />}
//       {isError && <h1>{isError}</h1>}
//       {data && (
//         <div className="container mx-auto ">
//           <DrinkPageHero cocktail={data} />
//           <DrinkIngredientsList ingredients={mergedIngred} />
//           <RecipePreparation description={data} />
//           <ScrollBtn />
//         </div>
//       )}
//     </section>
//   );
// };

// export default DrinkPage;


import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'components/Loader/Loader.jsx';

import {
  selectGetCurrentCocktail,
  selectIsLoading,
} from '../../redux/drinkIdStorageReducer/drinkIdStorageReducer.selectors';
import { fetchCocktailsById } from '../../redux/drinkIdStorageReducer/services/drinkIdServices';
import { selectAuthError } from '../../redux/auth/authSelectors.js';
import { mapIngredientsOfCocktail } from 'helpers/createIngredientsCollection.js';
import { scrollToTop } from 'helpers/scrollToTop.js';
import { useFilters } from 'hooks/useFilters.js';
import DrinkIngredientsList from '../../components/DrinkId/DrinkIngredientsList.jsx';
import RecipePreparation from '../../components/DrinkId/RecipePreparation.jsx';
import DrinkPageHero from '../../components/DrinkId/DrinkPageHero.jsx';

const DrinkPage = () => {
  const currentCocktail = useSelector(selectGetCurrentCocktail);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const { drinkId } = useParams();
  const { ingredients } = useFilters();

  const ingIds = mapIngredientsOfCocktail(currentCocktail);

  const ingredByFilter =
    ingredients &&
    ingredients.filter((ingr) =>
      ingIds.find(({ ingredientId }) => ingredientId === ingr._id)
    );

    const mergedIngred = ingredByFilter.map((ingredient) => {
      const correspondingMeasure = ingIds.find(
        (item) => item.ingredientId === ingredient._id
      );
      const measure = correspondingMeasure
        ? correspondingMeasure.measure
        : 'Unknown';
      return {
        ...ingredient,
        measure: measure,
      };
    });

  useEffect(() => {
    dispatch(fetchCocktailsById(drinkId));
    scrollToTop();
  }, [drinkId, dispatch]);

  return (
    <section className="py-[80px] md:py-[140px] lg:pt-[132px]">
      {isLoading && <Loader isStatic />}
      {isError && <h1>{isError}</h1>}
      {currentCocktail && (
        <div className="container mx-auto ">
          <DrinkPageHero cocktail={currentCocktail} />
          <DrinkIngredientsList
            ingredients={mergedIngred}
            
          />
          <RecipePreparation description={currentCocktail} />
        </div>
      )}
    </section>
  );
};

export default DrinkPage;
