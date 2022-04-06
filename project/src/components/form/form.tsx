import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { postCommentAction } from '../../store/api-actions';
import FormRating from '../form/form-rating';

type CommentFormProps = {
  currentId: number
};

const CommentLength = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 300,
};

const ErrorMessage = 'Something went wrong, please try posting your comment later';


function CommentForm({ currentId }: CommentFormProps): JSX.Element {
  const [newComment, setComment] = useState('');
  const [isCommentLengthValid, setIsCommentLengthValid] = useState(false);
  const [isCommentDisabled, setCommentDisabling] = useState(false);
  const { commentRating } = useAppSelector(({ OFFERS }) => OFFERS);

  const checkCommentLength = (comment: string) => (comment.length >= CommentLength.MIN_LENGTH && comment.length < CommentLength.MAX_LENGTH)
    ? setIsCommentLengthValid(true)
    : setIsCommentLengthValid(false);

  const handleCommentChange = (value: string) => {
    setComment(value);
    checkCommentLength(value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setCommentDisabling(true);

    store.dispatch(postCommentAction(
      {
        review: {
          comment: newComment,
          rating: commentRating,
        },
        id: currentId,
      }))
      .then(() => setIsCommentLengthValid(false))
      .then(() => setComment(''))
      .catch(() => toast.info(ErrorMessage))
      .finally(() => setCommentDisabling(false));
  };

  return (
    <form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <FormRating isDisabled={isCommentDisabled} />
      </div>
      <textarea
        value={newComment}
        onChange={(evt) => { handleCommentChange(evt.target.value); }}
        disabled={isCommentDisabled}
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
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={commentRating === 0 || !isCommentLengthValid || isCommentDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
