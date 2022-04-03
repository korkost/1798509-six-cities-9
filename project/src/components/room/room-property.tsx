import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import PlaceCard from '../../components/place-card/place-card';
import RoomCard from '../../components/room/room-card';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { fetchOfferNearbyAction } from '../../store/api-actions';
import { store } from '../../store';

function RoomProperty(): JSX.Element {
  const currentOffer = useAppSelector((state) => state.offer);

  store.dispatch(fetchOfferNearbyAction());
  const nextOffers =  useAppSelector((state) => state.offersNearby);
  const offers = [...nextOffers, currentOffer];

  return (
    <div className="page">
      <Header navigation={<Navigation />}/>
      <main className="page__main page__main--property">
        <section className="property">
          <RoomCard offer={currentOffer} />
          <section className="property__map map">
            <Map offers={offers} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {
                nextOffers.map((item) => <PlaceCard key = {item.id} offer={item} articleClassChange={'near-places__card'} imgClassChange={'near-places__image-wrapper'} />)
              }
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomProperty;
