import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../constants/types/screen.data';
const Stack = createStackNavigator();

const CommonStack = () => {
    const nav = useNavigation();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={ScreenNames.SPLASH_SCREEN}
                component={() => { return null }}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default CommonStack