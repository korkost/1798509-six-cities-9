import { v4 as uuidv4 } from 'uuid';
import {RATING } from '../../consts';
import FormRatingStar from '../form/form-rating-star';

export default function FormRating(): JSX.Element {

  return (
    <div className="reviews__rating-form form__rating">
      {RATING.map(({ id, title }) => (
        <FormRatingStar key={uuidv4()} id={id} title={title} />
      ))}
    </div>
  );
}
