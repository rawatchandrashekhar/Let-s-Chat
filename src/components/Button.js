import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import EI from "react-native-vector-icons/EvilIcons"

// const { width, height } = Dimensions.get("screen");

const Button = ({ width, borderRadius, buttonText, isIcon, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ ...styles.container, width: width, borderRadius: borderRadius }}>
            {isIcon ? <View style={styles.iconContainer}><EI name='chevron-right' size={60} color="#fff" style={styles.icon_style} /></View> :
                <Text style={styles.btnTextStyle}>{buttonText}</Text>}
        </TouchableOpacity>
    )
}

export default Button

Button.defaultProps = {
    width: "100%",
    borderRadius: 20,
    buttonText: "Button",
    isIcon: false,
    onPress: () => { }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E01226",
        alignSelf: "center"
    },
    btnTextStyle: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
        fontWeight: "600"
    },
    iconContainer: {
        alignSelf: "center"
    },
    icon_style: {
        bottom: 7
    }
})