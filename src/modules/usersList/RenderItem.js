import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import uuid from 'react-native-uuid';
import ET from "react-native-vector-icons/Entypo";
import { creatingChatList, gettingChatListOnce } from '../../services/firebase/Firebase_APIs';

const RenderItem = ({ item, props, loginData }) => {

    const { name, about } = item;

    const handlePress = async (selectedData) => {

        const response = await gettingChatListOnce(loginData.id, selectedData.id);
        if (response == null) {
            const roomId = uuid.v4();
            const loginUserData = {
                roomId,
                id: loginData.id,
                name: loginData.name,
                mail: loginData.mail,
                about: loginData.about,
                lastMsg: ""
            }
            const firstResponse = await creatingChatList(selectedData.id, loginData.id, loginUserData);
            // console.log("first response", firstResponse);
            // const chattingUserData = {
            //     roomId,
            //     id: selectedData.id,
            //     name: selectedData.name,
            //     mail: selectedData.mail,
            //     about: selectedData.about,
            //     lastMsg: ""
            // }
            delete selectedData['password'];
            selectedData.lastMsg = "";
            selectedData.roomId = roomId;
            const secondResponse = await creatingChatList(loginData.id, selectedData.id, selectedData);
            // console.log("secondResponse", secondResponse);
            props.navigation.navigate("ChatScreen", {
                selectedData
            });
        } else {
            props.navigation.navigate("ChatScreen", {
                selectedData: response
            });
        }

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