import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import Survey from '../screens/Survey';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Catitude',
        },
    },
    Survey: {
        screen: Survey,
        navigationOptions: {
            title: 'Catitude Survey',
        }
    }    
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#eee', height: 60}
    }
});

export default HomeStack;