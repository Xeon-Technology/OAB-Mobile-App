import { StyleSheet, View } from 'react-native'
import React from 'react'
import RNModalComp from '../../components/RNModalComp'
import { Button, Input, Text } from '../../components'
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import DropdownComponent from '../../components/DropDownComp';

interface INewCustomerModal {
    visible: boolean;
    onDismiss: () => void;
    onSuccess: () => void;
}

const NewCustomerModal = ({ visible, onDismiss, onSuccess }: INewCustomerModal) => {
    const { colors } = useTheme();

    return (
        <RNModalComp
            visible={visible}
            onRequestClose={onDismiss}
            onDismiss={onSuccess}
        >
            <View style={[styles.container, { borderColor: colors.gray }]}>
                <Text bold size={17} center style={{ backgroundColor: "#ede0d4", padding: 10, margin: 10, borderRadius: 6 }}>নতুন কাস্টমার রেজিস্ট্রেশন করুন</Text>
                <View style={{ flex: 1, padding: 10 }}>
                    <Text semibold size={16} marginBottom={8}>নাম <Text danger bold>*</Text></Text>
                    <Input
                        placeholder="কাস্টমারের নাম লিখুন "
                        // onChangeText={(txt) => searchPhoneNumber(txt)}
                        keyboardType="number-pad"
                        // maxLength={11}
                        // success={isValidPhoneNumber()}
                        // danger={phoneNumber?.trim().length !== 0 && !isValidPhoneNumber()}
                        style={{ backgroundColor: "#fff", }}
                    />

                    <Text semibold size={16} marginVertical={8}>ফোন নম্বর <Text danger bold>*</Text></Text>
                    <Input
                        placeholder="ফোন নম্বর লিখুন"
                        // onChangeText={(txt) => searchPhoneNumber(txt)}
                        keyboardType="number-pad"
                        // maxLength={11}
                        // success={isValidPhoneNumber()}
                        // danger={phoneNumber?.trim().length !== 0 && !isValidPhoneNumber()}
                        style={{ backgroundColor: "#fff", }}
                    />
                    <Text semibold size={16} marginTop={10}>বিভাগ</Text>
                    <DropdownComponent
                        label={"-- বিভাগ নির্বাচন করুন --"}
                        data={[]}
                        onItemSelect={(item) => {

                        }}
                        defaultValue={-1}
                        search={true}
                        onSearch={(item) => { }}
                    />
                    <Text semibold size={16} marginTop={10}>জেলা</Text>
                    <DropdownComponent
                        label={"-- জেলা নির্বাচন করুন --"}
                        data={[]}
                        onItemSelect={(item) => {

                        }}
                        defaultValue={-1}
                        search={true}
                        onSearch={(item) => { }}
                    />
                    <Text semibold size={16} marginTop={10}>উপজেলা</Text>
                    <DropdownComponent
                        label={"-- উপজেলা নির্বাচন করুন --"}
                        data={[]}
                        onItemSelect={(item) => {

                        }}
                        defaultValue={-1}
                        search={true}
                        onSearch={(item) => { }}
                    />
                </View>

                <View style={styles.footer}>
                    <Button
                        onPress={() => {
                        }}
                        color={"#056C89"}
                        style={{ marginHorizontal: 10, marginBottom: 10 }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                            <Entypo name="save" size={20} color="white" />
                            <Text white semibold size={18} paddingLeft={5}>Save</Text>
                        </View>
                    </Button>
                </View>
            </View>
        </RNModalComp>
    )
}

export default NewCustomerModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        marginBottom: "5%",
        borderRadius: 4,
        backgroundColor: "#fff"
    },
    footer: {
        flex: 0
    }
})