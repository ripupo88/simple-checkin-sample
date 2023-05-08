import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useCustomTheme} from '../context/ThemeContext';

interface Props extends PropsWithChildren {
  onPress: () => void;
}

export const ButtonCircle: FC<Props> = ({onPress, children}) => {
  const {theme} = useCustomTheme();
  const {backgroundColor1: backgroundColor} = theme;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor}]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 11,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#00000066',
  },
});
