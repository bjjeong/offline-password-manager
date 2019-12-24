import { createStackNavigator } from 'react-navigation-stack';
import SignUpScreen from '../screens/auth/SignUpScreen';

const AuthNavigator = createStackNavigator({
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            header: null,
        },
    },
});

export default AuthNavigator;
