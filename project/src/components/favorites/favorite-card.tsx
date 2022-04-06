import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { correctType } from '../../common';

type FavoriteCardProps = {
  offer: Offer;
};

function FavoriteCard(props: FavoriteCardProps): JSX.Element {
  const { offer } = props;
  const {
    previewImage,
    price,
    rating,
    title,
    type,
    id,
  } = offer;

  return (
    <article key={offer.id} className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`} title='/offer'>
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt="Place"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <Link to={`/offer/${id}`} title='/offer'>
          <h2 className="place-card__name">
            <a href="/">{title}</a>
          </h2>
        </Link>
        <p className="place-card__type">{correctType(type)}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
