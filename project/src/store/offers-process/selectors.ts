import {NameSpace} from '../../consts';
import {State} from '../../types/state';

const getCity = (state: State): string => state[NameSpace.Offers].city;
const getCommentRating = (state: State): number => state[NameSpace.Offers].commentRating;
const getId = (state: State): number => state[NameSpace.Offers].offerId;
const getSortingType = (state: State): string => state[NameSpace.Offers].sortingType;

export {
  getCity,
  getCommentRating,
  getId,
  getSortingType
};
