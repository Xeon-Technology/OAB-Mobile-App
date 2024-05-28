import { StyleSheet } from 'react-native'
import React from 'react'
import { ProgressBar } from 'react-native-paper';
import Text from './Text';

const ProgressLoader = ({ value = 0 }) => {
    return (
        <>
            <ProgressBar progress={value / 100} color={"#3F51B5"} style={{ marginHorizontal: "5%", marginTop: "5%", borderRadius: 10, height: 9 }} />
            <Text align="center">{value}%</Text>
        </>
    )
}

export default ProgressLoader

const styles = StyleSheet.create({})