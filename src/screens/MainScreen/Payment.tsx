import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { CURRENCY } from '../../constants/Util';
import { Image, Input, Text } from '../../components';
import { Chip } from 'react-native-paper';
import { PaymentOptionsImages, debugPrint, isMediumDevice, isSmallDevice } from '../../utils/sytemUtil';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import PaymentModal from '../Modal/PaymentModal';

const paymentOptions = [
    { id: 1, title: 'Cash' },
    { id: 2, title: 'Bkash' },
    { id: 3, title: 'Rocket' }
]

const Payment = () => {
    const route = useRoute();
    let params = route.params
    let total = (params as any)['total']
    const { assets } = useTheme();

    const [totalAmount, setTotalAmount] = useState(total)

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
                            <>
                                <View key={index} style={{ gap: 5, alignItems: "center" }}>
                                    <View style={styles.cardStyle}>
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
                            </>
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
            </View>
            <PaymentModal
                visible={true}
                onDismiss={() => { }}
            />
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
})