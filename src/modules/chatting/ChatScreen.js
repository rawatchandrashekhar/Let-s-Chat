import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../components/Header';
import II from "react-native-vector-icons/Ionicons";
import { useRoute } from '@react-navigation/native';

const ChatScreen = (props) => {

    const { params: { selectedData: { name: name = "" } } } = useRoute();

    const handleBack = () => {
        props.navigation.goBack();
    }

    return (<>
        <Header
            isRightIconVisible={false}
            leftIcon={<II name='arrow-back-outline' size={25} color={"#fff"} style={styles.leftIconStyle} />}
            isDashboardTitleVisible={false}
            anotherScreenTitle={<Text style={{ ...styles.nameText, ...styles.textColor }}>{name}</Text>}
            borderWidth={0}
            leftIconPress={() => handleBack()}
        />
        <View>
            <FlatList

            />
        </View>
    </>)
}

export default ChatScreen

const styles = StyleSheet.create({
    leftIconStyle: {
        padding: 5
    },
    nameText: {
        fontSize: 16,
        fontWeight: "500",
    },
    textColor: {
        color: "#fff"
    },
})