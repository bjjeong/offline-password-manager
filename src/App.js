import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import OutsideNavigator from './navigation/OutsideNavigator';

enableScreens();

const App = () => (
    <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <PaperProvider>
                <OutsideNavigator styles={{ flex: 1 }} />
            </PaperProvider>
        </ApplicationProvider>
    </>
);

export default App;
