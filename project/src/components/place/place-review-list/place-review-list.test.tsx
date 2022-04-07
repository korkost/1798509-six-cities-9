import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-router';
import PlaceReviewList from './place-review-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockReviews = [makeFakeReview(), makeFakeReview()];

describe('Component: FavoritesOffersList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <PlaceReviewList reviews={mockReviews} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('ReviewList')).toBeInTheDocument();
    expect(screen.getAllByTestId('Review')).toHaveLength(2);
  });
});
