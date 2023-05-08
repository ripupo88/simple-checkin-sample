import React, {FC, PropsWithChildren, useEffect} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface FromRightProps extends PropsWithChildren {
  delay: number;
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
}

export const AnimatedTopIn: FC<FromRightProps> = props => {
  const {children, delay, isVisible, style} = props;
  const x = useSharedValue(110);

  useEffect(() => {
    if (isVisible) {
      x.value = withDelay(delay, withTiming(0, {duration: 400}));
    } else {
      x.value = withDelay(delay, withTiming(110, {duration: 200}));
    }
  }, [delay, x, isVisible]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: 110 - x.value,
      transform: [{translateY: -1 * x.value}],
    };
  });
  return (
    <Animated.View style={[animatedStyles, style]}>{children}</Animated.View>
  );
};
