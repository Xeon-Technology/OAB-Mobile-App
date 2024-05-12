import { ImageSourcePropType } from "react-native";
import i18n from 'i18n-js';

export const ScreenNames = {
    SPLASH: "Splash",
    LOGIN: "Login",
    DASHBOARD: "Dashboard",
    SPLASH_SCREEN: "SplashScreen",
    COMMON_STACK: "CommonStack",
}

export interface IUserScreen {
    name: string;
    to: string;
    icon: ImageSourcePropType;
}

export type ScreenNameType = {}



