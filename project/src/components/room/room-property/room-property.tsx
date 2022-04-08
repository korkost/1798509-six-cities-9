import Header from '../../header/header';
import PlaceCard from '../../place/place-card/place-card';
import RoomCard from '../room-card/room-card';
import Map from '../../map/map';
import { useAppSelector } from '../../../hooks';
import { memo } from 'react';
import { RenderPlace } from '../../../settings';
import { getNearby } from '../../../store/offers-data/selectors';
import { Offer } from '../../../types/offer';
import { useParams } from 'react-router-dom';

const articleClass = 'near-places__card';
const imgClass = 'near-places__image-wrapper';
const offersNearbyPlace = RenderPlace.PlaceCard;

type RoomPropertyProps = {
  currentOffer: Offer;
}

function RoomProperty({currentOffer}: RoomPropertyProps): JSX.Element {
  const paramsId = Number(useParams().id);

  const offersNearby =  useAppSelector(getNearby);
  const offersForMap = [...offersNearby, currentOffer];

  return (
    <div className="page" data-testid="RoomProperty">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <RoomCard offer={currentOffer} currentId={paramsId} />
          <section className="property__map map">
            <Map offers={offersForMap} idNearbyOffer={paramsId} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                offersNearby.map((item) => <PlaceCard key = {item.id} offer={item} articleClassChange={articleClass} imgClassChange={imgClass} renderPlace={offersNearbyPlace}  />)
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default memo(RoomProperty);
