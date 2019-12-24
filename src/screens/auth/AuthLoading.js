import { useEffect } from 'react';
import * as Keychain from 'react-native-keychain';

const AuthLoading = ({ navigation }) => {
    useEffect(() => {
        const checkPassword = async () => {
            const isPasswordSet = await Keychain.getInternetCredentials('app');
            if (isPasswordSet) {
                navigation.navigate('App');
            } else {
                navigation.navigate('Auth');
            }
        };
        checkPassword();
    });
    return null;
};

export default AuthLoading;
