import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from '../constants/types/screen.data';
import RetailSales from '../screens/MainScreen/RetailSales';
import CustomerInformation from '../screens/MainScreen/CustomerInformation';
import Payment from '../screens/MainScreen/Payment';
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
            <Stack.Screen
                name={ScreenNames.CUSTOMER_INFORMATION}
                component={CustomerInformation}
                options={{
                    title: 'Customer Information'
                }}
            />
            <Stack.Screen
                name={ScreenNames.PAYMENT}
                component={Payment}
                options={{
                    title: 'Make a Payment'
                }}
            />
        </Stack.Navigator>
    )
}

export default CommonStack