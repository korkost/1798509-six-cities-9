import {useState} from 'react';
import {store} from '../store';
import {postFavoriteAction } from '../store/api-actions';

type ButtonFavorite = [boolean, (id: number) => void];

const useButtonFavorite = (isFavorite: boolean): ButtonFavorite => {
  const [favoriteClass, setFavoriteClass] = useState<boolean>(isFavorite);

  const handleButtonClick = (id: number) => {
    store.dispatch(postFavoriteAction(
      {
        id: id,
        status: favoriteClass? 0 : 1,
      },
    ));
    setFavoriteClass(!favoriteClass);
  };

  return [favoriteClass, handleButtonClick];
};

export default useButtonFavorite;
