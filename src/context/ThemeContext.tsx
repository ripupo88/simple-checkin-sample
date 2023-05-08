import React, {useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import {
  ColorSchemeName,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {LightTheme, ThemeProps, darkTheme} from '../constants/Theme';
import {AsyncStorage} from '../adapters/async-storage';

interface ThemeInterface {
  theme: ThemeProps;
  changeTheme: (theme: ColorSchemeName) => void;
  currentTheme: ColorSchemeName;
}

export const useCustomTheme = () => useContext(ThemeContext);

const ThemeContext = createContext({} as ThemeInterface);
export const ThemeProvider = ({children}: any) => {
  const [currentTheme, setCurrentTheme] = useState<ColorSchemeName>('light');

  const theme = currentTheme === 'light' ? LightTheme : darkTheme;

  const getThemeFromLocal = async () => {
    const initialTheme = (await AsyncStorage.getItem('theme')) || 'light';
    setCurrentTheme(initialTheme);
  };

  const changeTheme = (newTheme: ColorSchemeName) => {
    if (!newTheme) {
      return;
    }
    AsyncStorage.setItem('theme', newTheme);
    setCurrentTheme(newTheme);
  };

  useEffect(() => {
    getThemeFromLocal();
  }, []);

  const isLight = currentTheme === 'light';

  return (
    <ThemeContext.Provider value={{theme, changeTheme, currentTheme}}>
      <View
        style={[styles.statusBar, {backgroundColor: theme.backgroundColor2}]}
      />
      <StatusBar
        barStyle={isLight ? 'dark-content' : 'light-content'}
        backgroundColor={theme.backgroundColor2}
      />
      {children}
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? 60 : 0,
    width: '100%',
  },
});
