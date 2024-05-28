import { ActivityIndicator, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Input, Text } from '../../components'
import { debounce, parseAddress, validPhoneNumberCheck } from '../../utils/sytemUtil'
import NewCustomerModal from '../Modal/NewCustomerModal'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../constants/types/screen.data'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useLazyQuery } from '@apollo/client'
import { ACCOUNT_BY_PHONE_NUMBER } from '../../core/network/graphql/queries'
import { IAccount } from '../../constants/types'
import { COLORS } from '../../constants/light'

const CustomerInformation = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [selectedClient, setSelectedClient] = useState<IAccount | null>(null)
    const [toggleNewCustomerModal, setToggleNewCustomerModal] = useState<boolean>(false)
    const nav = useNavigation();

    useEffect(() => {
        isValidPhoneNumber() &&
            loadAccPhoneNo({
                variables: {
                    phone: phoneNumber,
                }
            })

    }, [phoneNumber])

    const handlePhoneNumber = (txt: string) => {
        setPhoneNumber(txt)
    }
    const searchPhoneNumber = useCallback(debounce(handlePhoneNumber, 500), [])

    const isValidPhoneNumber = () => {
        return validPhoneNumberCheck(phoneNumber?.toString().trim())
    }

    const [loadAccPhoneNo, { loading: accountLoading }] = useLazyQuery(ACCOUNT_BY_PHONE_NUMBER, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            if (data && data.query && data.query.result) {
                let account = data.query.result
                setSelectedClient(account)
            } else {
                setSelectedClient(null)
            }
        },
        onError: (e) => {
            setSelectedClient(null)
        }
    });

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

                    {isValidPhoneNumber() && selectedClient === null && !accountLoading && <Text danger semibold size={15} paddingTop={6}> এই ফোন নাম্বারে কোনো ক্লায়েন্ট খুঁজে পাওয়া যায়নি!</Text>}

                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingBottom: 5 }}>

                    {!accountLoading && isValidPhoneNumber() && selectedClient === null &&
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple("black", false)}
                            onPress={() => setToggleNewCustomerModal(true)}
                        >

                            <View style={[styles.btnStyle, { backgroundColor: '#056C89', borderColor: '#219ebc' }]}>
                                <Ionicons name="person-add" size={20} color="white" />
                                <Text semibold size={15} white>Create</Text>
                            </View>

                        </TouchableNativeFeedback>
                    }

                    {!accountLoading && selectedClient &&
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple("black", false)}
                            onPress={() => nav.navigate({
                                name: ScreenNames.PAYMENT as never,
                                params: {
                                    total: 28000,
                                    accountId: selectedClient?.id
                                }
                            } as never)}>

                            <View style={[styles.btnStyle, { backgroundColor: '#056C89', borderColor: '#219ebc' }]}>
                                <MaterialIcons name="payments" size={22} color="white" />
                                <Text semibold size={15} white>Payment</Text>
                            </View>

                        </TouchableNativeFeedback>
                    }

                </View>
            </View>
            {accountLoading ? <ActivityIndicator size={35} color={"#056C89"} style={{ marginVertical: 10 }} /> :
                selectedClient &&
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
                        <View style={{ flex: 3 }}>
                            <Text semibold size={15} lineHeight={25} primary>{selectedClient?.name}</Text>
                            <Text size={15} lineHeight={25} color={COLORS.facebook}>{selectedClient?.contact?.number}</Text>
                            <Text size={15} lineHeight={25} color={"#4a4e69"} numberOfLines={3}>{parseAddress(selectedClient?.contact?.place)}</Text>
                        </View>
                    </View>
                </View>
            }
            {toggleNewCustomerModal &&
                <NewCustomerModal
                    visible={toggleNewCustomerModal}
                    onDismiss={() => setToggleNewCustomerModal(false)}
                    onSuccess={(phone: string) => {
                        loadAccPhoneNo({
                            variables: {
                                phone: phone,
                            }
                        })
                    }}
                    phoneNumber={phoneNumber}
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
    },
    btnStyle: {
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: "row",
        gap: 6,
        justifyContent: "center"
    }
})