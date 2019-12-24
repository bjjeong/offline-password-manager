import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import InsideNavigator from './InsideNavigator';
// import AuthNavigator from './AuthNavigator';

const OutsideNavigator = createAppContainer(createSwitchNavigator(
    {
        // Auth: AuthNavigator,
        App: {
            screen: InsideNavigator,
        },
    },
    {
        // initialRouteName: 'Auth',
        initialRouteName: 'App',
    },
));

export default OutsideNavigator;
