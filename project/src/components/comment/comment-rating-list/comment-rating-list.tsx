import { v4 as uuidv4 } from 'uuid';
import CommentRatingItem from '../comment-rating-item/comment-rating-item';

const ratingStars = [
  { stars: 5, title: 'perfect' },
  { stars: 4, title: 'good' },
  { stars: 3, title: 'not bad' },
  { stars: 2, title: 'badly' },
  { stars: 1, title: 'terribly' },
];

type CommentRatingListProps = {
  isDisabled: boolean
};

export default function CommentRatingList({isDisabled}: CommentRatingListProps): JSX.Element {

  return (
    <div className="reviews__rating-form form__rating" data-testid="commentRating">
      {ratingStars.map(({ stars, title }) => (
        <CommentRatingItem key={uuidv4()} stars={stars} title={title} isDisabled={isDisabled} />
      ))}
    </div>
  );
}
