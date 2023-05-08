import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ErrorElement} from '../../../src/components/ErrorElement';
import {ThemeProvider} from '../../../src/context/ThemeContext';

describe('ErrorElement', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <ThemeProvider>
        <ErrorElement onRetry={() => {}} />
      </ThemeProvider>,
    );
    expect(getByText('retry')).toBeTruthy();
  });

  it('should call onRetry when the retry button is pressed', () => {
    const onRetryMock = jest.fn();
    const {getByText} = render(
      <ThemeProvider>
        <ErrorElement onRetry={onRetryMock} />
      </ThemeProvider>,
    );
    fireEvent.press(getByText('retry'));
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    const {toJSON} = render(
      <ThemeProvider>
        <ErrorElement onRetry={() => {}} />
      </ThemeProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
