import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import CommentRatingItem from './comment-rating-item';

const mockValue = 1;
const mockCommentRating = 2;
const title = 'terribly';
const mockStore = configureMockStore();

describe('Component: CommentRatingItem', () =>
{
  it('should render correctly and should checked when user clicked', () => {
    const {rerender} = render(
      <Provider store={mockStore({Offers: {commentRating: mockCommentRating}})}>
        <CommentRatingItem stars={mockCommentRating} title={title} isDisabled={false} />
      </Provider>,
    );

    const node = screen.getByTestId('star');
    expect(node).toBeInTheDocument();
    userEvent.click(node);
    expect(node).toBeChecked();

    rerender (
      <Provider store={mockStore({Offers: {commentRating: mockCommentRating}})}>
        <CommentRatingItem stars={mockValue} title={title} isDisabled={false} />
      </Provider>,
    );

    userEvent.click(node);
    expect(node).not.toBeChecked();
  });
});
