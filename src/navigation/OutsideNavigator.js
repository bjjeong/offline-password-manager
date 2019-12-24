import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import InsideNavigator from './InsideNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoading from '../screens/auth/AuthLoading';

const OutsideNavigator = createAppContainer(createSwitchNavigator(
    {
        Auth: AuthNavigator,
        Loading: AuthLoading,
        App: InsideNavigator,
    },
    {
        initialRouteName: 'Loading',
    },
));

export default OutsideNavigator;
