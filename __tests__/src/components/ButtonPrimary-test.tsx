import React from 'react';
import {ButtonPrimary} from '../../../src/components/ButtonPrimary';
import {fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from '../../../src/context/ThemeContext';

describe('ButtonPrimary', () => {
  test('calls onPress when button is pressed', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <ThemeProvider>
        <ButtonPrimary onPress={onPress}>Press me!</ButtonPrimary>
      </ThemeProvider>,
    );
    fireEvent.press(getByTestId('button-primary'));
    expect(onPress).toHaveBeenCalled();
  });

  test('button color is grey when disabled prop is true', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <ButtonPrimary disabled onPress={() => console.log('Button pressed')}>
          Press me!
        </ButtonPrimary>
      </ThemeProvider>,
    );
    const button = getByTestId('button-primary');
    expect(button.props.style.backgroundColor).toBe('#444');
  });

  test('button color is transparent when disabled prop is false', () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <ButtonPrimary onPress={() => console.log('Button pressed')}>
          Press me!
        </ButtonPrimary>
      </ThemeProvider>,
    );
    const button = getByTestId('button-primary');
    expect(button.props.style.backgroundColor).toBe('transparent');
  });
});
