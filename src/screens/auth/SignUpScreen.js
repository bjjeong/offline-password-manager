import React, { useState } from 'react';
import {
    View, StyleSheet, Text, StatusBar, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { Input, Button, Icon } from '@ui-kitten/components';
import * as Keychain from 'react-native-keychain';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [pin, setPin] = useState('');
    const [secure, setSecure] = useState(true);

    const onEyePress = () => setSecure(!secure);
    const renderPassword = (style) => (
        <Icon {...style} name={secure ? 'eye-off' : 'eye'} />
    );
    const onPress = async () => {
        try {
            await Keychain.setInternetCredentials('app', name, pin);
            navigation.navigate('App');
        } catch (error) {
            Alert.arert('Something went wrong!');
        }
    };

    return (
        <SafeAreaView forceInset={{ top: 'never' }} style={{ flex: 1, backgroundColor: '#e1e1e1' }}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={['#224ADC', '#1842bd', '#0d3797']}
                style={styles.topHalf}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>REGISTER</Text>
                    <Text style={{ fontSize: 18, color: 'white' }}>Create a passcode to start</Text>
                </View>
            </LinearGradient>
            <View style={styles.bottomHalf}>
                <Button status="primary" style={styles.button} onPress={onPress} disabled={pin.length === 0 || name.length === 0}>
                    CREATE ACCOUNT
                </Button>
                <Text style={styles.disclaimer}>All passwords are stored locally on your device - never uploaded or stored elsewhere</Text>
            </View>
            <View pointerEvents="box-none" style={styles.absoluteContainer}>
                <View style={styles.formContainer}>
                    <Input
                        value={name}
                        onChangeText={setName}
                        label="NAME"
                        style={{ marginBottom: 20 }}
                    />
                    <Input
                        value={pin}
                        onChangeText={setPin}
                        icon={renderPassword}
                        onIconPress={onEyePress}
                        secureTextEntry={secure}
                        label="PASSCODE"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topHalf: {
        backgroundColor: 'blue',
        flex: 3,
    },
    bottomHalf: {
        flex: 4,
        backgroundColor: '#e1e1e1',
        justifyContent: 'flex-end',
        paddingHorizontal: 50,
        paddingBottom: 30,
    },
    disclaimer: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 12,
        color: '#777',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        color: '#fcffff',
        fontWeight: 'bold',
        letterSpacing: 1.2,
        marginBottom: 10,
    },
    subtitle: {

    },
    absoluteContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '92%',
        paddingVertical: 80,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
    },
});

export default SignUpScreen;
