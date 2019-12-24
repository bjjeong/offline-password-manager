import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { TopNavigation, ListItem, Toggle, Icon, Button } from '@ui-kitten/components';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';

const SettingsScreen = ({ navigation }) => {
    const [biometric, setBiometric] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('biometric');
                if (value !== null) {
                    setBiometric(value === 'true');
                }
            } catch (e) {
                // error reading value
            }
        };
        getData();
    });

    const changeBiometric = async () => {
        try {
            const newValue = !biometric;
            await AsyncStorage.setItem('biometric', newValue.toString());
            setBiometric(!biometric);
        } catch (e) {
            // saving error
        }
    };

    const deleteAccount = async () => {
        try {
            const accountsJSON = await Keychain.getGenericPassword();
            if (accountsJSON) {
                const accounts = JSON.parse(accountsJSON.password);
                await Keychain.resetGenericPassword();
                accounts.forEach((acc) => Keychain.resetInternetCredentials(acc.account));
            }

            await Keychain.resetInternetCredentials('app');
            navigation.navigate('Loading');
        } catch (error) {
            console.log(error);
        }
    };

    const renderBioAccessory = () => (
        <Toggle
            checked={biometric}
            onChange={changeBiometric}
        />
    );

    const renderPasswordAccessory = () => <Icon name="arrow-ios-forward-outline" width={20} height={20} />;

    const renderBioIcon = () => <Icon name="shield-outline" />;

    const renderLockIcon = () => <Icon name="lock-outline" />;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation
                title="Settings"
                alignment="center"
                titleStyle={{ fontSize: 20 }}
            />
            <ListItem
                title="Use Biometrics"
                description="FaceID/TouchID"
                icon={renderBioIcon}
                accessory={renderBioAccessory}
            />
            <ListItem
                title="Change Passcode"
                icon={renderLockIcon}
                accessory={renderPasswordAccessory}
            />
            <View style={styles.deleteButtonContainer}>
                <Button
                    status="danger"
                    onPress={deleteAccount}
                >
                    DELETE ACCOUNT
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    deleteButtonContainer: {
        marginTop: 20,
        flex: 1,
        paddingHorizontal: 20,
    },
});

export default SettingsScreen;
