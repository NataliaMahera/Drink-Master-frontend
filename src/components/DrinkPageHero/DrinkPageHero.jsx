import { useSelector } from 'react-redux';
import {
  useAddFavoritesMutation,
  useRemoveFavoritesMutation,
} from '../../redux/favorites/favoriteSlice';
import { selectAuthUser } from '../../redux/auth/authSelectors';
import { useState } from 'react';
import { ButtonComponent } from '../reUseComponents/ButtonComponent';
import { toast } from 'react-toastify';

const DrinkPageHero = ({ cocktail }) => {
  const user = useSelector(selectAuthUser);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [addToFavorite] = useAddFavoritesMutation();

  const [deleteFavorite] = useRemoveFavoritesMutation();

  const { _id, drink, category, alcoholic, description, drinkThumb, favorite } =
    cocktail;

  const isFavoriteFirstRender = favorite?.includes(user.id);
  const [isFavorite, setIsFavorite] = useState(isFavoriteFirstRender);
  const isFav = isFirstRender ? isFavoriteFirstRender : isFavorite;

  const toggleFavorite = async (id) => {
    try {
      if (isFav) {
        await deleteFavorite(id);
        setIsFavorite(false);
      } else {
        await addToFavorite(id);
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsFirstRender(false);
    }
  };

  return (
    <div className=" lg:flex justify-between">
      <div>
        <h2 className="mb-[8px] font-semibold text-[32px] leading-[1.19] text-gray-100 md:font-semibold md:text-[57px] md:leading-[1.07] lg:text-[64px] lg:leading-[1.06]">
          {drink}
        </h2>
        <p className="text-[12px] leading-[1.17] text-grey-text-color mb-[20px] md:text-[16px] md:leading-[1.25]">
          {category}/{alcoholic}
        </p>
        <p className="text-[14px] leading-[1.29] mb-[40px] text-gray-100 md:text-[16px] md:leading-[1.37] md:max-w-[593px]">
          {description}
        </p>
        <div className="pt-10 pb-20">
          {isFav ? (
            <ButtonComponent
              descr={'Remove from favorites'}
              btnFunction={() => {
                toggleFavorite(_id);
                toast('Drink removed from favorites !');
              }}
              id={_id}
            />
          ) : (
            <ButtonComponent
              descr={'Add to favorite drinks'}
              btnFunction={() => {
                toggleFavorite(_id);
                toast('Drink added to favorites !');
              }}
              id={_id}
            />
          )}
        </div>
      </div>
      <div>
        <img
          className="mb-[18px] w-[335px] rounded-xl md:mb-[80px] md:w-[704px] md:object-cover lg:w-[400px] lg:mb-[100px] "
          src={drinkThumb}
          alt="poster cocktail"
        />
      </div>
    </div>
  );
};

export default DrinkPageHero;
