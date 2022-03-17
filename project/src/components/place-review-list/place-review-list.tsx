import { Review } from '../../types/review';
import PlaceReview from '../place-review/place-review';


type PlaceReviewListProps = {
  reviews: Review[];
};

function PlaceReviewList({reviews}: PlaceReviewListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {
        reviews.map((review) => (
          <PlaceReview key={review.id} review={review} />
        ))
      }
    </ul>
  );}

export default PlaceReviewList;
