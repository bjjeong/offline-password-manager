import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction, Icon, Text } from '@ui-kitten/components';
import tinycolor from 'tinycolor2';
import * as Keychain from 'react-native-keychain';

const PasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState('');

    useEffect(() => {
        const item = navigation.getParam('item');
        const { account } = item;
        const getPassword = async () => {
            const result = await Keychain.getInternetCredentials(account);
            setPassword(result.password);
        };
        getPassword();
    });

    const item = navigation.getParam('item');
    const { color, account, username } = item;
    const backgroundColor = tinycolor(color);
    const textColor = backgroundColor.isLight() ? '#333' : '#fff';

    const renderBack = (style) => {
        const backIcon = () => <Icon {...style} name="arrow-back" />;
        const goBack = () => navigation.goBack();

        return <TopNavigationAction icon={backIcon} onPress={goBack} />;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
            <TopNavigation
                leftControl={renderBack({ fill: textColor })}
                title={account}
                alignment="center"
                titleStyle={{ fontSize: 20, color: textColor }}
                style={{ backgroundColor }}
            />
            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.username}>{username}</Text>
                    <View style={styles.passwordContainer}>
                        <Text style={styles.password}>{password}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    details: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
    },
    passwordContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        borderColor: '#333',
        borderWidth: 1,
    },
    username: {
        fontSize: 16,
        marginBottom: 15,
    },
    password: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default PasswordScreen;
