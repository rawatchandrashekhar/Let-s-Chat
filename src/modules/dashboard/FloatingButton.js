import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ET from "react-native-vector-icons/Entypo";

const FloatingButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
            <ET name='users' size={27} color={"#fff"} />
        </TouchableOpacity>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        backgroundColor: "#E01226",
        position: "absolute",
        bottom: 20,
        right: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    }
})