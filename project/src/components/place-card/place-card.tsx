import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { getRatingPercent } from '../../consts';

interface PlaceCardProps {
  offer: Offer;
  articleClassChange: string;
  imgClassChange: string;
  onListItemHover?: (listItemName: number) => void;
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const { offer, articleClassChange, imgClassChange, onListItemHover } = props;
  const {
    type,
    price,
    isPremium,
    id,
    title,
    images,
    rating,
  } = offer;
  const getCardMark = () => isPremium ? <div className="place-card__mark"><span>Premium</span></div> : '';

  return (
    <article className={`${articleClassChange} place-card`} onMouseEnter={() => { onListItemHover && onListItemHover(id); }} onMouseLeave={() => { onListItemHover && onListItemHover(0); }} >
      {getCardMark()}
      <div className={`${imgClassChange} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`} title='/offer'>
          <img
            className="place-card__image"
            src={images[0]}
            width="260"
            height="200"
            alt="Place"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingPercent(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} title='/offer'>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
