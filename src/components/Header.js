import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import AD from "react-native-vector-icons/AntDesign"
import { gettingLoginDetails, resetKeyChain } from '../store/storeLoginDetails/LoginDetails';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const Header = ({ leftIcon, isRightIconVisible, isDashboardTitleVisible, anotherScreenTitle, borderWidth, leftIconPress }) => {

    const navigation = useNavigation();

    const [greetMessage, setGreetMessage] = useState("...");
    const [loginData, setLoginData] = useState("...");

    useEffect(() => {
        fetchingLoginDetails();
    }, [])

    useFocusEffect(
        useCallback(
            () => {
                fetchingGreetMessage();
            }, [],
        ))

    const fetchingLoginDetails = async () => {
        const result = await gettingLoginDetails();
        setLoginData(result);
    }

    const fetchingGreetMessage = () => {
        const date = new Date();
        if (date.getHours() >= 12 && date.getHours() < 18) {
            setGreetMessage("Good Afternoon!");
        } else if (date.getHours() >= 18 && date.getHours() < 24) {
            setGreetMessage("Good Evening!");
        } else {
            setGreetMessage("Good Morning!");
        }
    }

    const handleLogout = async () => {
        await resetKeyChain();
        ToastAndroid.show("Logout Successfully!", ToastAndroid.LONG, ToastAndroid.SHORT);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity activeOpacity={0.8} onPress={leftIconPress} style={{ ...styles.userIconContainer, borderWidth: borderWidth }}>
                    {leftIcon}
                </TouchableOpacity>
                {isDashboardTitleVisible ? <View>
                    <Text style={{ ...styles.greetText, ...styles.textColor }}>{greetMessage}</Text>
                    <Text style={{ ...styles.nameText, ...styles.textColor }}>{loginData?.name}</Text>
                </View> : anotherScreenTitle}
            </View>
            {isRightIconVisible ? <TouchableOpacity activeOpacity={0.8} onPress={() => handleLogout()}>
                <AD name='logout' size={20} color={"#fff"} />
            </TouchableOpacity> : null}
        </View>
    )
}

export default Header

Header.defaultProps = {
    isRightIconVisible: true,
    leftIcon: <Text>ICON</Text>,
    isDashboardTitleVisible: true,
    anotherScreenTitle: <Text>Add Title</Text>,
    borderWidth: 1,
    leftIconPress: () => { }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#E01226",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10
    },
    textColor: {
        color: "#fff"
    },
    greetText: {
        fontSize: 14,
        fontWeight: "400",
    },
    nameText: {
        fontSize: 16,
        fontWeight: "500",
    },
    subContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    userIconContainer: {
        borderRadius: 30,
        borderColor: "#fff",
        marginRight: 10
    },
    userIconStyle: {
        padding: 5
    }
})