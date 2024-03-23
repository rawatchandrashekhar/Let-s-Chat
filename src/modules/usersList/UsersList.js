import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { gettingLoginDetails } from '../../store/storeLoginDetails/LoginDetails';
import { gettingUserList } from '../../services/firebase/Firebase_APIs';
import Header from '../../components/Header';
import II from "react-native-vector-icons/Ionicons";
import RenderItem from './RenderItem';

const UsersList = (props) => {

    const [userList, setUserList] = useState([]);
    const [loginData, setLoginData] = useState("");

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const fetchAllUsers = async () => {
        try {
            const loginUserDetails = await gettingLoginDetails();
            setLoginData(loginUserDetails);
            const result = await gettingUserList();
            const values = Object.values(result);
            const filteredData = values.filter((item) => item.id !== loginUserDetails.id)
            setUserList(filteredData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleBack = () => {
        props.navigation.goBack();
    }

    return (
        <View>
            <Header
                isRightIconVisible={false}
                leftIcon={<II name='arrow-back-outline' size={25} color={"#fff"} style={styles.leftIconStyle} />}
                isDashboardTitleVisible={false}
                anotherScreenTitle={<Text style={{ ...styles.nameText, ...styles.textColor }}>All users</Text>}
                borderWidth={0}
                leftIconPress={() => handleBack()}
            />
            <View style={styles.flatlist_container}>
                <FlatList
                    data={userList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <RenderItem item={item} props={props} loginData={loginData} />}
                />
            </View>
        </View>
    )
}

export default UsersList

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
    flatlist_container: {
        paddingHorizontal: 10
    },
})