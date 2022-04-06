import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { getRating } from '../../store/offers-process/offers-process';

type FormRatingStarProps = {
  id: number;
  title: string;
  isDisabled: boolean
};

function FormRatingStar({ id, title, isDisabled }: FormRatingStarProps) {
  const commentRating = useAppSelector(({OFFERS}) => OFFERS.commentRating);

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={id}
        id={`${id}-id`}
        type="radio"
        onChange={()=>{store.dispatch(getRating(id));}}
        checked={id === commentRating}
        disabled={isDisabled}
      />
      <label htmlFor={`${id}-id`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default FormRatingStar;
