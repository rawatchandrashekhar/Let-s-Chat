/**
 * @format
 */

import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const MainContainer = () => {
    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#E01226"
                barStyle={'default'}
            />
            <App />
        </>
    )
}

AppRegistry.registerComponent(appName, () => MainContainer);
