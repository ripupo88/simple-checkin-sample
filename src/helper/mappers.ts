import {GeolibInputCoordinates} from 'geolib/es/types';
import {Store} from '../types/store';

export const mapLocation = (item: Store): GeolibInputCoordinates => ({
  latitude: item.address.coordinate.lat,
  longitude: item.address.coordinate.lng,
});
