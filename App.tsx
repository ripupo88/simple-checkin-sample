import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainRoute} from './src/router/MainRoute';
import {ThemeProvider} from './src/context/ThemeContext';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <ThemeProvider>
          <MainRoute />
        </ThemeProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
