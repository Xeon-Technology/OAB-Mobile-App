import { ImageSourcePropType } from "react-native";
import i18n from 'i18n-js';

export const ScreenNames = {
    SPLASH: "Splash",
    LOGIN: "Login",
    OAB_MENU: "OABMenu",
    DASHBOARD: "Dashboard",
    COMMON_STACK: "CommonStack",
    RETAIL_SALES: "RetailSales",
}

export interface IUserScreen {
    name: string;
    to: string;
    icon: ImageSourcePropType;
}

export type ScreenNameType = {}



