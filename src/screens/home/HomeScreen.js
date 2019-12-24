import React, { PureComponent } from 'react';
import { Icon, TopNavigation, TopNavigationAction, List, ListItem, Button, Layout, CheckBox, Modal } from '@ui-kitten/components';
import { SafeAreaView } from 'react-navigation';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import tinycolor from 'tinycolor2';
import { Text } from 'react-native';

class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            selectMode: false,
            selected: [],
            isVisible: false,
        };
    }

    async componentDidMount() {
        const accountsJSON = await Keychain.getGenericPassword();
        if (accountsJSON) {
            const accounts = JSON.parse(accountsJSON.password);
            this.setState({ accounts: [...accounts] });
        }
    }

    goToItem = async (item) => {
        this.props.navigation.navigate('ViewPassword', { item });
    }

    handlePress = (index) => {
        const { selected, selectMode } = this.state;
        if (selectMode) {
            const isChecked = selected.includes(index);
            if (isChecked) {
                const newSelected = selected.filter((el) => el !== index);
                this.setState({ selected: newSelected });
            } else {
                const newSelected = [...selected, index];
                this.setState({ selected: newSelected });
            }
        }
    }

    handleLongPress = (index) => {
        if (this.state.selectMode) {
            const oldSelected = [...this.state.selected];
            this.setState({ selected: [...oldSelected, index] });
        } else {
            this.setState({
                selectMode: true,
                selected: [index],
            });
        }
    }

    handleDelete = async () => {
        const { selected } = this.state;
        const accountsJSON = await Keychain.getGenericPassword();
        if (accountsJSON) {
            const accounts = JSON.parse(accountsJSON.password);
            const deleted = accounts.filter((acc, index) => selected.includes(index));
            const newAccounts = accounts.filter((acc, index) => !selected.includes(index));
            await Keychain.setGenericPassword('accounts', JSON.stringify(newAccounts));
            deleted.forEach((acc) => Keychain.resetInternetCredentials(acc.account));
            this.setState({
                accounts: [...newAccounts],
                selectMode: false,
            });
        }
    }

    renderNewButton = (style) => {
        const newIcon = () => <Icon {...style} name="plus" />;
        const trashIcon = () => <Icon fill="#fc205e" name="trash-outline" />;
        const goToNew = () => this.props.navigation.navigate('NewAccount');

        if (this.state.selectMode) {
            return (
                <TopNavigationAction icon={trashIcon} onPress={this.handleDelete} />
            );
        }

        return (
            <TopNavigationAction icon={newIcon} onPress={goToNew} />
        );
    }

    renderCancel = (style) => {
        const cancelIcon = () => <Icon {...style} name="close-outline" />;
        const cancelAction = () => this.setState({ selected: [], selectMode: false });

        if (this.state.selectMode) {
            return (
                <TopNavigationAction icon={cancelIcon} onPress={cancelAction} />
            );
        }
        return null;
    }

    renderItem = ({ item, index }) => {
        const renderItemAccessory = (style) => (
            <Button
                style={style}
                size="small"
                onPress={() => this.goToItem(item)}
            >
                View
            </Button>
        );

        const renderItemIcon = (style, index) => {
            const { selectMode, selected } = this.state;
            const isChecked = selected.includes(index);

            if (selectMode) {
                return (
                    <CheckBox
                        checked={isChecked}
                        status="danger"
                        onChange={() => this.handlePress(index)}
                    />
                );
            }
            return (
                <Icon {...style} name="person" />
            );
        };

        const onPress = () => this.handlePress(index);
        const onLongPress = () => this.handleLongPress(index);
        const fillColor = tinycolor(item.color);

        return (
            <ListItem
                title={item.account}
                description={item.username}
                icon={() => renderItemIcon({
                    fill: item.color,
                    stroke: fillColor.toName() === 'white' ? '#999' : 'none',
                }, index)}
                accessory={renderItemAccessory}
                onPress={onPress}
                onLongPress={onLongPress}
            />
        );
    }

    renderModalElement = () => {
        return (
            <Text>Hello</Text>
        );
    }

    render() {
        return (
            <Layout style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TopNavigation
                        leftControl={this.renderCancel()}
                        rightControls={this.renderNewButton()}
                        title="Your Accounts"
                        alignment="center"
                        titleStyle={{ fontSize: 20 }}
                    />
                    <List
                        data={this.state.accounts}
                        renderItem={this.renderItem}
                    />
                    <Modal
                        allowBackdrop
                        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        onBackdropPress={this.toggleModal}
                        visible={this.state.isVisible}
                    >
                        { this.renderModalElement() }
                    </Modal>
                </SafeAreaView>
            </Layout>
        );
    }
}

export default HomeScreen;
