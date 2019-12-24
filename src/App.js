import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import OutsideNavigator from './navigation/OutsideNavigator';
// import { store, persistor } from './store/store';

enableScreens();

const App = () => (
    <>
        {/* <Provider store={store}> */}
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <PaperProvider>
                {/* <PersistGate loading={null} persistor={persistor}> */}
                <OutsideNavigator styles={{ flex: 1 }} />
                {/* </PersistGate> */}
            </PaperProvider>
        </ApplicationProvider>
        {/* </Provider> */}
    </>
);

export default App;
