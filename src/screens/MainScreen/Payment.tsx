import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { CURRENCY } from '../../constants/Util';
import { Image, Input, Text } from '../../components';
import { PaymentOptionsImages, debugPrint, isMediumDevice, isSmallDevice } from '../../utils/sytemUtil';
import { useTheme } from '../../hooks';
import PaymentSuccessModal from '../Modal/PaymentSuccessModal';
import PaymentFailedModal from '../Modal/PaymentFailedModal';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const paymentOptions = [
    { id: 1, title: 'Cash' },
    { id: 2, title: 'Bkash' },
    { id: 3, title: 'Rocket' }
]

const Payment = () => {
    const route = useRoute();
    let params = route.params
    let total = (params as any)['total']
    let accId = (params as any)['accountId']
    const { assets } = useTheme();
    const nav = useNavigation();
    const [totalAmount, setTotalAmount] = useState(total)
    const [clientId, setClientId] = useState(accId)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showFailedModal, setShowFailedModal] = useState(false)

    const handleRemoveImage = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.cardStyle}>
                <Text size={15} bold marginVertical={6}>মোট টাকা</Text>
                <Text semibold size={16} style={{ borderWidth: 1, padding: 7, borderColor: "#ccc", borderRadius: 6 }}>{CURRENCY} {totalAmount}</Text>
            </View>
            <View style={[styles.cardStyle, { marginVertical: 10 }]}>
                <Text size={15} bold marginVertical={6}>টাকা নেওয়ার মাধ্যম</Text>
                <View style={[styles.chipBtn, { marginBottom: "4%" }]}>
                    {
                        paymentOptions?.map((item: any, index: number) => (
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#37caec", true)}>
                                <View key={index} style={{ gap: 5, alignItems: "center" }}>
                                    <View style={[styles.cardStyle]}>
                                        <Image
                                            key={index}
                                            source={PaymentOptionsImages(item.title)}
                                            style={{ width: 60, height: 50 }}
                                            resizeMode="contain"
                                            borderRadius={5}
                                        />
                                    </View>
                                    <Text semibold size={15} >{item.title}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        ))
                    }
                </View>
                <Text size={15} bold marginVertical={6}>পরিশোধিত টাকার পরিমান</Text>
                <Input
                    placeholder="টাকার পরিমান লিখুন"
                    onChangeText={(txt) => { }}
                    keyboardType="number-pad"
                    style={{ marginBottom: "4%" }}
                />

                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#37caec", true)}>
                    <View style={{ position: "relative", borderStyle: "dashed", borderWidth: 1, borderRadius: 10, marginVertical: 15, marginHorizontal: 65 }}>
                        {/* {progressLoader !== 100 && <ProgressLoader value={progressLoader} />} */}
                        <Image
                            source={assets.uploader}
                            radius={5}
                            // onLoadStart={() => handleDokanImgLoading(true)}
                            // onLoadEnd={() => handleDokanImgLoading(false)}
                            onError={(error) => {
                                debugPrint(error)
                            }}
                            // onProgress={(e) => setProgressLoader(Math.floor((e?.nativeEvent?.loaded * 100) / e?.nativeEvent?.total))}
                            shadow
                            style={{ width: 80, height: 80, alignSelf: "center", marginTop: 10 }}
                            resizeMode="contain"
                        // style={{ width: file?.url ? 160 : 140, height: file?.url ? 145 : 140, alignSelf: "center", marginVertical: 10 }}
                        />
                        <Text semibold center size={13} marginBottom={5} color={"gray"}>রশিদের ছবি দিন</Text>
                        {/* {file?.url && !isLoading && */}
                        {/* <View style={styles.removeIconStyle}>
                        <AntDesign name="delete" size={25} color="red" onPress={() => handleRemoveImage()} />
                    </View> */}
                        {/* } */}
                    </View>
                </TouchableNativeFeedback>
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("red", false)} onPress={() => nav.goBack()}>
                        <View style={[styles.btnStyle, { backgroundColor: '#fff', borderColor: '#dee2e6' }]}>
                            <MaterialIcons name="cancel" size={22} color="red" />
                            <Text center semibold size={15}>Cancel</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <View style={{ flex: 1 }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("black", false)} onPress={() => setShowSuccessModal(true)}>
                        <View style={[styles.btnStyle, { backgroundColor: '#056C89', borderColor: '#2A93D5' }]}>
                            <Feather name="check-circle" size={22} color="white" />
                            <Text center semibold white size={15}>Confirm</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            <Text semibold center size={13} marginBottom={5} color={"gray"} onPress={() => setShowFailedModal(true)}>Failed</Text>

            {showSuccessModal &&
                <PaymentSuccessModal
                    visible={showSuccessModal}
                    onDismiss={() => setShowSuccessModal(false)}
                />}

            {showFailedModal &&
                <PaymentFailedModal
                    visible={showFailedModal}
                    onDismiss={() => setShowFailedModal(false)}
                />}
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 6
    },
    cardStyle: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        elevation: 3
    },
    chipBtn: {
        flexDirection: "row",
        gap: 8,
        marginTop: 10,
        flexWrap: "wrap",
    },
    removeIconStyle: {
        position: "absolute",
        right: isSmallDevice ? 1 : isMediumDevice ? 5 : 10,
        bottom: isSmallDevice ? 88 : isMediumDevice ? 100 : 135,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 3,
        borderRadius: 8
    },
    btnStyle: {
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: "row",
        gap: 6,
        marginTop: 10,
        justifyContent: "center"
    }
})