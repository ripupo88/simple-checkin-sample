import React, {useCallback, useEffect, useRef} from 'react';
import {Container} from '../components/Container';
import BottomSheet from '@gorhom/bottom-sheet';
import {useTasksActions, useTasksList} from '../store/tasks';
import {TasksBottomSheet} from '../components/TasksBottomSheet';
import {Task} from '../types/store';
import {MainHeader} from '../components/ToggleableHeader';
import {LoadingElement} from '../components/LoadingElement';
import {ErrorElement} from '../components/ErrorElement';
import {StoresListElement} from '../components/StoresList';
import {useCurrentLocation} from '../hooks/useCurrentLocation';
import {useCheckIn, useCheckOut, useGetStoresList} from '../api/repository';
import {AsyncStorage} from '../adapters/async-storage';

export const ListScreen = () => {
  const {tasks, storeId} = useTasksList();
  const {removeCurrentTask, setCurrentTask, setTasksList} = useTasksActions();

  const [userLocation] = useCurrentLocation();

  const {mutateAsync: checkOutMutate} = useCheckOut();
  const {mutate: checkInMutate} = useCheckIn();
  const {
    data: storesList,
    isLoading,
    error,
    refetch: refetchStores,
  } = useGetStoresList();

  const BottomSheetRef = useRef<BottomSheet>(null);

  const handleRemoveTasks = useCallback(() => {
    setTasksList([]);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('task').then(task => {
      if (task) {
        setCurrentTask(task);
      }
    });
  }, []);

  const handleSelectTask = (task: Task) => {
    const taskId = parseInt(task.id, 10);

    checkInMutate({taskId, storeId});
    setCurrentTask(task);

    BottomSheetRef.current?.close();
  };

  const handleCheckOut = async () => {
    await checkOutMutate();
    refetchStores();
    removeCurrentTask();
  };

  if (isLoading) {
    return <LoadingElement />;
  }
  if (error) {
    return <ErrorElement onRetry={refetchStores} />;
  }

  return (
    <Container>
      <MainHeader handleCheckOut={handleCheckOut} />
      <StoresListElement storesList={storesList} location={userLocation} />
      <TasksBottomSheet
        onClose={handleRemoveTasks}
        BottomSheetRef={BottomSheetRef}
        tasks={tasks}
        onSelect={handleSelectTask}
      />
    </Container>
  );
};
