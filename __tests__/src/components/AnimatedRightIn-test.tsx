import React from 'react';
import {render} from '@testing-library/react-native';
import {AnimatedRightIn} from '../../../src/components/AnimatedRightIn';
import {Text} from 'react-native';

describe('AnimatedRightIn', () => {
  it('should render children', () => {
    const {getByText} = render(
      <AnimatedRightIn delay={0}>
        <Text>Hello World</Text>
      </AnimatedRightIn>,
    );

    expect(getByText('Hello World')).toBeDefined();
  });
});
