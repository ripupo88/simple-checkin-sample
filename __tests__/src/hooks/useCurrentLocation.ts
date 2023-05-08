import {renderHook} from '@testing-library/react-hooks';
import {useCurrentLocation} from '../../../src/hooks/useCurrentLocation';
import GetLocation from 'react-native-get-location';

jest.mock('react-native-get-location', () => ({
  getCurrentPosition: jest.fn(),
}));

jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    IOS: {LOCATION_WHEN_IN_USE: 'ios-location-when-in-use'},
    ANDROID: {ACCESS_FINE_LOCATION: 'android-access-fine-location'},
  },
  request: jest.fn(),
}));

describe('useCurrentLocation', () => {
  it('should return current location when it is available', async () => {
    const location = {
      latitude: 37.785834,
      longitude: -122.406417,
      accuracy: 10,
      altitude: 0,
      speed: 0,
      heading: 0,
    };

    (GetLocation.getCurrentPosition as jest.Mock).mockResolvedValue(location);
    const {result, waitForNextUpdate} = renderHook(() => useCurrentLocation());
    await waitForNextUpdate();
    expect(GetLocation.getCurrentPosition).toHaveBeenCalled();
    expect(result.current[0]).toEqual(location);
  });

  it('should handle error when location is not available', async () => {
    const error = {code: 1, message: 'Location not available'};
    (GetLocation.getCurrentPosition as jest.Mock).mockRejectedValue(error);
    const {result, waitForNextUpdate} = renderHook(() => useCurrentLocation());
    await waitForNextUpdate({timeout: 5000});
    expect(result.current[0]).toBeUndefined();
  });
});
