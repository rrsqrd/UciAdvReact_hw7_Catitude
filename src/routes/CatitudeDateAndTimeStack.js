import {createStackNavigator} from 'react-navigation-stack';
import CatitudeDateAndTime from '../screens/CatitudeDateAndTime';

const screens = {
    CatitudeDateAndTime: {
        screen: CatitudeDateAndTime,
        navigationOptions: {
            title: 'Date And Time Configuration',
        }        
    }
}

const CatitudeDateAndTimeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#eee', height: 60}
    }
});

export default CatitudeDateAndTimeStack;