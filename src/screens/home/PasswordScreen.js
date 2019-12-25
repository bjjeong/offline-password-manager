import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction, Icon, Text, Input, Button } from '@ui-kitten/components';
import tinycolor from 'tinycolor2';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';

const PasswordScreen = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [validated, setValidated] = useState(false);

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

    const validatePassword = async () => {
        try {
            const values = await Keychain.getInternetCredentials('app');
            if (values) {
                const appPassword = values.password;
                if (appPassword === userPassword) {
                    setValidated(true);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };


    const renderPassword = () => {
        if (validated) {
            return (
                <View style={styles.passwordContainer}>
                    <Text style={styles.password}>{password}</Text>
                </View>
            );
        }

        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Input
                    onChangeText={setUserPassword}
                    placeholder="Enter app passcode to view password"
                    value={userPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ marginTop: 20 }}
                />
                <Button
                    disabled={userPassword.length === 0}
                    size="small"
                    style={styles.validateButton}
                    onPress={validatePassword}
                >
                    VALIDATE
                </Button>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.separator, { marginRight: 10 }]} />
                    <Text>OR</Text>
                    <View style={[styles.separator, { marginLeft: 10 }]} />
                </View>
                <Button size="large" appearance="ghost" status="primary">Use Biometrics</Button>
            </View>
        );
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
                    { renderPassword() }
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
        fontSize: 20,
        marginBottom: 15,
    },
    password: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        flex: 1,
        backgroundColor: '#333',
        height: 1,
        marginVertical: 20,
    },
    validateButton: {
        width: '100%',
        marginTop: 10,
    },
});

export default PasswordScreen;
