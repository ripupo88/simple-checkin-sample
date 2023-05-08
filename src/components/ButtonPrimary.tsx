import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useCustomTheme} from '../context/ThemeContext';

interface Props extends PropsWithChildren {
  onPress: () => void;
  disabled?: boolean;
}

export const ButtonPrimary: FC<Props> = props => {
  const {children, onPress, disabled = false} = props;
  const {theme} = useCustomTheme();
  const {text1} = theme;
  const backgroundColor = disabled ? '#444' : 'transparent';

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      testID="button-primary"
      activeOpacity={0.6}
      style={[styles.buttonActive, {borderColor: text1, backgroundColor}]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonActive: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.6,
  },
});
