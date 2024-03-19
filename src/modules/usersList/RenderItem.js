import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid';
import ET from "react-native-vector-icons/Entypo";
import { creatingChatList } from '../../services/firebase/Firebase_APIs';

const RenderItem = ({ item, props, loginData }) => {

    const { name, about } = item;

    const handlePress = async (selectedData) => {
        const roomId = uuid.v4();
        const loginUserData = {
            roomId,
            name: loginData.name,
            mail: loginData.mail,
            about: loginData.about,
            lastMsg: ""
        }
        const firstResponse = await creatingChatList(selectedData.id, loginData.id, loginUserData);
        // console.log("first response", firstResponse);
        const chattingUserData = {
            roomId,
            name: selectedData.name,
            mail: selectedData.mail,
            about: selectedData.about,
            lastMsg: ""
        }
        const secondResponse = await creatingChatList(loginData.id, selectedData.id, chattingUserData);
        // console.log("secondResponse", secondResponse);
        props.navigation.navigate("ChatScreen", {
            selectedData
        });
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress(item)} style={styles.flatlistContainer}>
            <View style={styles.flatlistIconContainer}>
                <ET name='user' size={30} color={"#000"} style={styles.flatlistIconStyle} />
            </View>
            <View>
                <Text style={styles.flatlistNameText}>{name}</Text>
                <Text style={styles.flatlistAboutText}>{about}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default RenderItem

const styles = StyleSheet.create({
    flatlistContainer: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: "grey",
        flexDirection: "row",
        alignItems: "center"
    },
    flatlistIconContainer: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "grey",
        marginRight: 10
    },
    flatlistNameText: {
        color: "#000",
        fontSize: 18
    },
    flatlistAboutText: {
        color: "grey",
        fontSize: 14,
        paddingBottom: 5
    },
    flatlistIconStyle: {
        padding: 5
    }
})