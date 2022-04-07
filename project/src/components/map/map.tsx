import L from 'leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import { getId } from '../../store/offers-process/selectors';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';

const DEFAULT = {
  URL: '/img/pin.svg',
  ALT: 'offer',
};

const CUSTOM = {
  URL: '/img/pin-active.svg',
  ALT: 'selected offer',
};

type MapProps = {
  offers: Offer[];
  idNearbyOffer?: number;
};

function Map({ offers, idNearbyOffer }: MapProps): JSX.Element {
  const offerId = useAppSelector(getId);
  const idForMap = idNearbyOffer ? idNearbyOffer : offerId;
  const mapRef = useRef(null);
  const cityCenter = offers[0].city;
  const markerGroup = useRef(L.layerGroup());

  const { location: { latitude: lat, longitude: lng, zoom } } = cityCenter;

  const defaultCustomIcon = leaflet.icon({
    iconUrl: DEFAULT.URL,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: CUSTOM.URL,
    iconSize: [27, 39],
    iconAnchor: [13, 39],
  });

  const map = useMap(mapRef, cityCenter);

  useEffect(() => {
    if (map) {
      markerGroup.current.clearLayers();
      markerGroup.current.addTo(map);

      offers.forEach(({ id, location: { latitude, longitude } }) => {
        leaflet
          .marker({
            lat: latitude,
            lng: longitude,
          }, {
            icon: (id === idForMap)
              ? currentCustomIcon
              : defaultCustomIcon,
            alt: id === idForMap ? CUSTOM.ALT : DEFAULT.ALT,
          })
          .addTo(markerGroup.current);
      });
      map.flyTo([lat, lng], zoom);
    }
  }, [currentCustomIcon, defaultCustomIcon, lat, lng, map, markerGroup, offers, offerId, zoom, idForMap]);

  return (
    <div
      data-testid="Map"
      style={{ height: '100%' }}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
