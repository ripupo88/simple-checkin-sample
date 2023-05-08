import React, {FC, PropsWithChildren, useEffect} from 'react';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface FromRightProps extends PropsWithChildren {
  delay: number;
}

export const AnimatedRightIn: FC<FromRightProps> = ({children, delay}) => {
  const x = useSharedValue(500);

  useEffect(() => {
    x.value = withDelay(delay, withTiming(0));
  }, [delay, x]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}],
    };
  });

  return <Animated.View style={[animatedStyles]}>{children}</Animated.View>;
};
