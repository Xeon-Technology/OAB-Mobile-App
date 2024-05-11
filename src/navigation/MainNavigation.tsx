import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../hooks";
import { Block } from "../components";
import { ScreenNames } from "../constants/types/screen.data";
import CommonStack from "./CommonStack";
import SplashComp from "../screens/MainStack/SplashScreen";
import Login from "../screens/MainStack/Login";


export default function MainNavigation() {
    const { gradients } = useTheme();
    const Stack = createStackNavigator()

    return (
        <Block gradient={gradients.light}>
            <Stack.Navigator initialRouteName={ScreenNames.SPLASH_SCREEN}>
                <Stack.Screen name={ScreenNames.SPLASH_SCREEN} options={{ headerShown: false, }} component={SplashComp} />
                <Stack.Screen name={ScreenNames.LOGIN} options={{ headerShown: false, }} component={Login} />
                {/* <Stack.Screen name={ScreenNames.SIGN_UP} options={{ headerShown: false, }} component={SignUp} /> */}
                <Stack.Screen name={ScreenNames.COMMON_STACK} options={{ headerShown: false, }} component={CommonStack} />
            </Stack.Navigator>
        </Block>
    );
};