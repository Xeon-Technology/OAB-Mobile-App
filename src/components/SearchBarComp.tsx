// SearchBar.js
import React, { memo } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBarComp = ({ clicked, searchPhrase, setSearchPhrase, setCLicked }: any) => {
    return (
        <View style={styles.container}>
            <View style={clicked ? styles.searchBar__clicked : styles.searchBar_unclicked}>
                <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />

                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                        // setClicked(true);
                    }}
                />

                {clicked && (
                    <Entypo
                        name="cross"
                        size={20}
                        color="black"
                        style={{ padding: 1 }}
                        onPress={() => {
                            setSearchPhrase("");
                        }}
                    />
                )}
            </View>

            {clicked && (
                <View>
                    <Button
                        title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            // setClicked(false);
                        }}></Button>
                </View>
            )}
        </View>
    );
};
export default memo(SearchBarComp);

// styles
const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    searchBar_unclicked: {
        padding: 6,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#d9dbda",
        borderRadius: 12,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
});
