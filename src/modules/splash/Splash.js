import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gettingLoginDetails } from '../../store/storeLoginDetails/LoginDetails';

const Splash = (props) => {

    useEffect(() => {
        let timeOut = setTimeout(() => {
            async function temp() {
                const loginUserDetails = await gettingLoginDetails();
                if (loginUserDetails) {
                    props.navigation.navigate('Dashboard');
                } else {
                    props.navigation.navigate('Login');
                }
            }
            temp();
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