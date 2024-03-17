import React from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import Space from '../../components/Space';
import Button from '../../components/Button';

const { width, height } = Dimensions.get("screen");

const Login = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.sub_container}>
                <View style={styles.bottom_border}>
                    <TextInput
                        placeholder='Enter mail'
                    />
                </View>
                <Space mV={10} />
                <View style={styles.bottom_border}>
                    <TextInput
                        placeholder='Enter password'
                    />
                </View>
                <Space mV={15} />
                <Button isIcon={true} borderRadius={25} width={60} onPress={() => alert('Pressed on button!')} />
            </View>
            <Space mV={40} />
            <View style={styles.container_register_style}>
                <Text style={styles.ques_style}>Do you have an account?</Text>
                <Space mH={3} />
                <Text style={styles.register_style} onPress={()=>props.navigation.navigate("SignUp")}>Register now</Text>
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