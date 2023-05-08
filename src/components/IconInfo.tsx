import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextElement} from './TextElement';
import {useCustomTheme} from '../context/ThemeContext';

type Props = {
  text: string;
  iconName: string;
};

export const IconInfo: FC<Props> = ({text, iconName}) => {
  const {theme} = useCustomTheme();
  const {text1: textPrimary} = theme;
  return (
    <View style={styles.container}>
      <Icon size={20} name={iconName} color={textPrimary} />
      <TextElement style={styles.text}>{text}</TextElement>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  text: {
    fontWeight: '400',
    fontSize: 14,
  },
});
