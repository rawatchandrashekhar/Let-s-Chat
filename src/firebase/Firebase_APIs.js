import { firebase } from "@react-native-firebase/database";

const settingData = async (data) => {
    await firebase
        .app()
        .database(process.env.FIREBASE_DATABASE_URL)
        .ref(`/users/${data.id}`).set(data);
}

export { settingData }