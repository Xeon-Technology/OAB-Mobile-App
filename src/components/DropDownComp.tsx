import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const { height, width } = Dimensions.get("window")

export type DropdownComponentDataType = {
    label: string;
    value: any;
}

export type DropdownComponentPropType = {
    label: string;
    data: DropdownComponentDataType[];
    onItemSelect: (item: DropdownComponentDataType) => void;
    search: boolean;
    defaultValue?: any;
    onSearch?: (txt: string) => void | undefined
    labelStyle?: any
}

const DropdownComponent = ({ label, data, onItemSelect, search, defaultValue, onSearch = undefined, labelStyle = { fontSize: 16 } }: DropdownComponentPropType) => {
    const [value, setValue] = useState(defaultValue);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    {label}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={labelStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                containerStyle={{ marginTop: -(height * 0.032) }}
                iconStyle={styles.iconStyle}
                data={data}
                search={search}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? label.toString() : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    onItemSelect(item)
                }}
                onChangeText={(e) => {
                    onSearch && onSearch(e)
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 8,
    },
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    // placeholderStyle: {
    //     fontSize: 16,
    // },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});