import 'react-native-gesture-handler';
import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';

YellowBox.ignoreWarnings([
    'Require cycle:',
]);

AppRegistry.registerComponent(appName, () => require('./src/App').default);
