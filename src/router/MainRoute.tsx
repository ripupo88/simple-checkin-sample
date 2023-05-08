import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {MapScreen} from '../screens/MapScreen';
import {ListScreen} from '../screens/ListScreen';
import {CustomHeader} from '../components/CustomHeader';

export type MainStackParams = {
  ListScreen?: undefined;
  MapScreen: {coordinate: {lat: string; lng: string}};
};

const Stack = createStackNavigator<MainStackParams>();

export const MainRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListScreen"
      screenOptions={{
        header: CustomHeader,
      }}>
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{title: 'Store location'}}
      />
      <Stack.Screen
        name="ListScreen"
        options={{title: 'Stores list'}}
        component={ListScreen}
      />
    </Stack.Navigator>
  );
};
