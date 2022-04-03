const PIN = '/img/pin.svg';

const PIN_ACTIVE = '/img/pin-active.svg';
const MAX_RATING = 5;

const DEFAULT_OFFER = {
  bedrooms: 0,
  city: {
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    name: '',
  },
  description: '',
  goods: [],
  host: {
    avatarUrl: '',
    id: 0,
    isPro: false,
    name: '',
  },
  id: 0,
  images: [],
  isFavorite: false,
  isPremium: false,
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  maxAdults: 0,
  previewImage: '',
  price: 0,
  rating: 0,
  title: '',
  type: '',
};

const Cities = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf',
};

const SortingType = {
  POPULAR: 'Popular',
  PRICE_TO_HIGH: 'Price: low to high',
  PRICE_TO_LOW: 'Price: high to low',
  TOP: 'Top rated first',
};

const offersType = {
  APPARTMENT: 'Apartment',
  ROOM: 'Private Room',
  HOUSE: 'House',
  HOTEL: 'Hotel',
};

const ActionType = {
  CHANGE_CITY: 'CHANGE_CITY',
  GET_OFFER_ID: 'GET_OFFER_ID',
  RESET_OFFER_ID: 'RESET_OFFER_ID',
  CHANGE_SORTING: 'CHANGE_SORTING',
  LOAD_OFFER: 'LOAD_OFFER',
  LOAD_OFFERS: 'data/hotels',
  LOAD_OFFERS_NEARBY: 'LOAD_OFFERS_NEARBY',
  LOAD_COMMENTS: 'data/comments',
  RESET_COMMENTS: 'RESET_COMMENTS',
  REQUIRE_AUTHORIZATION: 'user/requireAuthorization',
  REDIRECT_TO_ROUTER: 'redirectToRoute',
  GET_LOGIN: 'GET_LOGIN',
  GET_RATING: 'GET_RATING',
};


enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Root = '/'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

enum RatingLabels {
  PERFECT = 'perfect',
  GOOD = 'good',
  NOT_BAD = 'not bad',
  BADLY = 'badly',
  TERRIBLY = 'terribly',
}

const RATING = [
  {
    id: 5,
    title: RatingLabels.PERFECT,
  },
  {
    id: 4,
    title: RatingLabels.GOOD,
  },
  {
    id: 3,
    title: RatingLabels.NOT_BAD,
  },
  {
    id: 2,
    title: RatingLabels.BADLY,
  },
  {
    id: 1,
    title: RatingLabels.TERRIBLY,
  },
];

const getRatingPercent = (rating: number) => (rating / MAX_RATING) * 100;

const getFormatDate = (date: string) => {
  const currentDate = new Date(date);
  const getMonth = currentDate.toLocaleString('en', { month: 'long' });
  const getYear = currentDate.getFullYear();

  return `${getMonth} ${getYear}`;
};

export {
  DEFAULT_OFFER,
  AppRoute,
  AuthorizationStatus,
  PIN,
  PIN_ACTIVE,
  Cities,
  SortingType,
  offersType,
  APIRoute,
  HTTP_CODE,
  ActionType,
  RATING,
  getRatingPercent,
  getFormatDate
};
