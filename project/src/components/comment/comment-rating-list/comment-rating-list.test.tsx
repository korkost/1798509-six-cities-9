import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import CommentRatingList from './comment-rating-list';

const star = 1;
const mockStore = configureMockStore();

describe('Component: CommentRatingList', () =>
{
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({Offers: {commentRating: star}})}>
        <CommentRatingList isDisabled={false} />);
      </Provider>,
    );

    expect(screen.getByTitle('good')).toBeInTheDocument();  });
});
