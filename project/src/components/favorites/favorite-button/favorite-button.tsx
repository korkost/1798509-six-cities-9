import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../../consts';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { FavoriteButtonClass } from '../../../settings';
import { postFavoriteAction } from '../../../store/api-actions';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import { RenderPlace } from '../../../types/renderPlace';

type FavoriteButtonProps = {
  isFavorite: boolean,
  id: number,
  renderPlace: RenderPlace,
};

function FavoriteButton({ isFavorite, id, renderPlace }: FavoriteButtonProps): JSX.Element {
  const type = FavoriteButtonClass[renderPlace].Type;
  const width = FavoriteButtonClass[renderPlace].Width;
  const height = FavoriteButtonClass[renderPlace].Height;
  const dispatch = useAppDispatch();

  const status = isFavorite ? 0 : 1;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleButtonClick = useCallback(() => {
    dispatch(postFavoriteAction({ id: id, status: status }));
  }, [dispatch, id, status]);

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return (
      <Link
        to={AppRoute.Login}
      >
        <button className={`${type}__bookmark-button button`} type="button">
          <svg
            className={`${type}__bookmark-icon`}
            width={width}
            height={height}
          >
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </Link>
    );
  }

  return (
    <button
      className={`${type}__bookmark-button button ${isFavorite && `${type}__bookmark-button--active`}`}
      onClick={handleButtonClick}
      type="button"
    >
      <svg
        className={`${type}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
