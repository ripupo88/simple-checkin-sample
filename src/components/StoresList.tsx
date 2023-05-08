import React, {FC, useCallback} from 'react';
import {Store} from '../types/store';
import {FlatList} from 'react-native';
import {StoreTile, StoreTileProps} from './StoreTile';
import {Location} from 'react-native-get-location';

type Props = {
  storesList?: Store[];
  location?: Location;
};

export const StoresListElement: FC<Props> = ({storesList, location}) => {
  const renderItem = useCallback(
    ({item, index}: StoreTileProps) => (
      <StoreTile item={item} index={index} location={location} />
    ),
    [location],
  );

  return <FlatList data={storesList} renderItem={renderItem} />;
};
