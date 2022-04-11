import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import City from './city';

const mockStore = configureMockStore();
const mockcity = 'Paris';
const city = 'Cologne';

describe('Component: City', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({Offers: {city: city}})}>
        <HistoryRouter history={history} >
          <City currentCity={mockcity} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(mockcity)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render correctly if city===currentCity', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({Offers: {city: mockcity}})}>
        <HistoryRouter history={history} >
          <City currentCity={mockcity} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('City')).toBeInTheDocument();
    expect(screen.getByTestId('City')).toHaveClass('tabs__item--active');
  });
});
