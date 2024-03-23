import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../components/Header';
import II from "react-native-vector-icons/Ionicons";
import { useRoute } from '@react-navigation/native';
import BottomView from './BottomView';
import moment from 'moment';
import { gettingLoginDetails } from '../../store/storeLoginDetails/LoginDetails';
import { creatingChatList, db } from '../../services/firebase/Firebase_APIs';
import { messageValidation } from '../../utils/validations/messageValidation';
import RenderItem from './RenderItem';

const ChatScreen = (props) => {

    const { params: { selectedData: { name: name = "", roomId: roomId = "", id: id = "" } } } = useRoute();

    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState([]);
    const [getLoginUserData, setLoginUserData] = useState("");

    useEffect(() => {
        fetchLoginDetails();
        const onChildAdd = db.ref(`/messages/${roomId}`)
            .on('child_added', snapshot => {
                console.log('A new node has been added', snapshot.val());
                setChatList((prev) => [snapshot.val(), ...prev]);
            });

        // Stop listening for updates when no longer required
        return () => db.ref(`/messages/${roomId}`).off('child_added', onChildAdd);
    }, [roomId]);

    const handleBack = () => {

        props.navigation.goBack();

    }

    const fetchLoginDetails = async () => {
        const loginUserDetails = await gettingLoginDetails();
        setLoginUserData(loginUserDetails);
    }

    const handleSendMessage = async () => {
        try {
            if (message !== "" && messageValidation(message) != 0) {
                const msgData = {
                    roomId: roomId,
                    message: message,
                    from: getLoginUserData.id,
                    to: id,
                    sendTime: moment().format(),
                    msgType: "text"
                }
                const refrence = db.ref(`/messages/${roomId}`).push();
                msgData.id = refrence.key;
                const response = await refrence.set(msgData);
                const chatListUpdatedData = {
                    lastMsg: message,
                    sendTime: msgData.sendTime,

                }
                const chatListFirstResponse = await creatingChatList(id, getLoginUserData.id, chatListUpdatedData);
                const chatListSecResponse = await creatingChatList(getLoginUserData.id, id, chatListUpdatedData);
                setMessage("");
            }
        } catch (error) {
            console.log({ error });
        }
    }

    return (<View style={styles.container}>
        <Header
            isRightIconVisible={false}
            leftIcon={<II name='arrow-back-outline' size={25} color={"#fff"} style={styles.leftIconStyle} />}
            isDashboardTitleVisible={false}
            anotherScreenTitle={<Text style={{ ...styles.nameText, ...styles.textColor }}>{name}</Text>}
            borderWidth={0}
            leftIconPress={() => handleBack()}
        />
        <View style={styles.flatlistStyle}>
            <FlatList
                data={chatList}
                inverted
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RenderItem sender={item.from === getLoginUserData?.id} item={item} />}
                style={{ marginBottom: 130 }}
            />
        </View>
        <BottomView value={message} onChangeText={(txt) => setMessage(txt)} onPress={() => handleSendMessage()} />
    </View>)
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
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
    flatlistStyle: {
        margin: 15
    }
})