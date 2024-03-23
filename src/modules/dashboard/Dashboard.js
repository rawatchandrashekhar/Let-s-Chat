import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { db } from "../../services/firebase/Firebase_APIs";
import ET from "react-native-vector-icons/Entypo";
import { gettingLoginDetails } from "../../store/storeLoginDetails/LoginDetails";
import RenderItem from "./RenderItem";
import FloatingButton from "./FloatingButton";
import crashlytics from '@react-native-firebase/crashlytics';

export default function Dashboard(props) {

    const [chatList, setChatList] = useState([]);
    const [loginData, setLoginData] = useState("");

    useEffect(() => {
        fetchChatList();
    }, [])

    const fetchChatList = async () => {
        try {
            const loginUserDetails = await gettingLoginDetails();
            setLoginData(loginUserDetails);
            db.ref(`/chatlist/${loginUserDetails?.id}`).on("value", (snapshot) => {
                if (snapshot.val() != null) {
                    setChatList(Object.values(snapshot.val()));
                }
            });
        } catch (error) {
            console.log({ error });
        }
    }

    const handleNavigateToUsersList = () => {
        props.navigation.navigate("UsersList");
        // crashlytics().crash()
    }

    return (
        <View style={styles.container}>
            <Header leftIcon={<ET name='user' size={25} color={"#fff"} style={styles.flatlistIconStyle} />} />
            <View style={styles.flatlist_container}>
                <FlatList
                    data={chatList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <RenderItem item={item} props={props} loginData={loginData} />}
                />
            </View>
            <FloatingButton onPress={() => handleNavigateToUsersList()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    flatlist_container: {
        paddingHorizontal: 10
    },
    flatlistIconStyle: {
        padding: 5
    }
})