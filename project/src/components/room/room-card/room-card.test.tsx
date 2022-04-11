import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../consts';
import { makeFakeOffer, makeFakeReview } from '../../../utils/mocks';
import HistoryRouter from '../../history-router/history-router';
import RoomCard from './room-card';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockOffer = makeFakeOffer();
const currentId = 1;
const mockComments = [makeFakeReview(), makeFakeReview()];
const mockCommentRating = '1';

describe('Component: RoomCard', () => {

  it('should render correctly', () => {
    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth}, Data: {comments: mockComments}, Offers: {commentRating: mockCommentRating}})}>
        <HistoryRouter history={history} >
          <RoomCard offer={mockOffer} currentId={currentId} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('Gallery')).toBeInTheDocument();
    expect(screen.getByTestId('RoomTitle')).toBeInTheDocument();
    expect(screen.getByText(/bookmarks/i)).toBeInTheDocument();
    expect(screen.getByTestId('RoomType')).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/adults/i)).toBeInTheDocument();
    expect(screen.getByText(/€/i)).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByTestId('ReviewList')).toBeInTheDocument();
    expect(screen.getByTestId('CommentForm')).toBeInTheDocument();
  });
});
