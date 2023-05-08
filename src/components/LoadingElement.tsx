import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {TextElement} from './TextElement';
import {useCustomTheme} from '../context/ThemeContext';
import * as source from '../assets/animations/dog.json';

export const LoadingElement: FC = () => {
  const {theme} = useCustomTheme();
  const {backgroundColor1} = theme;

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor1}]}>
      <View style={styles.animationContainer}>
        <Lottie source={source} autoPlay loop />
      </View>
      <View style={styles.textContainer}>
        <TextElement style={styles.text}>loading...</TextElement>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    flex: 1,
  },
});
