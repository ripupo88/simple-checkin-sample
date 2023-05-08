import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, Text, StyleProp, TextStyle} from 'react-native';
import {useCustomTheme} from '../context/ThemeContext';

interface Props extends PropsWithChildren {
  style?: StyleProp<TextStyle>;
  lines?: number;
}

export const TextElement: FC<Props> = ({children, style, lines = 1}) => {
  const {theme} = useCustomTheme();
  const {text1} = theme;

  return (
    <Text numberOfLines={lines} style={[styles.text, style, {color: text1}]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
