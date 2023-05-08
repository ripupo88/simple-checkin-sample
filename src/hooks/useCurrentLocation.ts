import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import GetLocation, {Location} from 'react-native-get-location';
import {PERMISSIONS, request} from 'react-native-permissions';

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [error, setError] = useState<string>();

  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
  };

  const getLocation = async () => {
    await requestPermission();
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setCurrentLocation(location);
      })
      .catch(err => {
        const {message} = err;
        setError(message);
      });
  };

  useEffect(() => {
    if (!currentLocation && !error) {
      getLocation();
    }
  }, []);

  return [currentLocation];
};
