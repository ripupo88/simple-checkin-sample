import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import * as opened from '../assets/animations/open.json';
import * as closed from '../assets/animations/closed.json';

type Props = {
  isOPen: boolean;
  size?: number;
};

export const OpenClosed: FC<Props> = ({isOPen, size = 130}) => {
  const openClose = isOPen ? opened : closed;

  return (
    <View style={styles.container}>
      <Lottie
        testID="lottie-animation"
        style={{height: size}}
        source={openClose}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: -30,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
});
