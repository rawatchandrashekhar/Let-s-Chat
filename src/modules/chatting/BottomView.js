import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import MCI from "react-native-vector-icons/MaterialCommunityIcons";

const BottomView = ({ onChangeText = () => { }, onPress = () => { }, value = "" }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TextInput
                    value={value}
                    placeholder='Write a message'
                    multiline
                    onChangeText={onChangeText}
                />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.sendIconContainer}>
                <MCI name='send' size={25} color={"#fff"} />
            </TouchableOpacity>
        </View>
    )
}

export default BottomView

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: "#F0E3CA"
    },
    textInputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        width: "80%"
    },
    sendIconContainer: {
        backgroundColor: "#E01226",
        width: "10%",
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10
    }
})