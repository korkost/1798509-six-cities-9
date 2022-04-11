const LogoType = {
  HEADER: {
    type: 'header',
    width: '81',
    height: '41',
  },
  FOOTER: {
    type: 'footer',
    width: '64',
    height: '33',
  },
};

const FavoriteButtonClass = {
  PlaceCard: {
    Type: 'place-card',
    Width: '18',
    Height: '19',
  },
  Property: {
    Type: 'property',
    Width: '31',
    Height: '33',
  },
};

const enum RenderPlace {
  PlaceCard = 'PlaceCard',
  Property = 'Property',
}

export {
  LogoType,
  FavoriteButtonClass,
  RenderPlace
};
