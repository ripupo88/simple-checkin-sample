import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {FC} from 'react';
import {TextElement} from './TextElement';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Task} from '../types/store';
import {useCustomTheme} from '../context/ThemeContext';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  BottomSheetRef: React.Ref<BottomSheetMethods>;
  onClose: () => void;
  tasks: Task[];
  onSelect: (task: Task) => void;
}

export const TasksBottomSheet: FC<Props> = props => {
  const {BottomSheetRef, onClose, tasks, onSelect} = props;

  const {theme} = useCustomTheme();
  const {backgroundColor2, text1} = theme;

  const haveTasks = tasks.length > 0;

  return (
    <BottomSheet
      enablePanDownToClose
      ref={BottomSheetRef}
      onClose={onClose}
      index={haveTasks ? 0 : -1}
      backgroundStyle={{backgroundColor: backgroundColor2}}
      handleIndicatorStyle={{backgroundColor: text1}}
      snapPoints={['40%']}>
      <BottomSheetScrollView>
        <View style={styles.tileContainer}>
          <TextElement style={styles.title}>Tasks</TextElement>
        </View>
        {tasks.map(task => {
          const textDecorationLine = task.assigned ? 'line-through' : 'none';

          const handleOnselect = () => {
            onSelect(task);
          };

          return (
            <TouchableOpacity
              disabled={task.assigned}
              key={task.id}
              onPress={handleOnselect}
              style={styles.tileContainer}>
              <TextElement
                style={{
                  textDecorationLine,
                }}>
                {task.description}
              </TextElement>
            </TouchableOpacity>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    height: 60,
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#77777788',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
  },
});
