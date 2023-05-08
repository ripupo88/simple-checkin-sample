import {ColorValue} from 'react-native';

export interface ThemeProps {
  text1: ColorValue;
  text2: ColorValue;
  backgroundColor1: ColorValue;
  backgroundColor2: ColorValue;
  backgroundColor3: ColorValue;
  backgroundColor4: ColorValue;
}

export const LightTheme: ThemeProps = {
  text1: '#000000cc',
  text2: '#ffffffcc',
  backgroundColor1: '#fff',
  backgroundColor2: '#D1ACFB',
  backgroundColor3: '#6E72d9',
  backgroundColor4: '#BDA95A',
};

export const darkTheme: ThemeProps = {
  text1: '#ffffffcc',
  text2: '#000000cc',
  backgroundColor1: '#000000ee',
  backgroundColor2: '#524264',
  backgroundColor3: '#34366E',
  backgroundColor4: '#5A5029',
};
