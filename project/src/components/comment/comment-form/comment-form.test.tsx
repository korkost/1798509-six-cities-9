import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-router';
import {makeFakeUser} from '../../utils/mocks';
import CommentForm from './comment-form';
import {AuthorizationStatus} from '../../consts';

const mockStore = configureMockStore();
const mockUser = makeFakeUser();
const mockId = 1;

const store = mockStore({
  User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser},
  Offers: {commentRating: 1},
});

describe('Component: CommentForm', () => {
  const history = createMemoryHistory();

  it('should render "CommentForm"', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentForm currentId={mockId} />
        </HistoryRouter>
      </Provider>,
    );

    const commentInput = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByTestId(/commentRating/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();

    userEvent.type(commentInput, '123456');
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('button "Submit" should be disabled if the user has entered invalid text', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentForm currentId={mockId} />
        </HistoryRouter>
      </Provider>,
    );

    const commentInput = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');

    userEvent.type(commentInput, '123456');
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
    expect(screen.getByTestId('Submit')).toBeDisabled();
  });

  it('button "Submit" should be disabled if the user dont choose invalid rating', () => {

    render(
      <Provider store={mockStore({User: {authorizationStatus: AuthorizationStatus.Auth, user: mockUser}, Offers: {commentRating: 0}})}>
        <HistoryRouter history={history}>
          <CommentForm currentId={mockId} />
        </HistoryRouter>
      </Provider>,
    );

    const commentInput = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');

    userEvent.type(commentInput, 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.');
    expect(screen.getByTestId('Submit')).toBeDisabled();
  });

  it('button "Submit" should be abled if the user entered valid data', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentForm currentId={mockId} />
        </HistoryRouter>
      </Provider>,
    );

    const commentInput = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');

    userEvent.type(commentInput, 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.');
    expect(screen.getByTestId('Submit')).not.toBeDisabled();
  });
});
