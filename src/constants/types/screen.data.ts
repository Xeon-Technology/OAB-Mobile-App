import { ImageSourcePropType } from "react-native";
import i18n from 'i18n-js';
import { ThemeAssets, ThemeIcons } from "./theme";

export const ScreenNames = {
    SPLASH: "Splash",
    LOGIN: "Login",
    SIGN_UP: "SignUp",
    HOME: "Home",
    SPLASH_SCREEN: "SplashScreen",
    COMMON_STACK: "CommonStack",
}

export const ScreenNavigators = {
    ROOT_NAV: "ROOT",
    HOME_NAV: "Home",
}

export const UserScreens = (t: Translation, assets: ThemeAssets & ThemeIcons): IUserScreen[] => {
    let screens: IUserScreen[] = [];
    screens.push({ name: t('screens.home'), to: ScreenNames.HOME, icon: assets.android })
    return screens;
}

type Translation = (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string

export interface IUserScreen {
    name: string;
    to: string;
    icon: ImageSourcePropType;
}

export type ScreenNameType = {}



