import { StyleSheet, View, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { Button, Text } from '../../components';
import { useTheme } from '../../hooks';


export default function Login() {
    const { assets, colors, sizes } = useTheme();
    const nav = useNavigation();
    const [userLogin, setUserLogin] = useState({ userName: "", password: "" })
    const [showPass, setShowPass] = useState(false)

    const handleUserLogin = () => {

    }

    // const currentServer = () => {
    //     return Constants.manifest?.extra?.appEnv?.toUpperCase() || "development".toUpperCase();
    // }

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <Text center bold size={32} paddingTop={sizes.padding}>OAB</Text>
                <View style={styles.logo}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={{ width: 120, height: 120 }}
                    />
                </View>
                <Text center semibold marginBottom={sizes.padding} size={14}>Welcome to OAB Bricks</Text>
                <Text center bold marginBottom={sizes.padding} size={22}>Login</Text>

                <View style={styles.input}>
                    <TextInput
                        mode='outlined'
                        label="User Name"
                        outlineColor="#dee2e6"
                        activeOutlineColor="#dee2e6"
                        keyboardType="number-pad"
                        left={<TextInput.Icon size={18} icon="account" />}
                        outlineStyle={{ borderWidth: 2, borderRadius: 12 }}
                        value={userLogin.userName}
                        onChangeText={(value) => {
                            setUserLogin({ ...userLogin, userName: value })
                        }}
                    />
                </View>

                <View style={styles.passwordInput}>
                    <TextInput
                        mode='outlined'
                        label="Password"
                        outlineColor="#dee2e6"
                        activeOutlineColor="#dee2e6"
                        secureTextEntry={!showPass}
                        autoCorrect={false}
                        left={<TextInput.Icon size={18} icon="lock" />}
                        right={<TextInput.Icon size={18} icon={showPass ? 'eye' : 'eye-off'}
                            onPress={() => {
                                setShowPass(!showPass)
                            }} />}
                        outlineStyle={{ borderWidth: 2, borderRadius: 12 }}
                        value={userLogin.password}
                        onChangeText={(value) => setUserLogin({ ...userLogin, password: value })}
                    />
                    <Text align='right' semibold color={"#0E927A"} size={13} marginVertical={5}>Forgot Password?</Text>
                </View>

                <View>
                    <Button radius={10} color={"#0E927A"} marginHorizontal={20} marginTop={5}
                        onPress={() => handleUserLogin()}>
                        {false ? <ActivityIndicator size={"large"} color={"white"} /> : <Text semibold white size={20}>Login</Text>}
                    </Button>
                </View>
            </View >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#f8f9fa",
        marginHorizontal: 1,
        marginVertical: 5,
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    logo: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        marginHorizontal: 20,
    },
    passwordInput: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    socialMediaLogo: {
        marginTop: 25,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: "center",
    }
})