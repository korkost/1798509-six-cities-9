import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { SortingType } from '../../consts';
import HistoryRouter from '../history-router/history-router';
import SortingList from './sorting-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: SortingList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore({Offers: {sortingType: SortingType.Popular}})}>
        <HistoryRouter history={history}>
          <SortingList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByTestId('SortingItem')).toHaveLength(4);
    userEvent.click(screen.getByTestId('SortingList'));
  });
});
