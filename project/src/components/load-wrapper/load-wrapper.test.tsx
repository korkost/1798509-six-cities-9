import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import LoadWrapper from './load-wrapper';

const history = createMemoryHistory();

describe('Component: LoadWrapper', () => {
  it('should render correctly', () => {

    const {rerender} = render(
      <HistoryRouter history={history} >
        <LoadWrapper isLoaded>
          <p>Children</p>
        </LoadWrapper>
      </HistoryRouter>,
    );

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();

    rerender(
      <HistoryRouter history={history} >
        <LoadWrapper isLoaded={false}>
          <p>Children</p>
        </LoadWrapper>
      </HistoryRouter>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
