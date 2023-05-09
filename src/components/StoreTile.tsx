import {View, StyleSheet} from 'react-native';
import {useCustomTheme} from '../context/ThemeContext';
import {TextElement} from './TextElement';
import React, {FC, useEffect, useState} from 'react';
import {Store} from '../types/store';
import {getDistance} from 'geolib';
import {GeolibInputCoordinates} from 'geolib/es/types';
import {OpenClosed} from './OpenClosed';
import {AnimatedRightIn} from './AnimatedRightIn';
import {IconInfo} from './IconInfo';
import {ButtonPrimary} from './ButtonPrimary';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParams} from '../router/MainRoute';
import {useCurrentTask, useTasksActions} from '../store/tasks';
import {mapLocation} from '../helper/mappers';
import {Location} from 'react-native-get-location';

export type StoreTileProps = {
  item: Store;
  index: number;
  location?: Location;
};

export const StoreTile: FC<StoreTileProps> = props => {
  const {item: store, index, location: userLocation} = props;

  const navigation = useNavigation<NavigationProp<MainStackParams>>();

  const {description} = useCurrentTask();
  const isTaskActive = !!description;

  const {setTasksList} = useTasksActions();

  const {theme} = useCustomTheme();
  const {backgroundColor3: storeTileColor} = theme;

  const schedule = `${store.schedule.from} - ${store.schedule.end}`;

  const [distance, setdistance] = useState<string>('');
  const storeLocation: GeolibInputCoordinates = mapLocation(store);

  useEffect(() => {
    if (!userLocation) {
      return;
    }
    const distanceResult = getDistance(userLocation, storeLocation);
    const formatedDistanceResult = (distanceResult / 1000).toFixed(1);
    setdistance(`${formatedDistanceResult} km`);
  }, [userLocation]);

  const handleViewMap = () => {
    navigation.navigate('MapScreen', {coordinate: store.address.coordinate});
  };

  const isStoreOpen = store.open;
  const isDisabledTaskButton = isTaskActive || !isStoreOpen;

  const handleSetTasks = () => {
    const parsedStoreId = parseInt(store.id, 10);
    setTasksList(store.tasks, parsedStoreId);
  };

  return (
    <AnimatedRightIn delay={index * 50}>
      <View style={styles.tileContainer}>
        <View style={[styles.tileElement, {backgroundColor: storeTileColor}]}>
          <View style={styles.bottomRow}>
            <View style={styles.titleContainer}>
              <TextElement lines={2} style={styles.title}>
                {store.name}
              </TextElement>
              <TextElement lines={2} style={styles.subTitle}>
                {store.address.direction}
              </TextElement>
            </View>
            <View style={styles.openCloseContainer}>
              <OpenClosed isOPen={store.open} size={140} />
            </View>
          </View>
          <View style={styles.bottomRow}>
            <ButtonPrimary onPress={handleViewMap}>
              <IconInfo text={distance} iconName="md-location-outline" />
            </ButtonPrimary>
            <ButtonPrimary
              disabled={isDisabledTaskButton}
              onPress={handleSetTasks}>
              <IconInfo
                text={`${store.tasks.length} tasks`}
                iconName="ios-list-circle-outline"
              />
            </ButtonPrimary>
            <IconInfo text={schedule} iconName="ios-timer-outline" />
          </View>
        </View>
      </View>
    </AnimatedRightIn>
  );
};

const styles = StyleSheet.create({
  openCloseContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 4,
  },
  tileContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  tileElement: {
    width: '95%',
    flex: 1,
    backgroundColor: '#e642ffaa',
    borderRadius: 15,
    padding: 10,
  },
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
  },
  subTitle: {
    fontWeight: '300',
    fontSize: 15,
  },
});
