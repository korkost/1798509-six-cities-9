import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { PIN, PIN_ACTIVE, DEFAULT_ANCHOR_SIZE, DEFAULT_ICON_SIZE } from '../../consts';
import useMap from '../../hooks/useMap';
import { Offer } from '../../types/offer';

type MapProps = {
  offers: Offer[];
  selectedPoint: number;
};

function Map({offers, selectedPoint}: MapProps) {
  const currentCity = offers[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);
  const {location: {latitude: lat, longitude: lng, zoom}} = currentCity;

  const defaultCustomIcon = leaflet.icon({
    iconUrl: PIN,
    iconSize: DEFAULT_ICON_SIZE,
    iconAnchor: DEFAULT_ANCHOR_SIZE,
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: PIN_ACTIVE,
    iconSize: DEFAULT_ICON_SIZE,
    iconAnchor: DEFAULT_ANCHOR_SIZE,
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
