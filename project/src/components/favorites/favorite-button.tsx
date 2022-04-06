import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { FavoriteButtonClass } from '../../settings';

type FavoriteButtonProps = {
  authorizationStatus: AuthorizationStatus,
  favoriteClass: boolean,
  handleButtonClick: (id: number) => void,
  id: number,
  randerPlase: 'PLAСE_CARD' | 'PROPERTY',
};

function FavoriteButton({authorizationStatus, favoriteClass, handleButtonClick, id, randerPlase}: FavoriteButtonProps): JSX.Element {
  const type= FavoriteButtonClass[randerPlase].type;
  const width = FavoriteButtonClass[randerPlase].width;
  const height = FavoriteButtonClass[randerPlase].height;

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return (
      <Link
        to={AppRoute.Login}
      >
        <button className={`${type}__bookmark-button button`} type="button">
          <svg className={`${type}__bookmark-icon`} width={width} height={height}>
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </Link>
    );}

  return (
    <button
      className={`${type}__bookmark-button button ${favoriteClass&&`${type}__bookmark-button--active`}`}
      onClick={()=>{
        handleButtonClick(id);
      }}
      type="button"
    >
      <svg className={`${type}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
