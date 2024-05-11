import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/types/screen.data';
import Animated from 'react-native-reanimated';
import { useTheme } from '../../hooks';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function SplashComp() {
    const { assets, colors, sizes } = useTheme();
    const [appIsReady, setAppIsReady] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync(Entypo.font);
                // Artificially delay for two seconds to simulate a slow loading

                // await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }
        setTimeout(() => {
            navigation.navigate({
                name: ScreenNames.LOGIN,
            } as never);
        }, 3000);

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <StatusBar
                animated={true}
                barStyle={"default"}
                showHideTransition={"fade"}
                hidden
            />
            <ImageBackground source={require('../../assets/images/splash.png')} resizeMode="cover" style={styles.image}>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Animated.Image source={require('../../assets/images/logo.png')} style={styles.mainlogo} />
                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    mainlogo: {
        width: 330,
        height: 330
    }
})