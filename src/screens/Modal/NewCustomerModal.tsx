import { ActivityIndicator, Keyboard, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import RNModalComp from '../../components/RNModalComp'
import { Button, Input, Text } from '../../components'
import { Entypo } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import DropdownComponent from '../../components/DropDownComp';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { ShowToast, debugPrint } from '../../utils/sytemUtil';
import { CLIENT_QUERY, CREATE_CLIENT_MUTATION, GET_AREA } from '../../core/network/graphql/queries';
import { Clients } from '../../constants/types/accountType';

interface INewCustomerModal {
    visible: boolean;
    onDismiss: () => void;
    onSuccess: (phoneNumber: string) => void;
    phoneNumber: string;
}

export const AreaLabel = {
    Division: 'বিভাগ',
    District: 'জেলা',
    Sub_District: 'উপজেলা',
    Police_Station: 'থানা',
};

type initialStateType = {
    dropdowns: any[];
    selectedDdIndex: number;
    clientName: string;
    selectedArea: {
        label: string;
        value: number;
        areaTypeId: number;
        areaType: string;
    };
    clientAddress: { division: string; district: string; subDistrict: string; thana: string; };
    toggleKeyboardVisible: boolean;
};
const initialState: initialStateType = {
    dropdowns: [],
    selectedDdIndex: 0,
    clientName: '',
    selectedArea: {
        label: '',
        value: 0,
        areaTypeId: 0,
        areaType: '',
    },
    clientAddress: { division: '', district: '', subDistrict: '', thana: '', },
    toggleKeyboardVisible: false,
};

enum ActionType {
    SET_DROPDOWNS,
    SET_CLIENT_NAME,
    SET_DIVISION,
    SET_ZILA,
    SET_UPAZILA,
    SET_THANA,
    SET_DD_INDEX,
    SET_SELECTED_AREA,
    TOGGLE_KEYBOARD_VISIBLE
}

const stateReducer = (state: initialStateType, action: any) => {
    switch (action.type) {
        case ActionType.SET_DROPDOWNS:
            return { ...state, dropdowns: action.payload };

        case ActionType.SET_CLIENT_NAME:
            return { ...state, clientName: action.payload };

        case ActionType.SET_DD_INDEX:
            return { ...state, selectedDdIndex: action.payload, };

        case ActionType.SET_SELECTED_AREA:
            return { ...state, selectedArea: action.payload, };

        case ActionType.SET_DIVISION:
            return { ...state, clientAddress: { ...state.clientAddress, division: action.payload } };

        case ActionType.SET_ZILA:
            return { ...state, clientAddress: { ...state.clientAddress, district: action.payload } };

        case ActionType.SET_UPAZILA:
            return { ...state, clientAddress: { ...state.clientAddress, subDistrict: action.payload } };

        case ActionType.SET_THANA:
            return { ...state, clientAddress: { ...state.clientAddress, thana: action.payload } };

        case ActionType.TOGGLE_KEYBOARD_VISIBLE:
            return { ...state, toggleKeyboardVisible: action.payload, };

        default:
            return state;
    }
};

const NewCustomerModal = ({ visible, onDismiss, onSuccess, phoneNumber }: INewCustomerModal) => {
    const { colors } = useTheme();

    const [state, dispatch] = React.useReducer(stateReducer, initialState);

    const {
        dropdowns,
        selectedDdIndex,
        clientName,
        selectedArea,
        clientAddress,
        toggleKeyboardVisible,

    }: initialStateType = state;

    useEffect(() => {
        visible && getArea({
            variables: {
                parentId: null,
            },
        });
    }, [visible]);

    useEffect(() => {
        const ev1 = Keyboard.addListener('keyboardDidShow', () => dispatch({ type: ActionType.TOGGLE_KEYBOARD_VISIBLE, payload: true }));
        const ev2 = Keyboard.addListener('keyboardDidHide', () => dispatch({ type: ActionType.TOGGLE_KEYBOARD_VISIBLE, payload: false }));
        return () => {
            ev1.remove();
            ev2.remove();
        };
    }, []);

    const { data: clientData } = useQuery(CLIENT_QUERY, {
        fetchPolicy: "network-only",
        variables: {
            query: {
                params: [
                    {
                        "key": "parentId",
                        "value": Clients + ""
                    },
                    {
                        "key": "onlyLeaf",
                        "value": "true"
                    },
                    {
                        "key": "forContact",
                        "value": "true"
                    },
                    {
                        "key": "filter",
                        "value": "clients"
                    },
                    {
                        "key": 'skipBalance',
                        "value": 'true',
                    },
                ]
            }
        },
        onError: (e) => {
            debugPrint(e.message)
            ShowToast(e.message, 0);
        }
    });

    const [getArea] = useLazyQuery(GET_AREA, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            const options = data?.userQuery?.getArea.map((a: any) => ({
                value: a.id,
                label: a.name,
                areaTypeId: a.areaTypeId,
                areaType: a.areaType?.name,
            }));
            if (options.length > 0) {
                const dropDown = {
                    options,
                    label: options[0].areaType,
                    areaTypeId: options[0].areaTypeId,
                };
                const oldDropdowns = [...dropdowns];
                let newDd = [...oldDropdowns.slice(0, selectedDdIndex + 1), dropDown];
                dispatch({ type: ActionType.SET_DROPDOWNS, payload: newDd });
            }
        },
        onError: (e) => {
            ShowToast(e.message, 1);
        },
    });

    const [createClientMutation, { loading: ClientSubmitting }] = useMutation(CREATE_CLIENT_MUTATION, {
        onCompleted: (data) => {
            if (data?.account?.addorUpdate?.success) {
                onDismiss();
                ShowToast('Successfully client created!', 1);
                onSuccess(data?.account?.addorUpdate?.data?.contact?.number);
            }
        },
        onError: (e) => {
            ShowToast(e.message, 0);
        }
    });

    const areaTranslate = (data: any) => {
        if (data === 'Division') {
            return AreaLabel.Division;
        }
        if (data === 'District') {
            return AreaLabel.District;
        }
        if (data === 'Sub-District') {
            return AreaLabel.Sub_District;
        }
        if (data === 'Police Station') {
            return AreaLabel.Police_Station;
        }
    };

    const isValidFromData = () => {
        return clientName?.trim().length >= 3 && phoneNumber?.trim().length >= 11 && selectedArea?.value;
    }

    const handleSubmit = () => {
        if (!isValidFromData()) return

        let parentId = clientData && clientData?.accountQuery && clientData?.accountQuery?.accounts && clientData?.accountQuery?.accounts ?
            clientData?.accountQuery?.accounts[0]?.id : 0;

        if (parentId === 0) {
            ShowToast('Client not found!', 0);
            return;
        }

        createClientMutation({
            variables: {
                account: {
                    name: clientName?.trim(),
                    willHaveChild: false,
                    parentId,
                    contact: {
                        person: clientName?.trim(),
                        number: phoneNumber?.trim(),
                        place: JSON.stringify(clientAddress),
                        areaId: selectedArea?.value
                    }
                }
            }
        });
    }

    return (
        <RNModalComp
            visible={visible}
            onRequestClose={onDismiss}
        >
            <View style={[styles.container, { borderColor: colors.gray }]}>
                <Text bold size={17} center style={{ backgroundColor: "#ede0d4", padding: 10, margin: 10, borderRadius: 6 }}>নতুন কাস্টমার রেজিস্ট্রেশন করুন</Text>
                <View style={{ flex: 1, padding: 10 }}>
                    <Text semibold size={16} marginBottom={8}>নাম <Text danger bold>*</Text></Text>
                    <Input
                        placeholder="কাস্টমারের নাম লিখুন "
                        onChangeText={(txt) => dispatch({ type: ActionType.SET_CLIENT_NAME, payload: txt })}
                        keyboardType="default"
                        success={clientName?.trim().length >= 3}
                        danger={clientName?.trim().length <= 3}
                        style={{ backgroundColor: "#fff", }}
                    />

                    <Text semibold size={16} marginVertical={8}>ফোন নম্বর <Text danger bold>*</Text></Text>
                    <Input
                        placeholder="ফোন নম্বর লিখুন"
                        disabled
                        keyboardType="number-pad"
                        value={phoneNumber?.toString().trim()}
                        style={{ backgroundColor: "#f1f1f1", marginBottom: 5, borderRadius: 5 }}
                    />

                    {dropdowns?.map((item: any, index: number) => {
                        return (
                            <View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        marginHorizontal: '1%',
                                    }}>
                                    <Text bold>{areaTranslate(item.label)}*</Text>
                                </View>
                                <Text key={item.label} semibold size={16} marginTop={5} >{`${areaTranslate(item.label)}`}</Text>
                                <DropdownComponent
                                    key={(index * 3).toString()}
                                    label={`-- ${areaTranslate(item.label)} নির্বাচন করুন --`}
                                    data={item.options || []}
                                    onItemSelect={(a: any) => {
                                        dispatch({
                                            type: ActionType.SET_DD_INDEX,
                                            payload: index,
                                        });
                                        dispatch({
                                            type: ActionType.SET_SELECTED_AREA,
                                            payload: a,
                                        });

                                        if (a?.areaTypeId === 1 && a?.value > 0) {
                                            dispatch({
                                                type: ActionType.SET_DIVISION,
                                                payload: a?.label,
                                            });
                                        }
                                        if (a?.areaTypeId === 2 && a?.value > 0) {
                                            dispatch({ type: ActionType.SET_ZILA, payload: a?.label });
                                        }
                                        if (
                                            a?.areaTypeId === 3 ||
                                            (a?.areaTypeId === 7 && a?.value > 0)
                                        ) {
                                            let options = JSON.parse(
                                                JSON.stringify(dropdowns),
                                            ).filter((x: any) => x.areaTypeId !== 8);
                                            dispatch({
                                                type: ActionType.SET_DROPDOWNS,
                                                payload: options,
                                            });
                                            dispatch({
                                                type: ActionType.SET_UPAZILA,
                                                payload: a?.label,
                                            });
                                        }
                                        if (a?.areaTypeId === 8 && a?.value > 0) {
                                            dispatch({
                                                type: ActionType.SET_THANA,
                                                payload: a?.label,
                                            });
                                        }

                                        getArea({
                                            variables: {
                                                parentId: a.value,
                                            },
                                        });
                                    }}
                                    search={true}
                                    onSearch={(item: any) => { }}
                                />
                            </View>
                        );
                    })
                    }
                </View>

                {!toggleKeyboardVisible &&
                    <View style={styles.footer}>
                        <Button
                            disabled={!isValidFromData() || ClientSubmitting}
                            onPress={() => {
                                handleSubmit();
                            }}
                            color={"#056C89"}
                            style={{ marginHorizontal: 10, marginBottom: 10 }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                {
                                    ClientSubmitting ? <ActivityIndicator color="white" size={"large"} /> :
                                        <>
                                            <Entypo name="save" size={20} color="white" />
                                            <Text white semibold size={18} paddingLeft={5}>Save</Text>
                                        </>
                                }
                            </View>
                        </Button>
                    </View>}
            </View>
        </RNModalComp >
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