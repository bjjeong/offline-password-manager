import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const PersonIcon = (style) => (
    <Icon {...style} name="settings" />
);

const HomeIcon = (style) => (
    <Icon {...style} name="home" />
);

const TabBar = ({ navigation }) => {
    const onSelect = (index) => {
        const selectedTabRoute = navigation.state.routes[index];
        navigation.navigate(selectedTabRoute.routeName);
    };

    return (
        <SafeAreaView>
            <BottomNavigation selectedIndex={navigation.state.index} onSelect={onSelect}>
                <BottomNavigationTab icon={HomeIcon} />
                <BottomNavigationTab icon={PersonIcon} />
            </BottomNavigation>
        </SafeAreaView>
    );
};

export default TabBar;
