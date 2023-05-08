import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Linking, Platform, StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Container} from '../components/Container';
import {PERMISSIONS, request} from 'react-native-permissions';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParams} from '../router/MainRoute';
import {TextElement} from '../components/TextElement';
import {ButtonCircle} from '../components/ButtonSecondary';
import {getGoogleMapsLink} from '../helper/getGoogleMapsUrl';

type Props = StackScreenProps<MainStackParams, 'MapScreen'>;

export const MapScreen: FC<Props> = ({route}) => {
  const {coordinate} = route.params;
  const parsedCoordinate = {
    latitude: parseFloat(coordinate.lat),
    longitude: parseFloat(coordinate.lng),
  };

  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const openGoogleMaps = () => {
    const link = getGoogleMapsLink({
      latitude: coordinate.lat,
      longitude: coordinate.lng,
    });

    Linking.openURL(link);
  };

  return (
    <Container>
      <View style={styles.coverContainer}>
        <ButtonCircle onPress={openGoogleMaps}>
          <TextElement>Go to the store</TextElement>
        </ButtonCircle>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        style={styles.map}
        region={{
          ...parsedCoordinate,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          image={require('../assets/img/marker.png')}
          coordinate={parsedCoordinate}
        />
      </MapView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  coverContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 50,
    left: 100,
    zIndex: 99,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
