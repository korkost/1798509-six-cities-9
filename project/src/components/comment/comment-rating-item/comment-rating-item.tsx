import { useAppSelector } from '../../../hooks';
import { store } from '../../../store';
import { getRating } from '../../../store/offers-process/offers-process';
import { getCommentRating } from '../../../store/offers-process/selectors';

type CommentRatingItemProps = {
  stars: number;
  title: string;
  isDisabled: boolean
};

function CommentRatingItem({ stars, title, isDisabled }: CommentRatingItemProps) {
  const commentRating = useAppSelector(getCommentRating);

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={stars}
        id={`${stars}-stars`}
        type="radio"
        onChange={()=>store.dispatch(getRating(stars))}
        checked={stars === commentRating}
        disabled={isDisabled}
        data-testid="star"
      />
      <label htmlFor={`${stars}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default CommentRatingItem;
