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

const MAX_RATING = 5;

const getRatingPercent = (rating: number) => (rating / MAX_RATING) * 100;

const getFormatDate = (date: string) => {
  const currentDate = new Date(date);
  const getMonth = currentDate.toLocaleString('en', { month: 'long' });
  const getYear = currentDate.getFullYear();

  return `${getMonth} ${getYear}`;
};

export {AppRoute, AuthorizationStatus, RATING, getRatingPercent, getFormatDate};
