import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {useCustomTheme} from '../context/ThemeContext';
import {TextElement} from './TextElement';
import {ButtonPrimary} from './ButtonPrimary';
import {IconInfo} from './IconInfo';
import {useCurrentTask} from '../store/tasks';
import {AnimatedTopIn} from './AnimatedTopIn';

type Props = {
  handleCheckOut: () => void;
};

export const MainHeader: FC<Props> = ({handleCheckOut}) => {
  const {theme} = useCustomTheme();
  const {backgroundColor3: storeTileColor} = theme;

  const currentTask = useCurrentTask();
  const {description} = currentTask;

  const isHeaderVisible = !!currentTask.description;
  return (
    <AnimatedTopIn
      delay={100}
      isVisible={isHeaderVisible}
      style={[styles.container, {backgroundColor: storeTileColor}]}>
      <View style={styles.subContainer}>
        <TextElement>Current Task:</TextElement>
        <View style={styles.titleContainer}>
          <View style={styles.leftSide}>
            <TextElement style={styles.timeText}>{description}</TextElement>
          </View>
          <View style={styles.checkOut}>
            <ButtonPrimary onPress={handleCheckOut}>
              <IconInfo text={'Check out'} iconName="md-walk-outline" />
            </ButtonPrimary>
          </View>
        </View>
      </View>
    </AnimatedTopIn>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#888888',
    borderBottomWidth: 1,
  },
  subContainer: {padding: 20},
  timeText: {
    fontSize: 35,
  },
  checkOut: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  leftSide: {
    flex: 2,
  },
  titleContainer: {
    flexDirection: 'row',
  },
});
