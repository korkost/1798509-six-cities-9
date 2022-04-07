import { loadOffer, offersData, updateFavorites } from './offers-data';
import {loadOffers, loadOffersFavorite, loadOffersNearby, loadComments, resetComments} from './offers-data';
import {makeFakeOffer, makeFakeReview} from '../../utils/mocks';
import { defaultOffer } from '../../consts';

const offer = makeFakeOffer();
const offers = [makeFakeOffer(), makeFakeOffer()];
const comments = [makeFakeReview(), makeFakeReview()];

const state = {
  offers: [],
  offer: defaultOffer,
  offersFavorite: [],
  offersNearby: [],
  comments: [],
  isDataLoaded: false,
  isOfferLoaded: false,
  isLoadedOffersNearby: false,
  isLoadedComments: false,
};

describe('Reducer: offersData', () => {

  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should load offers', () => {
    expect(offersData.reducer(state, loadOffers(offers)))
      .toEqual({...state, offers, isDataLoaded: true});
  });

  it('should load offer', () => {
    expect(offersData.reducer(state, loadOffer(offer)))
      .toEqual({...state, offer: offer, isOfferLoaded: true});
  });

  it('should load offersFavorite', () => {
    expect(offersData.reducer(state, loadOffersFavorite(offers)))
      .toEqual({...state, offersFavorite: offers});
  });

  it('should load offersNearby', () => {
    expect(offersData.reducer(state, loadOffersNearby(offers)))
      .toEqual({...state, offersNearby: offers, isLoadedOffersNearby: true});
  });

  it('should load comments', () => {
    expect(offersData.reducer(state,  loadComments(comments)))
      .toEqual({...state, comments: comments, isLoadedComments: true});
  });

  it('should reset comments', () => {
    expect(offersData.reducer({...state, comments: comments, isLoadedComments: true}, resetComments()))
      .toEqual({...state, comments: [], isLoadedComments: true});
  });

  it('should update favorites', () => {
    const offerFirst = makeFakeOffer();
    const offerSecond = makeFakeOffer();

    expect(offersData.reducer({
      ...state,
      offers: [offerFirst, offerSecond],
      offer: offerFirst,
      offersFavorite: [offerFirst, offerSecond],
      offersNearby: [offerFirst, offerSecond],
    }, updateFavorites(offerFirst)))
      .toEqual({
        ...state,
        offers: [offerFirst, offerSecond],
        offer: offerFirst,
        offersFavorite: [offerFirst, offerSecond],
        offersNearby: [offerFirst, offerSecond],
      });
  });
});
