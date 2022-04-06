import { v4 as uuidv4 } from 'uuid';
import FormRatingStar from '../form/form-rating-star';

enum RatingLabels {
  PERFECT = 'perfect',
  GOOD = 'good',
  NOT_BAD = 'not bad',
  BADLY = 'badly',
  TERRIBLY = 'terribly',
}

const RATING = [
  {
    id: 5,
    title: RatingLabels.PERFECT,
  },
  {
    id: 4,
    title: RatingLabels.GOOD,
  },
  {
    id: 3,
    title: RatingLabels.NOT_BAD,
  },
  {
    id: 2,
    title: RatingLabels.BADLY,
  },
  {
    id: 1,
    title: RatingLabels.TERRIBLY,
  },
];

type FormRatingProps = {
  isDisabled: boolean
};

export default function FormRating({isDisabled}: FormRatingProps): JSX.Element {

  return (
    <div className="reviews__rating-form form__rating">
      {RATING.map(({ id, title }) => (
        <FormRatingStar key={uuidv4()} id={id} title={title} isDisabled={isDisabled} />
      ))}
    </div>
  );
}
