import { Cities, SortingType } from '../../consts';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';
import { offersProcess } from './offers-process';
import {
  changeСity,
  getOfferId,
  resetOfferId,
  changeSorting,
  getRating
} from './offers-process';

const offer = makeFakeOffer();
const comment = makeFakeReview();

describe('Reducer: offersProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({city: Cities.Paris, offerId: 0, sortingType: SortingType.Popular, commentRating: 0});
  });
  it('should change city', () => {
    const state = {city: Cities.Paris, offerId: 0, sortingType: SortingType.Popular, commentRating: 0};
    const city = offer.city.name;
    expect(offersProcess.reducer(state, changeСity(city)))
      .toEqual({city, offerId: 0, sortingType: SortingType.Popular, commentRating: 0});
  });
  it('should get offer id', () => {
    const state = {city: Cities.Paris, offerId: 0, sortingType: SortingType.Popular, commentRating: 0};
    const {id} = offer;
    expect(offersProcess.reducer(state, getOfferId(id)))
      .toEqual({city: Cities.Paris, offerId: id, sortingType: SortingType.Popular, commentRating: 0});
  });
  it('should reset offer id', () => {
    const {id} = offer;
    const state = {city: Cities.Paris, offerId: id, sortingType: SortingType.Popular, commentRating: 0};
    expect(offersProcess.reducer(state, resetOfferId()))
      .toEqual({city: Cities.Paris, offerId: 0, sortingType: SortingType.Popular, commentRating: 0});
  });
  it('should change sorting', () => {
    const state = {city: Cities.Paris, offerId: 0, sortingType: SortingType.Popular, commentRating: 0};
    const sortingType = SortingType.Top;
    expect(offersProcess.reducer(state, changeSorting(sortingType)))
      .toEqual({city: Cities.Paris, offerId: 0, sortingType, commentRating: 0});
  });
  it('should get comment rating', () => {
    const state = {city: Cities.Paris, offerId: 0, sortingType: SortingType.Popular, commentRating: 0};
    const commentRating = comment.rating;
    expect(offersProcess.reducer(state, getRating(commentRating)))
      .toEqual({city: Cities.Paris, offerId: 0, sortingType: SortingType.Popular, commentRating});
  });
});
