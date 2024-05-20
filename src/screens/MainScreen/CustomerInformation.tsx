import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Button, Input, Text } from '../../components'
import { debounce, validPhoneNumberCheck } from '../../utils/sytemUtil'
import NewCustomerModal from '../Modal/NewCustomerModal'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../constants/types/screen.data'

const CustomerInformation = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [selectedClient, setSelectedClient] = useState<any>(null)
    const [toggleNewCustomerModal, setToggleNewCustomerModal] = useState<boolean>(false)
    const nav = useNavigation();

    const handlePhoneNumber = (txt: string) => {
        setPhoneNumber(txt)
    }
    const searchPhoneNumber = useCallback(debounce(handlePhoneNumber, 1000), [])

    const isValidPhoneNumber = () => {
        return validPhoneNumberCheck(phoneNumber?.toString().trim())
    }

    return (
        <>
            <View style={styles.MainContainer}>
                <View style={{ marginBottom: 15 }}>
                    <Text semibold size={16} marginBottom={8}>Customer phone number</Text>
                    <Input
                        placeholder="ফোন নম্বর দিন"
                        onChangeText={(txt) => searchPhoneNumber(txt)}
                        keyboardType="number-pad"
                        maxLength={11}
                        success={isValidPhoneNumber()}
                        danger={phoneNumber?.trim().length !== 0 && !isValidPhoneNumber()}
                        style={{ backgroundColor: "#fff", }}
                    />
                    {phoneNumber.length > 0 && !isValidPhoneNumber() && <Text danger semibold size={16} paddingTop={6}>আপনার ফোন নম্বরটি সঠিক নয়</Text>}

                    {
                        false ? <ActivityIndicator size={35} color={"#19A7CE"} style={{ marginVertical: 5 }} /> : selectedClient &&
                            <Text bold primary size={16} paddingTop={6} paddingHorizontal={5}>{selectedClient?.name}</Text>
                    }
                    {isValidPhoneNumber() && selectedClient === null && !false && <Text danger semibold size={16} paddingTop={6}>এই ফোন নাম্বারে কোনো দোকান খুঁজে পাওয়া যায়নি!</Text>}
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingVertical: 5 }}>
                    <Button
                        color={"#0077b6"}
                        // disabled={!isValid() || submitting}
                        onPress={() => setToggleNewCustomerModal(true)}
                    >
                        <Text semibold size={15} white paddingHorizontal={25}>{false ? "Saving..." : "Create"}</Text>
                    </Button>
                    <Button
                        color={"#0077b6"}
                        // disabled={!isValid() || submitting}
                        onPress={() => nav.navigate({
                            name: ScreenNames.PAYMENT as never,
                            params: {
                                total: 28000
                            }
                        } as never)}
                    >
                        <Text semibold size={15} white paddingHorizontal={25}>{false ? "Saving..." : "Payment"}</Text>
                    </Button>
                </View>
            </View>
            <View style={[styles.cardStyle, { borderRadius: 5, borderWidth: 1, borderColor: "#c4c4c4" }]}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text semibold size={15} lineHeight={25}>নাম</Text>
                        <Text semibold size={15} lineHeight={25}>ফোন নম্বর</Text>
                        <Text semibold size={15} lineHeight={25}>ঠিকানা</Text>
                    </View>
                    <View style={{ flex: 0.2 }}>
                        <Text bold size={15} lineHeight={25}>:</Text>
                        <Text bold size={15} lineHeight={25}>:</Text>
                        <Text bold size={15} lineHeight={25}>:</Text>
                    </View>
                    <View style={{ flex: 3, flexWrap: "wrap" }}>
                        <Text bold size={15} lineHeight={25}>ফারজানা তিথি</Text>
                        <Text bold size={15} lineHeight={25}>০১৭৩৮৩৫৩৯৯</Text>
                        <Text bold size={15} lineHeight={25}>কচুয়া,বাগেরহাট,খুলনা</Text>
                    </View>
                </View>
            </View>
            {toggleNewCustomerModal &&
                <NewCustomerModal
                    visible={toggleNewCustomerModal}
                    onDismiss={() => setToggleNewCustomerModal(false)}
                    onSuccess={() => { }}
                />
            }
        </>
    )
}

export default CustomerInformation

const styles = StyleSheet.create({
    MainContainer: {
        // flex: 1,
        backgroundColor: '#f7f8f9',
        margin: 5,
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#c4c4c4",
    },
    cardStyle: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginHorizontal: 5,
        marginVertical: 3,
        borderRadius: 3,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        elevation: 3
    }
})