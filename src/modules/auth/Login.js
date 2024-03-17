import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import Space from '../../components/Space';
import Button from '../../components/Button';
import { gettingUserData } from '../../firebase/Firebase_APIs';

const { width, height } = Dimensions.get("screen");

const Login = (props) => {

    const [loginData, setLoginData] = useState({
        mail: "",
        password: ""
    })

    const handleLogin = async () => {
        try {
            const response = await gettingUserData(loginData.mail);
            console.log("response", response);
            if (response === null) {
                ToastAndroid.showWithGravityAndOffset("Mail Id doesn't match!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                return false;
            }
            const result = Object.values(response)[0];
            console.log('result', result);
            if (result.password !== loginData.password) {
                ToastAndroid.showWithGravityAndOffset("Password doesn't match!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
            ToastAndroid.showWithGravityAndOffset("Login Successfully!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset('Something went wrong!', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            console.log({ error });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.sub_container}>
                <View style={styles.bottom_border}>
                    <TextInput
                        placeholder='Enter mail'
                        onChangeText={(txt) => setLoginData({ ...loginData, mail: txt })}
                    />
                </View>
                <Space mV={10} />
                <View style={styles.bottom_border}>
                    <TextInput
                        placeholder='Enter password'
                        onChangeText={(txt) => setLoginData({ ...loginData, password: txt })}
                    />
                </View>
                <Space mV={15} />
                <Button isIcon={true} borderRadius={25} width={60} onPress={() => handleLogin()} />
            </View>
            <Space mV={40} />
            <View style={styles.container_register_style}>
                <Text style={styles.ques_style}>Do you have an account?</Text>
                <Space mH={3} />
                <Text style={styles.register_style} onPress={() => props.navigation.navigate("SignUp")}>Register now</Text>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    sub_container: {
        // backgroundColor: "red",
        width: width * 0.7
    },
    bottom_border: {
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    container_register_style: {
        flexDirection: "row",
        alignItems: "center"
    },
    ques_style: {
        color: "grey",
        fontSize: 14
    },
    register_style: {
        color: "#E01226",
        fontSize: 15,
        fontWeight: "500",
        textDecorationLine: "underline"
    }
})