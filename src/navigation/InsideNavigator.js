import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import TabBar from '../screens/auth/components/TabBar';
import NewAccountScreen from '../screens/home/NewAccountScreen';
import PasswordScreen from '../screens/home/PasswordScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    NewAccount: {
        screen: NewAccountScreen,
        navigationOptions: {
            header: null,
        },
    },
    ViewPassword: {
        screen: PasswordScreen,
        navigationOptions: {
            header: null,
        },
    },
});

const SettingsStack = createStackNavigator({
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            header: null,
        },
    },
});

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Profile: SettingsStack,
}, {
    tabBarComponent: TabBar,
});

export default TabNavigator;
