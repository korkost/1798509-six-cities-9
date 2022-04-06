import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import RoomCard from '../../components/room/room-card';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { fetchOfferAction, fetchOfferNearbyAction } from '../../store/api-actions';
import { store } from '../../store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RoomProperty(): JSX.Element {
  const paramsId = Number(useParams().id);
  useEffect(() => {store.dispatch(fetchOfferAction());}, []);

  const offers = useAppSelector(({DATA}) => DATA.offers);
  const currentOffer = offers.filter((offer) => offer.id===paramsId)[0];

  useEffect(() => {
    store.dispatch(fetchOfferNearbyAction(paramsId));
  }, [paramsId]);

  const offersNearby =  useAppSelector(({DATA}) => DATA.offersNearby);
  const offersForMap = [...offersNearby, currentOffer];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <RoomCard offer={currentOffer} currentId={paramsId} />
          <section className="property__map map">
            <Map offers={offersForMap} currentId={paramsId} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                offersNearby.map((item) => <PlaceCard key = {item.id} offer={item} articleClassChange={'near-places__card'} imgClassChange={'near-places__image-wrapper'} randerPlase={'PLAСE_CARD'}  />)
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomProperty;
