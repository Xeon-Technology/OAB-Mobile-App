import { FlatList, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Text } from '../../components'
import { CURRENCY, toMoney } from '../../constants/Util'
import { Chip } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../constants/types/screen.data'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SearchBarComp from '../../components/SearchBarComp'

const GraderOptions = [
    { id: 1, title: 'A-গ্রেড ', isSelected: false },
    { id: 2, title: 'B-গ্রেড ', isSelected: false },
    { id: 3, title: 'C-গ্রেড ', isSelected: false }
]

const demoData = [
    {
        id: 1, title: 'গ্রেড - A পরিমাণ', options: ["৩০ হাজার বা তার নিচে ", "১ লক্ষ বা তার নিচে ", "১ লক্ষ বা তার উপরে"]
    },
    { id: 1, title: 'গ্রেড - B পরিমাণ', options: ["৩০ হাজার বা তার নিচে ", "১ লক্ষ বা তার নিচে ", "১ লক্ষ বা তার উপরে"] },
    { id: 1, title: 'গ্রেড - C পরিমাণ', options: ["৩০ হাজার বা তার নিচে ", "১ লক্ষ বা তার নিচে ", "১ লক্ষ বা তার উপরে"] },
]

const QtyOptions = [
    { id: 1, title: 100, isSelected: false },
    { id: 2, title: 200, isSelected: false },
    { id: 3, title: 500, isSelected: false },
    { id: 4, title: 1000, isSelected: false },
    { id: 5, title: 2000, isSelected: false },
    { id: 6, title: 5000, isSelected: false },
    { id: 7, title: 10000, isSelected: false },
    { id: 8, title: 15000, isSelected: false },
    { id: 9, title: 30000, isSelected: false },
]

const RetailSales = () => {
    const [gradeOptions, setGradeOptions] = useState(GraderOptions)
    const [qtyOptions, setQtyOptions] = useState(QtyOptions)
    const nav = useNavigation();

    const handleSelectGrade = (id: number) => {
        const items = [...GraderOptions]
        const index = items.findIndex((item) => item.id === id)
        items[index].isSelected = !items[index].isSelected
        setGradeOptions(items)
    }

    return (
        <View style={styles.mainContainer}>
            {/* <SearchBarComp /> */}
            <Text semibold size={18}>Select Grade</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginVertical: 10 }}>
                {GraderOptions.map((option, indx) =>
                    <TouchableOpacity key={option.id} onPress={() => handleSelectGrade(option.id)}>
                        <Text
                            color={option.isSelected ? "#fff" : "#000"} size={16}
                            semibold
                            style={[styles.btnStyle, { backgroundColor: option.isSelected ? "#056C89" : "#fff" }] as any}
                        >
                            {option.title}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={demoData}
                    keyExtractor={(item, index) => (index + Math.random()).toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.cardStyle}>
                                <Text semibold size={18} padding={3}>{item.title}</Text>

                                <View style={{ flexDirection: "row", gap: 8, marginVertical: 5 }}>
                                    <View style={{ flex: 1, backgroundColor: "#E7EDEF", padding: 6, borderRadius: 6 }}>
                                        <Text center semibold size={15}>৩০ হাজার বা তার নিচে</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "#E7EDEF", padding: 6, borderRadius: 6 }}>
                                        <Text center semibold size={15}>১ লক্ষ বা তার নিচে</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: "#E7EDEF", padding: 6, borderRadius: 6 }}>
                                        <Text center semibold size={15}>১ লক্ষ বা তার উপরে</Text>
                                    </View>
                                </View>

                                <View style={[styles.chipBtn, { marginBottom: "4%" }]}>
                                    {
                                        QtyOptions?.map((item: any, index: number) => (
                                            <Chip
                                                key={(index * Math.random()).toString()}
                                                // textStyle={{ color: selectedGrade?.id === item.id ? "#fff" : "#000", fontSize: 18, fontWeight: "800", textAlign: "center" }}
                                                // selected={selectedGrade?.id === item.id}
                                                // selectedColor={"#fff"}
                                                // style={[styles.chipStyle, { backgroundColor: selectedGrade?.id === item.id ? "#61a5c2" : "#fff" }]}
                                                onPress={() => { }
                                                    // dispatch({ type: ActionType.SET_SELECTED_QTY, payload: { id: item.id, name: item.title, amount: item.description } })
                                                }
                                            >
                                                {item.title}
                                            </Chip>
                                        ))
                                    }
                                </View>

                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text semibold size={15} marginBottom={5}>পরিমাণ</Text>
                                        <Input placeholder="Quantity" />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text semibold size={15} marginBottom={5}>ইউনিট মূল্য </Text>
                                        <Input placeholder="Unit Amount" />
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                                    <View style={{ flex: 1, alignSelf: "center" }}>
                                        <Text semibold size={15}>টোটাল মূল্য =</Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderColor: "#ccc",
                                        paddingVertical: 8,
                                        borderRadius: 8,
                                        marginBottom: 5
                                    }}>
                                        <Text paddingHorizontal={10} semibold size={15} >5500 * 5 = {25000}</Text>
                                    </View>
                                </View>

                            </View>
                        )
                    }}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.cardStyle}>
                    <Text semibold size={16}>মোট Bricks: </Text>
                    <Text semibold size={16}>মোট টাকা: {CURRENCY} {toMoney(28000)}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginVertical: 5 }}>

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple("black", false)}
                        onPress={() => nav.navigate({ name: ScreenNames.CUSTOMER_INFORMATION } as never)}
                    >

                        <View style={[styles.ProceedBtnStyle, { backgroundColor: '#056C89', borderColor: '#219ebc' }]}>
                            <MaterialCommunityIcons name="checkbox-multiple-marked-circle-outline" size={22} color="white" />
                            <Text semibold size={15} white>Proceed</Text>
                        </View>

                    </TouchableNativeFeedback>
                </View>
            </View>
        </View >
    )
}

export default RetailSales

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
    },
    btnStyle: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 8,
    },
    chipBtn: {
        flexDirection: "row",
        gap: 8,
        marginTop: 10,
        flexWrap: "wrap",
    },
    cardStyle: {
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 4,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    footer: {
        flex: 0,
    },
    ProceedBtnStyle: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: "row",
        gap: 6,
        justifyContent: "center"
    }
})