import React from 'react';
import { StyleSheet, Modal as RNModal, ViewStyle, Platform } from 'react-native';

import { useTheme } from '../hooks';
import { IModalProps } from '../constants/types';

import Block from './Block';
import Button from './Button';
import Image from './Image';

const RNModalComp = ({
    id = 'Modal',
    children,
    style,
    onRequestClose,
    ...props
}: IModalProps) => {
    const { assets, colors, sizes } = useTheme();
    const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;

    // generate component testID or accessibilityLabel based on Platform.OS
    const modalID =
        Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

    return (
        <RNModal
            {...modalID}
            {...props}
            transparent
            style={modalStyles}

            animationType="slide"
            onRequestClose={onRequestClose}>
            <Block safe flex={1} white>
                <Block flex={0.1}>
                    <Button
                        top={0}
                        right={0}
                        position="absolute"
                        onPress={onRequestClose}>
                        <Image source={assets.close} color={colors.primary} />
                    </Button>
                </Block>
                <Block
                    flex={1}
                    center
                    justify="center"
                    marginTop={-sizes.sm}
                    paddingHorizontal={sizes.sm}>
                    <Block center justify="center">
                        {children}
                    </Block>
                </Block>
            </Block>
        </RNModal>
    );
};

export default React.memo(RNModalComp);
