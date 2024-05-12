import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../constants/types/screen.data';
import Dashboard from '../screens/MainScreen/Dashboard';
import { useScreenOptions } from '../hooks';
const Stack = createStackNavigator();

const CommonStack = () => {
    const nav = useNavigation();
    const screenOptions = useScreenOptions();

    return (
        <Stack.Navigator screenOptions={screenOptions.stack}>
            <Stack.Screen
                name={ScreenNames.DASHBOARD}
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}

export default CommonStack