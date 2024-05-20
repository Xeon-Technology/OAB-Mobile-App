import { Modal, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { Block, Text } from '../../components';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import LottieView from 'lottie-react-native';

interface IPaymentModalProps {
    visible: boolean;
    onDismiss: () => void;
}

const PaymentSuccessModal = ({ visible, onDismiss }: IPaymentModalProps) => {

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
                            source={require('../../../assets/Lottie/success.json')}
                            style={{ alignSelf: "center", marginBottom: 10, width: "35%", aspectRatio: 1 }}
                            autoPlay
                            speed={0.95}
                            useNativeLooping
                            loop={true}
                        />

                        <Text center size={18} bold>আপনার পেমেন্ট সফল হয়েছে </Text>
                    </View>

                    <View style={styles.innerContainer}>

                        <View style={{ marginVertical: "2%", marginHorizontal: "2%" }}>
                            <View style={{ flexDirection: "row", marginTop: 6, marginHorizontal: "2%" }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text bold color={"#212d40"} size={14}>তারিখ</Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <Text semibold size={15}>:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text semibold size={15}>{moment(new Date()).format("DD/MM/YYYY")}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: "2%" }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text bold color={"#212d40"} size={14}>সময়</Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <Text semibold size={15}>:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text semibold size={15}>{moment(new Date()).format('LT')}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 6, marginHorizontal: "2%" }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text bold color={"#212d40"} size={14}>নাম</Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <Text semibold size={15}>:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text semibold size={15}>ফারজানা তিথি</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: "2%" }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text bold color={"#212d40"} size={14}>ঠিকানা</Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <Text semibold size={15}>:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text semibold size={15}>কচুয়া, বাগেরহাট, খুলনা</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 6, marginHorizontal: "2%" }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text bold color={"#212d40"} size={14}>ফোন নম্বর</Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <Text semibold size={15}>:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text semibold size={15}>০১৩৪৫৩২৪৪৪</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", borderBottomWidth: 1, borderStyle: "dashed", marginVertical: "5%", marginHorizontal: "2%" }}></View>

                            <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: "2%" }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text bold color={"#212d40"} size={14}>ইউনিয়ন</Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <Text semibold size={15}>:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text semibold size={15}>66346363</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 6, marginHorizontal: "2%" }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text bold color={"#212d40"} size={14}>টাকার পরিমাণ</Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <Text semibold size={15}>:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text semibold size={15}>28000</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: "2%" }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text bold color={"#212d40"} size={14}>প্রোডাক্টের পরিমাণ</Text>
                                </View>
                                <View style={{ flex: 0.2 }}>
                                    <Text semibold size={15}>:</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text semibold size={15}>6000</Text>
                                </View>
                            </View>

                        </View>


                    </View>

                    <TouchableOpacity onPress={onDismiss}>
                        <View style={styles.downloadBtn}>
                            <MaterialCommunityIcons name="download-circle" size={24} color="white" style={{ alignSelf: "center" }} />
                            <Text center semibold white size={15}>ডাউনলোড</Text>
                        </View>
                    </TouchableOpacity>
                </Block>
            </Modal>
        </SafeAreaView >
    )
}

export default memo(PaymentSuccessModal)

const styles = StyleSheet.create({
    modalView: {
        margin: 10,
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

        flexDirection: "row",
        gap: 5,
        marginTop: 10,
        justifyContent: "center"
    }
})