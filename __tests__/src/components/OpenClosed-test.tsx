import React from 'react';
import {render} from '@testing-library/react-native';
import {OpenClosed} from '../../../src/components/OpenClosed';

describe('OpenClosed', () => {
  it('should set the animation size to the provided size prop', () => {
    const size = 200;
    const {getByTestId} = render(<OpenClosed isOPen size={size} />);
    const animation = getByTestId('lottie-animation');
    expect(animation.props.style.height).toBe(size);
  });
});
