import {GOOGLE_MAPS_URL} from '../../../src/config/config';
import {getGoogleMapsLink} from '../../../src/helper/getGoogleMapsUrl';

describe('getGoogleMapsLink', () => {
  it('returns a valid Google Maps URL', () => {
    const props = {latitude: '40.7128', longitude: '-74.0060'};
    const expectedUrl = `${GOOGLE_MAPS_URL}/?api=1&query=${props.latitude},${props.longitude}`;
    const result = getGoogleMapsLink(props);
    expect(result).toEqual(expectedUrl);
  });
});
