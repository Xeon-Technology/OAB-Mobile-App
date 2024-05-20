import React from 'react';
import { StyleSheet, ViewStyle, Platform, Modal, View, TouchableOpacity } from 'react-native';

import { IModalProps } from '../constants/types';

import Block from './Block';
import { AntDesign } from '@expo/vector-icons';

const RNModal = ({
    id = 'Modal',
    children,
    style,
    onRequestClose,
    ...props
}: IModalProps) => {
    const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;

    // generate component testID or accessibilityLabel based on Platform.OS
    const modalID =
        Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

    return (
        <Modal
            animationType="fade"
            {...modalID}
            {...props}
            transparent
            style={modalStyles}
            visible
            onRequestClose={onRequestClose}>
            <Block center style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={onRequestClose}>
                        <AntDesign name="closecircleo" size={24} color="#ae2012" style={{ flexDirection: 'row', alignSelf: 'flex-end' }} />
                    </TouchableOpacity>

                    <View style={{ backgroundColor: "#fff" }}>
                        {children}
                    </View>
                </View>
            </Block>
        </Modal>
    );
};

export default React.memo(RNModal);

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});