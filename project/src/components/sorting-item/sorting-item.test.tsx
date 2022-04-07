import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import SortingItem from './sorting-item';

const mockType = 'Popular';
const mockStore = configureMockStore();
const sortingType = 'Top';


describe('Component: SortingItem', () => {
  it('should render correctly', () => {
    const toggle = jest.fn();

    render(
      <Provider store={mockStore({Offers: {sortingType: sortingType}})}>
        <SortingItem type={mockType} toggle={toggle} />
      </Provider>,
    );

    expect(screen.getByText(mockType)).toBeInTheDocument();
  });
  it('should render correctly if sortingType===type', () => {
    const toggle = jest.fn();

    render(
      <Provider store={mockStore({Offers: {sortingType: mockType}})}>
        <SortingItem type={mockType} toggle={toggle} />
      </Provider>,
    );

    expect(screen.getByText(mockType)).toBeInTheDocument();
    expect(screen.getByText(mockType)).toHaveClass('places__option--active');
    userEvent.click(screen.getByTestId('SortingItem'));
    expect(toggle).toBeCalled();
  });
});
