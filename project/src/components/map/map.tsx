import L from 'leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';

const PIN = {
  URL_DEFAULT: '/img/pin.svg',
  URL_CUSTOM: '/img/pin-active.svg',
};

type MapProps = {
  offers: Offer[];
  currentId?: number;
};

function Map({offers, currentId}: MapProps) {
  const offerId  = useAppSelector(({OFFERS}) => OFFERS.offerId);
  const mapRef = useRef(null);
  const cityCenter = offers[0].city;
  const markerGroup = useRef(L.layerGroup());

  const {location: {latitude: lat, longitude: lng, zoom}} = cityCenter;

  const defaultCustomIcon = leaflet.icon({
    iconUrl: PIN.URL_DEFAULT,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: PIN.URL_CUSTOM,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const map = useMap(mapRef, cityCenter);

  useEffect(() => {
    if (map) {
      markerGroup.current.clearLayers();
      markerGroup.current.addTo(map);

      offers.forEach(({id, location: {latitude, longitude}}) => {
        leaflet
          .marker({
            lat: latitude,
            lng: longitude,
          }, {
            icon: (id === currentId || id === offerId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerGroup.current);
      });
      map.flyTo([lat, lng], zoom);
    }
  }, [currentCustomIcon, defaultCustomIcon, lat, lng, map,  markerGroup, offers, offerId, zoom]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
