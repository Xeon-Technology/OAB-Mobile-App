import React from 'react';
import { Text } from '../../components';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Dashboard = () => {

    return (
        <>
            {
                false ? <ActivityIndicator size={'large'} color={'#0077b6'} style={{ marginVertical: 50 }} />
                    :
                    <View style={styles.container}>
                        <Text>Main Dashboard</Text>
                    </View>
            }
        </>

    );
};

export default Dashboard;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 8,
        marginLeft: 8,
        marginRight: 8,
        marginVertical: 4,
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
        fontSize: 16,
        marginTop: 5,
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
});
