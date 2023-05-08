import {GOOGLE_MAPS_URL} from '../config/config';

type Props = {
  latitude: string;
  longitude: string;
};
export const getGoogleMapsLink = ({latitude, longitude}: Props) => {
  return `${GOOGLE_MAPS_URL}/?api=1&query=${latitude},${longitude}`;
};
