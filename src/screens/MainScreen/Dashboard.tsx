import React, { useEffect } from 'react';
import { Text } from '../../components';
import { View, StyleSheet, ActivityIndicator, ScrollView, useWindowDimensions, Alert } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { toMoney } from '../../constants/Util';
import { useNavigation } from '@react-navigation/native';


const barData = [{ value: 15 }];
const barChartData = [
    { value: 230, label: 'Jan', frontColor: '#4ABFF4' },
    { value: 180, label: 'Feb', frontColor: '#79C3DB' },
    { value: 195, label: 'Mar', frontColor: '#28B2B3' },
    { value: 250, label: 'Apr', frontColor: '#4ADDBA' },
    { value: 320, label: 'May', frontColor: '#91E3E3' },
    { value: 220, label: 'June', frontColor: '#91E3E3' },
    { value: 250, label: 'July', frontColor: '#91E3E3' },
    { value: 120, label: 'August', frontColor: '#91E3E3' },
];
const lineData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
const pieData = [
    { value: 54, color: '#177AD5', text: '54%' },
    { value: 40, color: '#79D2DE', text: '30%' },
    { value: 20, color: '#ED6665', text: '26%' },
];

const Dashboard = () => {
    const { width: screenWidth } = useWindowDimensions();
    const nav = useNavigation();

    useEffect(
        () =>
            nav.addListener('beforeRemove', (e) => {
                e.preventDefault();

                Alert.alert(
                    'Discard changes?',
                    'Are you sure to leave the screen?',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Yes, Leave',
                            style: 'destructive',

                            onPress: () => nav.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [nav]
    );

    return (
        <ScrollView>
            {
                false ? <ActivityIndicator size={'large'} color={'#056C89'} style={{ marginVertical: 50 }} />
                    :
                    <View style={styles.container}>

                        {/* <View style={{ flexDirection: "row", gap: 8 }}> */}
                        <View style={styles.cardContainer}>
                            <Text size={15} semibold style={styles.title} marginBottom={5}>Cash</Text>
                            <BarChart
                                frontColor={'#177AD5'}
                                barWidth={30}
                                isAnimated
                                data={barData}
                                width={screenWidth - 120}
                                height={200}
                            />
                        </View>
                        <View style={styles.cardContainer}>
                            <Text size={15} semibold style={styles.title}>Supplier Payment</Text>
                            <View style={{ alignItems: 'center' }}>
                                <PieChart
                                    data={pieData}
                                    donut
                                    isAnimated
                                    animationDuration={2000}
                                    pieInnerComponentHeight={10}
                                    pieInnerComponentWidth={10}
                                    showText
                                    textColor="black"
                                    radius={110}
                                    textSize={20}
                                    focusOnPress
                                    showValuesAsLabels
                                    showTextBackground
                                    textBackgroundRadius={24}
                                />
                            </View>
                        </View>
                        {/* </View> */}

                        {/* <View style={{ flexDirection: "row", gap: 8 }}> */}
                        <View style={styles.cardContainer}>
                            <Text size={15} semibold style={styles.title}></Text>
                            <LineChart
                                data={lineData}
                                color={'#177AD5'}
                                thickness={3}
                                dataPointsColor={'red'}
                                width={screenWidth - 120}
                                height={200}
                            />
                        </View>
                        <View style={styles.cardContainer}>
                            <Text size={15} semibold style={styles.title}>Expense</Text>
                            <View style={{ flex: 1 }}>
                                <BarChart
                                    showYAxisIndices
                                    barWidth={20}
                                    barBorderRadius={4}
                                    frontColor="lightgray"
                                    activeOpacity={0.2}
                                    showFractionalValues
                                    noOfSections={4}
                                    maxValue={400}
                                    data={barChartData}
                                    isAnimated
                                    showLine
                                    scrollAnimation
                                    showValuesAsTopLabel
                                    width={screenWidth - 120}
                                    height={200}
                                />
                            </View>
                        </View>
                        {/* </View> */}

                        <View style={styles.cardContainer}>
                            <Text size={15} semibold style={styles.title}>Burner Fire Status</Text>
                            <BarChart
                                showYAxisIndices
                                barWidth={20}
                                barBorderRadius={4}
                                frontColor="lightgray"
                                activeOpacity={0.2}
                                showFractionalValues
                                noOfSections={4}
                                maxValue={400}
                                data={barChartData}
                                isAnimated
                                showLine
                                scrollAnimation
                                showValuesAsTopLabel
                                width={screenWidth - 120}
                                height={200}
                            />
                        </View>

                        <View style={styles.cardContainer}>
                            <View style={{ flexDirection: "row", gap: 8, justifyContent: "space-between" }}>
                                <Text size={15} semibold style={styles.title}>Product Schedule</Text>
                                <Text semibold style={styles.title}>View All</Text>
                            </View>
                            <View style={{ backgroundColor: "#93EEEE", padding: 10, margin: 5, borderRadius: 5 }}>
                                <View style={{ flexDirection: "row", gap: 8, paddingBottom: 10, borderBottomWidth: 1, borderStyle: 'dashed' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text size={14} semibold>Status</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text center size={14} semibold>Product Quantity</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", gap: 8, padding: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text size={14} semibold>Schedule</Text>
                                        <Text size={14} semibold>ReSchedule</Text>
                                        <Text size={14} semibold>UnSchedule</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text center size={14} semibold>{toMoney(50100)}</Text>
                                        <Text center size={14} semibold>{toMoney(500)}</Text>
                                        <Text center size={14} semibold>{toMoney(12100)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
            }
        </ScrollView>

    );
};

export default Dashboard;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 8,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 1,
    },
    image: {
        height: 200,
        width: 180,
        marginVertical: 2,
    },
    title: {
        fontSize: 15,
    },
    price: {
        marginTop: 5,
        backgroundColor: "#379C03",
        padding: 5,
        borderRadius: 5
    },
    mrp: {
        marginTop: 5,
        backgroundColor: "#1B6B93",
        padding: 5,
        borderRadius: 5

    },
    chart: {
        flex: 1,
    }
});
