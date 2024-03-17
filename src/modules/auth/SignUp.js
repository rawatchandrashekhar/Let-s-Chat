import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Dimensions, Text, ToastAndroid } from 'react-native'
import Button from '../../components/Button'
import Space from '../../components/Space';
import uuid from 'react-native-uuid';
import { settingData } from '../../firebase/Firebase_APIs';

const { width, height } = Dimensions.get("screen");

const SignUp = (props) => {

    const [registerData, setRegisterData] = useState({
        name: "",
        mail: "",
        password: "",
        about: ""
    })

    const handleSubmit = async () => {
        try {
            if (registerData.name === "" || registerData.mail === "" || registerData.password === "") {
                ToastAndroid.showWithGravityAndOffset('Please fill required fields!', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            } else {
                let data = { ...registerData, id: uuid.v4() }
                await settingData(data);
                setRegisterData({
                    name: "",
                    mail: "",
                    password: "",
                    about: ""
                })
                props.navigation.navigate("Login");
            }
        } catch (error) {
            console.log({ error });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.sub_container}>
                <View style={styles.bottom_border}>
                    <TextInput
                        placeholder='Enter name'
                        onChangeText={(txt) => setRegisterData({ ...registerData, name: txt })}
                    />
                </View>
                <Space mV={10} />
                <View style={styles.bottom_border}>
                    <TextInput
                        placeholder='Enter mail'
                        onChangeText={(txt) => setRegisterData({ ...registerData, mail: txt })}
                    />
                </View>
                <Space mV={10} />
                <View style={styles.bottom_border}>
                    <TextInput
                        placeholder='Enter password'
                        onChangeText={(txt) => setRegisterData({ ...registerData, password: txt })}
                    />
                </View>
                <Space mV={10} />
                <View style={styles.bottom_border}>
                    <TextInput
                        placeholder='Enter about'
                        onChangeText={(txt) => setRegisterData({ ...registerData, about: txt })}
                    />
                </View>
                <Space mV={15} />
                <Button buttonText={'Submit'} onPress={() => handleSubmit()} />
            </View>
            <Space mV={40} />
            <View style={styles.container_register_style}>
                <Text style={styles.ques_style}>Existing user?</Text>
                <Space mH={3} />
                <Text style={styles.register_style} onPress={() => props.navigation.navigate("Login")}>Login now</Text>
            </View>
        </View>
    )
}

export default SignUp

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