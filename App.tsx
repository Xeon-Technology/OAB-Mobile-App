import 'react-native-gesture-handler';
import React from 'react';
import { DataProvider } from './src/hooks';
import AppNavigation from './src/navigation/App';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/core/network/graphql/GraphQlClient';
import { ErrorHandler } from './src/utils/globalErrorHandler';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <ErrorHandler>
          <AppNavigation />
        </ErrorHandler>
      </DataProvider>
    </ApolloProvider>

  );
}
