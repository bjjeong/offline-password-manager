import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import TabBar from '../screens/auth/components/TabBar';
import NewAccountScreen from '../screens/home/NewAccountScreen';
import PasswordScreen from '../screens/home/PasswordScreen';

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

const ProfileStack = createStackNavigator({
    Profile: {
        screen: HomeScreen,
    },
});

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Profile: ProfileStack,
}, {
    tabBarComponent: TabBar,
});

export default TabNavigator;
