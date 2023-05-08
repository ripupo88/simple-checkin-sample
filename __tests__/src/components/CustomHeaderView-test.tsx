import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {CustomHeaderView} from '../../../src/components/CustomHeaderView';
import {ThemeProvider} from '../../../src/context/ThemeContext';

describe('CustomHeaderView', () => {
  const navigation: any = {
    canGoBack: jest.fn(),
    goBack: jest.fn(),
  };
  const options = {title: 'Test Title'};

  it('renders header with title', () => {
    const {getByText} = render(
      <ThemeProvider>
        <CustomHeaderView
          headerBGColor="#000000"
          textPrimary="#FFFFFF"
          options={options}
          handleChangeTheme={() => {}}
          iconName="moon-outline"
          navigation={navigation}
        />
      </ThemeProvider>,
    );

    expect(getByText(options.title)).toBeDefined();
  });

  it('calls goBack function when back button is pressed', () => {
    navigation.canGoBack.mockReturnValueOnce(true);
    const {getByTestId} = render(
      <ThemeProvider>
        <CustomHeaderView
          headerBGColor="#000000"
          navigation={navigation}
          textPrimary="#FFFFFF"
          options={options}
          handleChangeTheme={() => {}}
          iconName="moon-outline"
        />
      </ThemeProvider>,
    );

    fireEvent.press(getByTestId('back-button'));

    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('calls handleChangeTheme function when theme button is pressed', () => {
    const handleChangeTheme = jest.fn();
    const {getByTestId} = render(
      <ThemeProvider>
        <CustomHeaderView
          headerBGColor="#000000"
          navigation={navigation}
          textPrimary="#FFFFFF"
          options={options}
          handleChangeTheme={handleChangeTheme}
          iconName="moon-outline"
        />
      </ThemeProvider>,
    );

    fireEvent.press(getByTestId('theme-button'));

    expect(handleChangeTheme).toHaveBeenCalledTimes(1);
  });
});
