import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useScreenOptions, useTranslation } from '../hooks';
import Dashboard from '../screens/MainScreen/Dashboard';
import { ScreenNames } from '../constants/types/screen.data';

const Stack = createStackNavigator();

export default () => {
  const { t } = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name={ScreenNames.DASHBOARD}
        component={Dashboard}
        options={{ title: "Dashboard" }}
      />

    </Stack.Navigator>
  );
};
