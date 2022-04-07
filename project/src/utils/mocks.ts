import { Offer } from '../types/offer';
import {Review} from '../types/review';
import {datatype, address, lorem, image, internet} from 'faker';

const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number({
    'min': 10,
    'max': 50,
  }),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: 13,
    },
    name: 'Paris',
  },
  description: lorem.text(),
  goods: [lorem.word(), lorem.word()],
  host: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.avatar(),
  },
  id: datatype.number(),
  images: [image.imageUrl(), image.imageUrl()],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: 10,
  },
  maxAdults: datatype.number({
    'min': 1,
    'max': 10,
  }),
  previewImage: image.imageUrl(),
  price: datatype.number({
    'min': 100,
    'max': 1000,
  }),
  rating: datatype.number({
    'min': 1,
    'max': 10,
  }),
  title: lorem.text(),
  type: lorem.word(),
});

const makeFakeReview = (): Review => ({
  comment: lorem.text(),
  date: String(datatype.datetime()),
  id:  datatype.number(),
  rating: datatype.number({
    'min': 1,
    'max': 10,
  }),
  user: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
});

const makeFakeNewReview = () => ({
  review: {
    comment: lorem.text(),
    rating: datatype.number({
      'min': 1,
      'max': 10,
    })},
  id: datatype.number(),
});

const makeFakeUser = () => ({
  avatarUrl: image.imageUrl(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  email: internet.email(),
});

const makeUserData = () => ({
  id: datatype.number(),
  email: internet.email(),
  token: internet.password(),
});

const makeUser = () => ({
  login: internet.email(),
  password: internet.password(),
});

const makeNewStatus = () => ({
  id: datatype.number(),
  status: 1,
});

export {
  makeFakeOffer,
  makeFakeReview,
  makeFakeNewReview,
  makeUserData,
  makeUser,
  makeNewStatus,
  makeFakeUser
};
