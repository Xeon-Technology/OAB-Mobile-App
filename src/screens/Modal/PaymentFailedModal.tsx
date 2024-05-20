import { Modal, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { Block, Text } from '../../components';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

interface IPaymentModalProps {
    visible: boolean;
    onDismiss: () => void;
}

const PaymentFailedModal = ({ visible, onDismiss }: IPaymentModalProps) => {

    return (

        <SafeAreaView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onDismiss}>
                <Block center style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <TouchableOpacity onPress={onDismiss}>
                        <AntDesign name="closesquare" size={24} color="#e63946" style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingHorizontal: 8 }} />
                    </TouchableOpacity>
                    <View style={styles.modalView}>
                        <LottieView
                            source={require('../../../assets/Lottie/error.json')}
                            style={{ alignSelf: "center", width: "50%", aspectRatio: 1 }}
                            autoPlay
                            speed={0.5}
                            useNativeLooping
                            loop={true}
                        />

                        <Text center paddingVertical={10} size={18} bold>আপনার পেমেন্ট সফল হয়নি </Text>
                    </View>

                    <TouchableOpacity onPress={onDismiss}>
                        <View style={styles.downloadBtn}>
                            <Ionicons name="arrow-back-circle-sharp" size={24} color="white" />
                            <Text center semibold white size={15}>ফিরে যান</Text>
                        </View>
                    </TouchableOpacity>
                </Block>
            </Modal>
        </SafeAreaView >
    )
}

export default memo(PaymentFailedModal)

const styles = StyleSheet.create({
    modalView: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    innerContainer: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    footer: {
        flex: 0,
        justifyContent: "space-around",
        backgroundColor: "#fff"
    },
    downloadBtn: {
        flexDirection: "row",
        margin: 10,
        padding: 10,
        backgroundColor: '#056C89',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

        gap: 5,
        marginTop: 10,
        justifyContent: "center"
    }
})