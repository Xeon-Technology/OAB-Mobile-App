import { StyleSheet, View, ActivityIndicator, Image, Keyboard, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { Button, Text } from '../../components';
import { ScreenNames } from '../../constants/types/screen.data';
import { useLazyQuery } from '@apollo/client';
import { USER_LOGIN } from '../../core/network/graphql/queries';
import { ShowAlert, debugPrint } from '../../utils/sytemUtil';
import Storage from '@react-native-async-storage/async-storage';
import { useData, useTheme } from '../../hooks';

interface ILogin {
    userName: string;
    password: string;
}

const Login = ({ onSuccess, onFailed }: any) => {
    const { sizes } = useTheme();
    const nav = useNavigation();
    const [userLogin, setUserLogin] = useState<ILogin>({ userName: "aiub", password: "aiub2020##" })
    const [showPass, setShowPass] = useState(false)
    const { authData, handleAuthData } = useData()
    const [toggleKeyboardVisible, setToggleKeyboardVisible] = useState<boolean>(false)

    useEffect(() => {
        handleAuthData(undefined);
        (async () => {
            await Storage.setItem('authData', "");
        })()
        const ev1 = Keyboard.addListener('keyboardDidShow', () => setToggleKeyboardVisible(true));
        const ev2 = Keyboard.addListener('keyboardDidHide', () => setToggleKeyboardVisible(false));
        return () => {
            ev1.remove()
            ev2.remove()
        }
    }, []);

    useEffect(() => {
        if (authData && authData.token && authData.token.length > 0) {
            nav.navigate({ name: ScreenNames.OAB_MENU } as never)
        }
    }, [authData?.token])


    const [doLogin, { loading }] = useLazyQuery(USER_LOGIN, {
        onCompleted: (data) => {
            debugPrint(data, "response")
            if (data && data.login && data.login.result) {
                if (data.login.result.token.length > 0) {
                    handleAuthData(data.login.result)
                    onSuccess && onSuccess()
                } else {
                    onFailed && onFailed()
                }
            } else {
                handleAuthData(undefined)
                onFailed && onFailed()
                Alert.alert("Error", "Username or password is incorrect!")
            }
        },
        onError: (err) => {
            debugPrint(err)
            handleAuthData(undefined)
            ShowAlert("Username or password is incorrect!", 0)
        }
    })

    const handleUserLogin = useCallback(() => {
        if (userLogin?.userName?.trim()?.length == 0) {
            ShowAlert("Invalid username!", 0)
            return;
        }

        if (userLogin?.password?.trim()?.length == 0) {
            ShowAlert("Invalid password!", 0)
            return;
        }

        doLogin({
            variables: {
                query: {
                    params: [
                        {
                            key: "userName",
                            value: userLogin.userName
                        },
                        {
                            key: "password",
                            value: userLogin.password
                        }
                    ]
                }
            }
        })
    }, [userLogin]);

    // const currentServer = () => {
    //     return Constants.manifest?.extra?.appEnv?.toUpperCase() || "development".toUpperCase();
    // }

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <Text center bold size={32} paddingTop={sizes.padding}>OAB</Text>
                <View style={styles.logo}>
                    <Image
                        source={require('../../assets/images/main_logo.jpeg')}
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
                        activeOutlineColor="#05668d"
                        keyboardType="default"
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
                        activeOutlineColor="#05668d"
                        secureTextEntry={!showPass}
                        autoCorrect={false}
                        left={<TextInput.Icon size={18} icon="lock" />}
                        right={<TextInput.Icon size={18} icon={showPass ? 'eye' : 'eye-off'}
                            onPress={() => {
                                setShowPass(!showPass)
                            }} />}
                        returnKeyLabel='Next'
                        returnKeyType='next'
                        onSubmitEditing={(e) => {
                            handleUserLogin()
                        }}
                        outlineStyle={{ borderWidth: 2, borderRadius: 12 }}
                        value={userLogin.password}
                        onChangeText={(value) => setUserLogin({ ...userLogin, password: value })}
                    />
                    {/* <Text align='right' semibold color={"#056C89"} size={13} marginVertical={5}>Forgot Password?</Text> */}
                </View>

                {
                    !toggleKeyboardVisible && (
                        <Button
                            disabled={loading}
                            radius={10}
                            color={"#056C89"}
                            marginHorizontal={20}
                            marginTop={5}
                            onPress={() => handleUserLogin()}>
                            {loading ? <ActivityIndicator size={"large"} color={"white"} /> : <Text semibold white size={20}>Login</Text>}
                        </Button>
                    )
                }

            </View >
        </View >
    )
}

export default Login;

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