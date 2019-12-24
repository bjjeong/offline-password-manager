import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, Input, Spinner } from '@ui-kitten/components';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import tinycolor from 'tinycolor2';
import * as Keychain from 'react-native-keychain';

const colors = {
    0: 'white',
    1: '#202124',
    2: '#42636d',
    3: '#f4b2aa',
    4: '#ffdc42',
    5: '#5be789',
    6: '#3399ff',
    7: '#a5a2cb',
    8: '#aaaaaa',
    9: '#262d4b',
};

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

const initialState = {
    selected: 0,
    account: '',
    username: '',
    password: '',
    color: '0',
    secureTextEntry: true,
    saving: false,
    validate: false,
};

class NewAccountScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    handleColor = (value) => {
        this.setState({ selected: value, color: value });
    }

    handleChange = (field) => (value) => {
        this.setState({
            [field]: value,
            validate: false,
        });
    }

    handleSave = async () => {
        const { account, username, password, color } = this.state;
        const isValid = account.length > 0 && username.length > 0 && password.length > 0;
        if (isValid) {
            this.setState({ saving: true });
            let accounts = [];
            const oldAccounts = await Keychain.getGenericPassword();

            if (oldAccounts) {
                accounts = [...JSON.parse(oldAccounts.password)];
            }

            const user = { username, color: colors[color] };
            const newAccounts = [...accounts];
            newAccounts.push({ account, username, color: colors[color] });

            await Keychain.setInternetCredentials(account, JSON.stringify(user), password);
            await Keychain.setGenericPassword('me', JSON.stringify(newAccounts));
            this.setState({ ...initialState }, () => this.props.navigation.dispatch(resetAction));
        } else {
            this.setState({ validate: true });
        }
    }

    onEyePress = () => this.setState({ secureTextEntry: !this.state.secureTextEntry });

    renderSave = (style) => {
        const newIcon = () => <Icon {...style} name="checkmark" />;

        return (
            <TopNavigationAction icon={newIcon} onPress={this.handleSave} />
        );
    }

    renderBack = (style) => {
        const backIcon = () => <Icon {...style} name="arrow-back" />;
        const goBack = () => this.props.navigation.goBack();
        return <TopNavigationAction icon={backIcon} onPress={goBack} />;
    }

    renderPassword = (style) => (
        <Icon {...style} name={this.state.secureTextEntry ? 'eye-off' : 'eye'} />
    )

    renderColors() {
        const { selected } = this.state;
        const keys = Object.keys(colors);

        return (
            <View style={styles.colorSelector}>
                {
                    keys.map((idx) => {
                        const borderColor = (idx === 0 ? '#ccc' : 'none');
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={[styles.color, {
                                    backgroundColor: colors[idx],
                                    borderColor: selected.toString() === idx ? '#333' : borderColor,
                                    borderWidth: selected.toString() === idx ? 2 : 0,
                                }]}
                                onPress={() => this.handleColor(idx)}
                            />
                        );
                    })
                }
            </View>
        );
    }

    render() {
        const { selected, account, username, password, secureTextEntry, validate } = this.state;
        const backgroundColor = tinycolor(colors[selected]);
        const textColor = backgroundColor.isLight() ? '#333' : '#fff';
        const validateAccount = validate && account.length === 0;
        const validateUsername = validate && username.length === 0;
        const validatePassword = validate && password.length === 0;

        if (this.state.saving) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size="large" />
                </View>
            );
        }

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor }}>
                <TopNavigation
                    rightControls={this.renderSave({ fill: textColor })}
                    leftControl={this.renderBack({ fill: textColor })}
                    title="Add New Account"
                    alignment="center"
                    titleStyle={{ fontSize: 20, color: textColor }}
                    style={{ backgroundColor }}
                />
                <View style={styles.formContainer}>
                    <Input
                        status={validateAccount ? 'danger' : 'basic'}
                        label="Account Name"
                        placeholder="Ex. Facebook"
                        value={account}
                        onChangeText={this.handleChange('account')}
                        caption={validateAccount ? 'Cannot be empty' : ''}
                        style={styles.input}
                        labelStyle={{ color: textColor }}
                    />
                    <Input
                        status={validateUsername ? 'danger' : 'basic'}
                        label="Account Name"
                        placeholder="Username or Email"
                        value={username}
                        onChangeText={this.handleChange('username')}
                        caption={validateUsername ? 'Cannot be empty' : ''}
                        style={styles.input}
                        labelStyle={{ color: textColor }}
                        autoCapitalize="none"
                    />
                    <Input
                        status={validatePassword ? 'danger' : 'basic'}
                        label="Account Name"
                        placeholder="Password"
                        value={password}
                        onChangeText={this.handleChange('password')}
                        caption={validatePassword ? 'Cannot be empty' : ''}
                        icon={this.renderPassword}
                        secureTextEntry={secureTextEntry}
                        onIconPress={this.onEyePress}
                        style={styles.input}
                        labelStyle={{ color: textColor }}
                    />
                </View>
                { this.renderColors() }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    colorSelector: {
        marginVertical: 15,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    color: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'green',
    },
    formContainer: {
        marginTop: 15,
        marginHorizontal: 20,
    },
    input: {
        marginBottom: 15,
    },
});

export default NewAccountScreen;
