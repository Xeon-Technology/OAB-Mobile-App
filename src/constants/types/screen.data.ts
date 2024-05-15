import { ImageSourcePropType } from "react-native";
import i18n from 'i18n-js';

export const ScreenNames = {
    SPLASH: "Splash",
    LOGIN: "Login",
    OAB_MENU: "OABMenu",
    DASHBOARD: "Dashboard",
    COMMON_STACK: "CommonStack",
    RETAIL_SALES: "RetailSales",
    LONG_TERM_SEASONAL_SALES: "LongTermSeasonalSales",
    BUDGET: "Budget",
    DELIVERY: "Delivery",
    SETTINGS: "Settings",
    APPROVAL: "Approval",
    SALES_REPORT: "SalesReport",
}

export interface IUserScreen {
    name: string;
    to: string;
    icon: ImageSourcePropType;
}

export type ScreenNameType = {}



