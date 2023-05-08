import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {TextElement} from './TextElement';
import {useCustomTheme} from '../context/ThemeContext';
import * as source from '../assets/animations/error.json';

type Props = {
  onRetry: () => void;
};

export const ErrorElement: FC<Props> = ({onRetry}) => {
  const {theme} = useCustomTheme();
  const {backgroundColor1} = theme;

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor1}]}>
      <View style={styles.animationContainer}>
        <Lottie source={source} autoPlay loop />
      </View>
      <TouchableOpacity onPress={onRetry} style={styles.button}>
        <TextElement style={styles.text}>retry</TextElement>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 30,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    flex: 1,
  },
});
