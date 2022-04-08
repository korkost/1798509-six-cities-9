import CommentForm from '../../comment/comment-form/comment-form';
import { v4 as uuidv4 } from 'uuid';
import { Offer } from '../../../types/offer';
import PlaceReviewList from '../../place/place-review-list/place-review-list';
import { correctType, paintRating } from '../../../common';
import { AuthorizationStatus } from '../../../consts';
import { useAppSelector } from '../../../hooks';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import { getComments } from '../../../store/offers-data/selectors';
import FavoriteButton from '../../favorites/favorite-button/favorite-button';

type RoomCardProps = {
  offer: Offer;
  currentId: number
};

function RoomCard({ offer, currentId }: RoomCardProps): JSX.Element {
  const {
    images,
    price,
    rating,
    title,
    type,
    description,
    bedrooms,
    maxAdults,
    host,
    isPremium,
    goods,
    isFavorite,
    id,
  } = offer;

  const imagesForRender = images.slice(0, 6);

  const getPropertyMark = () => isPremium ? <div className="property__mark"><span>Premium</span></div> : '';

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const comments = useAppSelector(getComments);
  const sortReviews = comments.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  return (
    <>
      <div className="property__gallery-container container" data-testid="RoomCard">
        <div data-testid="Gallery" className="property__gallery">
          {
            imagesForRender.map((image) => (
              <div key={uuidv4()} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Studio" />
              </div>
            ))
          }
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {getPropertyMark()}
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {title}
            </h1>
            <FavoriteButton
              isFavorite={isFavorite}
              id={id}
              renderPlace={'Property'}
            />
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{ width: `${paintRating(rating)}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{rating}</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {correctType(type)}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {
                goods.map((good) => (
                  <li key={uuidv4()} className="property__inside-item">
                    {good}
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
              </div>
              <span className="property__user-name">
                {host.name}
              </span>
              <span className="property__user-status">
                {host.isPro && 'Pro'}
              </span>
            </div>
            <div className="property__description">
              <p className="property__text">
                {description}
              </p>
            </div>
          </div>
          <section className="property__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
            <PlaceReviewList reviews={sortReviews} />
            {authorizationStatus === AuthorizationStatus.Auth && <CommentForm currentId={currentId} />}
          </section>
        </div>
      </div>
    </>
  );
}

export default RoomCard;
