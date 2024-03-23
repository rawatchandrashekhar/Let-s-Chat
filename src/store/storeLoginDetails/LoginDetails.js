import * as Keychain from 'react-native-keychain';

const storeLoginDetail = async (data) => {
    const jsonString = JSON.stringify(data);
    const res = await Keychain.setGenericPassword('objectKey', jsonString);
    // console.log("store login details", res);
}

const gettingLoginDetails = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        // console.log({ credentials });
        if (credentials) {
            const parseString = JSON.parse(credentials.password);
            console.log('Credentials successfully loaded for user ' + credentials.username);
            return parseString;
        } else {
            console.log('No credentials stored')
        }
    } catch (error) {
        console.log('Keychain couldn\'t be accessed!', error);
    }
    // await Keychain.resetGenericPassword()
}

const resetKeyChain = async () => {
    await Keychain.resetGenericPassword();
}

export { storeLoginDetail, gettingLoginDetails, resetKeyChain }