import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import { NewReview } from '../../types/review';
import FormRating from '../form/form-rating';

function CommentForm(): JSX.Element {
  const [newComment, setComment] = useState('');
  const newRating = useAppSelector((state) => state.commentRating);

  const dispatch = useAppDispatch();

  const onSubmit = (newReview: NewReview) => {
    dispatch(postCommentAction(newReview));
  };

  const handleSubmit = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    onSubmit({
      comment: newComment,
      rating: newRating,
    });

  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <FormRating />
      </div>
      <textarea
        value={newComment}
        onChange={(evt)=>{setComment(evt.target.value);}}
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
        <button className="reviews__submit form__submit button" type="submit" onSubmit={handleSubmit} >Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
