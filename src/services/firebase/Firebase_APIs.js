import { firebase } from "@react-native-firebase/database";

const db = firebase.app().database(process.env.FIREBASE_DATABASE_URL);

const settingData = async (data) => {
    await db.ref(`/users/${data.id}`).set(data);
}

const gettingUserData = async (mail) => {
    const snapshot = await db.ref('/users/').orderByChild("mail").equalTo(mail).once('value');
    return snapshot.val();
}

const gettingUserList = async () => {
    const snapshot = await db.ref("/users/").once("value");
    return snapshot.val();
}

const creatingChatList = async (firstId, secondId, data) => {
    const snapshot = await db.ref(`/chatlist/${firstId}/${secondId}`).update(data);
    return snapshot
}

export { settingData, gettingUserData, gettingUserList, creatingChatList, db }