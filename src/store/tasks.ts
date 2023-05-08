import {create} from 'zustand';
import {shallow} from 'zustand/shallow';
import {Task} from '../types/store';
import {AsyncStorage} from '../adapters/async-storage';

type UseTasksStore = {
  storeId: number;
  currentTask: Task;
  tasksList: Task[];
  actions: actions;
};

type actions = {
  setTasksList: (tasksList?: Task[], storeId?: number) => void;
  setCurrentTask: (task: Task) => void;
  removeCurrentTask: () => void;
};

const defaultTask = {
  assigned: false,
  description: '',
  id: '0',
};

const useTasksStore = create<UseTasksStore>(set => ({
  storeId: 0,
  currentTask: defaultTask,
  tasksList: [],
  actions: {
    setTasksList: (tasksList = [], storeId = 0) =>
      set(() => ({tasksList, storeId})),
    setCurrentTask: task => {
      AsyncStorage.setItem('task', task);
      set(() => ({currentTask: task}));
    },
    removeCurrentTask: () => {
      AsyncStorage.removeItem('task');
      set(() => ({currentTask: defaultTask}));
    },
  },
}));

export const useCurrentTask = () =>
  useTasksStore(state => state.currentTask, shallow);

export const useTasksList = () =>
  useTasksStore(
    state => ({
      tasks: state.tasksList,
      storeId: state.storeId,
    }),
    shallow,
  );

export const useTasksActions = () => useTasksStore(state => state.actions);
