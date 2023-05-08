import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {useCustomTheme} from '../context/ThemeContext';

export const Container: FC<PropsWithChildren> = ({children}) => {
  const {theme} = useCustomTheme();
  const {backgroundColor1: backgroundColor} = theme;

  return <View style={[styles.container, {backgroundColor}]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
