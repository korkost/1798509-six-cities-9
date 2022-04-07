import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import MainEmpty from './main-empty';

const mockCity = 'Paris';
const mockStore = configureMockStore();

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(
      <Provider store={mockStore({Offers: {city: mockCity}})}>
        <MainEmpty />
      </Provider>,
    );

    const statusElement = screen.getByText('No places to stay available');
    const descriptionElement = screen.getByText(`We could not find any property available at the moment in ${mockCity}`);

    expect(statusElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
