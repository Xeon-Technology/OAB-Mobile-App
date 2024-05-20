import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Linking,
  StyleSheet,
  View,
} from 'react-native';

import {
  useDrawerStatus,
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import { Block, Text, Button, Image } from '../components';
import { useTheme, useTranslation } from '../hooks';
import { ScreenNames } from '../constants/types/screen.data';
import Screens from './Screens';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const { colors } = useTheme();
  const isDrawerOpen = useDrawerStatus();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale: scale }],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [active, setActive] = useState('Dashboard');
  const { assets, colors, gradients, sizes } = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to: any) => {
      setActive(to);
      // to === 'Dashboard' ? navigation.navigate('Dashboard') :
      navigation.navigate({
        name: ScreenNames.COMMON_STACK as never,
      } as never,
      );
    },
    [navigation, setActive],
  );

  useEffect(() => {
    navigation.addListener('focus', () => {
      setActive('Dashboard');
    });
  }, [navigation, setActive]);

  const handleWebLink = useCallback((url: string) => Linking.openURL(url), []);

  // screen list for Drawer menu
  const screens = [
    {
      name: t('screens.dashboard'),
      to: ScreenNames.DASHBOARD,
      icon: assets.home
    },
    {
      name: t('screens.retail-sales'),
      to: ScreenNames.RETAIL_SALES,
      icon: assets.components
    },
    {
      name: t('screens.long-term-seasonal-sales'),
      to: ScreenNames.LONG_TERM_SEASONAL_SALES,
      icon: assets.document
    },
    {
      name: t('screens.budget'),
      to: ScreenNames.BUDGET,
      icon: assets.rental
    },
    {
      name: t('screens.delivery'),
      to: ScreenNames.DELIVERY,
      icon: assets.profile
    },
    {
      name: t('screens.settings'),
      to: ScreenNames.SETTINGS,
      icon: assets.settings
    },
    {
      name: t('screens.approval'),
      to: ScreenNames.APPROVAL,
      icon: assets.register
    },
    {
      name: t('screens.sales-report'),
      to: ScreenNames.SALES_REPORT,
      icon: assets.extras
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{ paddingBottom: sizes.padding }}>
      <Block paddingHorizontal={sizes.padding}>

        <Block flex={0} row align="center" marginBottom={sizes.md}>
          <Image
            marginTop={sizes.sm}
            marginLeft={-5}
            width={40}
            height={50}
            source={require('../../assets/logo.png')}
          />

          <Text marginTop={14} size={17} bold paddingHorizontal={sizes.s}>
            {t('app.name')}
          </Text>

        </Block>

        {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index * 3}`}
              // style={{ borderLeftWidth: 4, borderLeftColor: colors.primary, paddingHorizontal: 10 }}
              onPress={() => handleNavigation(screen.to)}>
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? 'primary' : 'white']}>
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? 'white' : 'black']}
                />
              </Block>
              <Text paddingHorizontal={sizes.sm} p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />

        <Text semibold transform="uppercase" opacity={0.5}>
          {t('menu.documentation')}
        </Text>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink('https://github.com/creativetimofficial')
          }>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.documentation}
            />
          </Block>
          <Text p color={labelColor}>
            {t('navigation.logout')}
          </Text>
        </Button>

      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const { gradients } = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        // drawerType="slide"
        // overlayColor="transparent"
        initialRouteName="Screens"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            flex: 1,
            width: '65%',
            borderRightWidth: 0,
          }
        }}
        // sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};

const styles = StyleSheet.create({
  menuItemStyle: {
    marginVertical: 2,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#fff',
    paddingLeft: '8%',
    // marginLeft: - (height * 0.04)
  },
});
