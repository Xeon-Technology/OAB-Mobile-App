import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../constants/types/screen.data';
import { useScreenOptions } from '../hooks';
import RetailSales from '../screens/MainScreen/RetailSales';
const Stack = createStackNavigator();

const CommonStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={ScreenNames.RETAIL_SALES}
                component={RetailSales}
                options={{
                    title: 'Retail Sales'
                }}
            />
        </Stack.Navigator>
    )
}

export default CommonStack