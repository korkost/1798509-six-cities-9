import { memo } from 'react';
import { Link } from 'react-router-dom';
import { correctType, paintRating } from '../../common';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useButtonFavorite from '../../hooks/useButtonFavorite';
import {
  getOfferId,
  resetOfferId
} from '../../store/offers-process/offers-process';
import { Offer } from '../../types/offer';
import FavoriteButton from '../favorites/favorite-button';

type PlaceCardProps = {
  offer: Offer;
  articleClassChange: string;
  imgClassChange: string;
  favorites?: boolean;
  randerPlase: 'PLAСE_CARD' | 'PROPERTY',
};

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const { offer, articleClassChange, imgClassChange, favorites, randerPlase } = props;
  const { images, price, title, type, isPremium, id, rating, isFavorite, previewImage } = offer;
  const dispatch = useAppDispatch();
  const getCardMark = () => isPremium ? <div className="place-card__mark"><span>Premium</span></div> : '';
  const authorizationStatus = useAppSelector(({ USER }) => USER.authorizationStatus);

  const [favoriteClass, handleButtonClick] = useButtonFavorite(isFavorite);


  return (
    <article className={`${articleClassChange} place-card`}
      onMouseEnter={() => { dispatch(getOfferId(id)); }}
      onMouseLeave={() => { dispatch(resetOfferId()); }}
    >
      {getCardMark()}
      <div className={`${imgClassChange} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`} title='/offer'>
          {favorites ?
            <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place" /> :
            <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place" />}
        </Link>
      </div>
      <div className="place-card__info">
        <div className={`${favorites && 'favorites__card-info'} place-card__price-wrapper`}>
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            authorizationStatus={authorizationStatus}
            favoriteClass={favoriteClass}
            handleButtonClick={handleButtonClick}
            id={id}
            randerPlase={randerPlase}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${paintRating(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} title='/offer'>{title}</Link>
        </h2>
        <p className="place-card__type">{correctType(type)}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard, (prevProps, nextProps) => prevProps === nextProps);
