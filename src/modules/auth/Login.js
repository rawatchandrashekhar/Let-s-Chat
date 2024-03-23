import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import Space from '../../components/Space';
import Button from '../../components/Button';
import { gettingUserData } from '../../services/firebase/Firebase_APIs';
import { storeLoginDetail } from '../../store/storeLoginDetails/LoginDetails';
import crashlytics from '@react-native-firebase/crashlytics';

const { width, height } = Dimensions.get("screen");

const Login = (props) => {

    const [loginData, setLoginData] = useState({
        mail: "",
        password: ""
    })

    const handleLogin = async () => {
        try {
            if (loginData.mail === "" || loginData.password === "") {
                ToastAndroid.show("Please enter mail/password", ToastAndroid.SHORT);
                return false;
            }
            const response = await gettingUserData(loginData.mail);
            console.log("response", response);
            if (response === null) {
                ToastAndroid.show("Mail Id doesn't match!", ToastAndroid.SHORT);
                return false;
            }
            const result = Object.values(response)[0];
            console.log('result', result);
            if (result.password !== loginData.password) {
                ToastAndroid.show("Password doesn't match!", ToastAndroid.LONG, ToastAndroid.SHORT);
                return false;
            }
            setLoginData({
                mail: "",
                password: ""
            })
            storeLoginDetail(result);
            crashlytics().log('User signed in.');
            await Promise.all([
                crashlytics().setUserId(result.id),
                crashlytics().setAttribute('credits', String(result.id)),
                crashlytics().setAttributes({
                    email: result.mail,
                    username: result.name,
                }),
            ]);
            ToastAndroid.show("Login Successfully!", ToastAndroid.LONG, ToastAndroid.SHORT);
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }]
            })
        } catch (error) {
            ToastAndroid.show('Something went wrong!', ToastAndroid.LONG, ToastAndroid.SHORT);
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