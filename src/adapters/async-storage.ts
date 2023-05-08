import AsyncStorag from '@react-native-async-storage/async-storage';

export const AsyncStorage = {
  async setItem(key: string, value: any) {
    await AsyncStorag.setItem(key, JSON.stringify(value));
  },
  async getItem(key: string) {
    const resp = await AsyncStorag.getItem(key);
    if (typeof resp === 'string') {
      return JSON.parse(resp);
    }
  },
  removeItem(key: string) {
    AsyncStorag.removeItem(key);
  },
  clear() {
    AsyncStorag.clear();
  },
};
