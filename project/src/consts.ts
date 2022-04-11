import { Offer } from './types/offer';

const defaultOffer: Offer = {
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

const MAX_RATING = 5;

const Cities = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
};

const SortingType = {
  Popular: 'Popular',
  PriceToHigh: 'Price: low to high',
  PriceToLow: 'Price: high to low',
  Top: 'Top rated first',
};

const OffersType = {
  Apartment: 'Apartment',
  Room: 'Private Room',
  House: 'House',
  Hotel: 'Hotel',
};

const enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Hotel = '/offer/:id',
  Root = '/',
  Error = '/404',
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
}

const enum NameSpace {
  Data = 'Data',
  Offers = 'Offers',
  User = 'User',
}

const enum PlaceType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel'
}

const getRatingPercent = (rating: number) => (rating / MAX_RATING) * 100;

const getFormatDate = (date: string) => {
  const currentDate = new Date(date);
  const getMonth = currentDate.toLocaleString('en', { month: 'long' });
  const getYear = currentDate.getFullYear();

  return `${getMonth} ${getYear}`;
};

export {
  defaultOffer,
  AppRoute,
  AuthorizationStatus,
  Cities,
  SortingType,
  OffersType,
  APIRoute,
  getRatingPercent,
  getFormatDate,
  NameSpace,
  PlaceType
};
