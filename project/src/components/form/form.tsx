import { FormEvent, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { postCommentAction } from '../../store/api-actions';
import { NewReview } from '../../types/review';
import FormRating from '../form/form-rating';

type CommentFormProps = {
  currentId: number
};

function CommentForm({ currentId }: CommentFormProps): JSX.Element {
  const [newComment, setComment] = useState('');
  const newRating = useAppSelector((state) => state.commentRating);

  const onSubmit = (newReview: NewReview) => {
    store.dispatch(postCommentAction(newReview));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(
      {
        review: {
          comment: newComment,
          rating: newRating,
        },
        id: currentId,
      });
  };

  return (
    <form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <FormRating />
      </div>
      <textarea
        value={newComment}
        onChange={(evt) => { setComment(evt.target.value); }}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
