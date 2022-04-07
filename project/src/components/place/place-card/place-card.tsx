import { memo } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { correctType, paintRating } from '../../../common';
import { AppRoute } from '../../../consts';
import { useAppDispatch } from '../../../hooks';
import {
  getOfferId,
  resetOfferId
} from '../../../store/offers-process/offers-process';
import { Offer } from '../../../types/offer';
import { RenderPlace } from '../../../types/renderPlace';
import FavoriteButton from '../../favorites/favorite-button/favorite-button';

type PlaceCardProps = {
  offer: Offer;
  articleClassChange: string;
  imgClassChange: string;
  favorites?: boolean;
  randerPlase: RenderPlace,
};

function PlaceCard(props: PlaceCardProps): JSX.Element {

  const {
    offer,
    articleClassChange,
    imgClassChange,
    favorites,
    randerPlase
  } = props;

  const {
    images,
    price,
    title,
    type,
    isPremium,
    id,
    rating,
    isFavorite,
    previewImage
  } = offer;

  const dispatch = useAppDispatch();
  const getCardMark = () => isPremium ? <div className="place-card__mark"><span>Premium</span></div> : '';

  return (
    <article className={`${articleClassChange} place-card`}
      onMouseEnter={() => { dispatch(getOfferId(id)); }}
      onMouseLeave={() => { dispatch(resetOfferId()); }}
      data-testid="PlaceCard"
    >
      {getCardMark()}
      <div className={`${imgClassChange} place-card__image-wrapper`}>
        <Link data-testid="ImageLink" to={generatePath(AppRoute.Hotel, { id: String(id) })} title='/offer'>
          {favorites ?
            <img
              className="place-card__image"
              src={previewImage}
              width="150"
              height="110"
              alt="Place"
            /> :
            <img
              className="place-card__image"
              src={images[0]}
              width="260"
              height="200"
              alt="Place"
            />}
        </Link>
      </div>
      <div className="place-card__info">
        <div className={`${favorites && 'favorites__card-info'} place-card__price-wrapper`}>
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isFavorite={isFavorite}
            id={id}
            renderPlace={renderPlace}
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
