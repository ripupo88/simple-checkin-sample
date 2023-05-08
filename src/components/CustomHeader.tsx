import {StackHeaderProps} from '@react-navigation/stack';
import {useCustomTheme} from '../context/ThemeContext';
import React from 'react';
import {CustomHeaderView} from './CustomHeaderView';

export const CustomHeader = (props: StackHeaderProps): JSX.Element => {
  const {navigation, options} = props;
  const {changeTheme, currentTheme, theme} = useCustomTheme();
  const {backgroundColor2: headerBGColor, text1: textPrimary} = theme;

  const isDark = currentTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  const iconName: string = isDark ? 'moon-outline' : 'sunny-outline';

  const handleChangeTheme = () => {
    changeTheme(nextTheme);
  };

  return (
    <CustomHeaderView
      handleChangeTheme={handleChangeTheme}
      headerBGColor={headerBGColor}
      iconName={iconName}
      navigation={navigation}
      options={options}
      textPrimary={textPrimary}
    />
  );
};
