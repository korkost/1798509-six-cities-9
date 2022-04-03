import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { PIN, PIN_ACTIVE } from '../../consts';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';

type MapProps = {
  offers: Offer[];
};

function Map({offers}: MapProps) {
  const selectedPoint = useAppSelector((state) => state.offerId);
  const mapRef = useRef(null);
  const currentOffer = useAppSelector((state) => state.offer);

  const map = useMap(mapRef, currentOffer.city);
  const cityCenter = offers[0].city;

  const {location: {latitude: lat, longitude: lng, zoom}} = cityCenter;

  const defaultCustomIcon = leaflet.icon({
    iconUrl: PIN,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: PIN_ACTIVE,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  useEffect(() => {
    if (map) {

      offers.forEach(({id, location: {latitude, longitude}}) => {
        leaflet
          .marker({
            lat: latitude,
            lng: longitude,
          }, {
            icon: (id === selectedPoint)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
      map.flyTo([lat, lng], zoom);
    }
  }, [currentCustomIcon, defaultCustomIcon, lat, lng, map, offers, selectedPoint, zoom]);

  return (
    <div
      style={{height: '600px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
