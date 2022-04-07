import {
  MutableRefObject,
  useEffect,
  useState
} from 'react';
import leaflet from 'leaflet';
import { Map } from 'leaflet';
import { City } from '../types/city';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const LEAFLET_DATA = {
    URL_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',

  };

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        zoomControl: false,
      });

      leaflet
        .tileLayer(
          LEAFLET_DATA.URL,
          {
            attribution: LEAFLET_DATA.ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, city, LEAFLET_DATA.URL, LEAFLET_DATA.ATTRIBUTION]);

  return map;
}

export default useMap;
