import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Splash = (props) => {

    useEffect(() => {
        let timeOut = setTimeout(() => {
            props.navigation.navigate('Login');
        }, 2000);

        return () => {
            clearTimeout(timeOut)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Let's Chat</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E01226"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff"
    }
})