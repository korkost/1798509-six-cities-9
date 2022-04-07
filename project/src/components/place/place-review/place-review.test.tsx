import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeReview } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-router';
import PlaceReview from './place-review';

const mockStore = configureMockStore();
const mockReview = makeFakeReview();
const history = createMemoryHistory();

describe('Component: PlaceReview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <PlaceReview review={mockReview} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('UserName')).toBeInTheDocument();
    expect(screen.getByTestId('Comment')).toBeInTheDocument();
    expect(screen.getByTestId('Data')).toBeInTheDocument();
  });
});
