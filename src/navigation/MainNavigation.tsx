import { createStackNavigator } from "@react-navigation/stack";
import { Block } from "../components";
import { ScreenNames } from "../constants/types/screen.data";
import CommonStack from "./CommonStack";
import SplashComp from "../screens/MainScreen/SplashScreen";
import Login from "../screens/MainScreen/Login";
import OABMenu from "./OABMenu";
import { useTheme } from "../hooks";


export default function MainNavigation() {
    const { gradients } = useTheme();
    const Stack = createStackNavigator()

    return (
        <Block gradient={gradients.light}>
            <Stack.Navigator initialRouteName={ScreenNames.SPLASH}>
                <Stack.Screen name={ScreenNames.SPLASH} options={{ headerShown: false, }} component={SplashComp} />
                <Stack.Screen name={ScreenNames.LOGIN} options={{ headerShown: false, }} component={Login} />
                <Stack.Screen name={ScreenNames.OAB_MENU} options={{ headerShown: false, }} component={OABMenu} />
                <Stack.Screen name={ScreenNames.COMMON_STACK} options={{ headerShown: false, }} component={CommonStack} />
            </Stack.Navigator>
        </Block>
    );
};