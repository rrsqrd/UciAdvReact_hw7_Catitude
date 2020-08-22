import {createStackNavigator} from 'react-navigation-stack';

//import Home from '../screens/Home';
import CatFactsRoute from './CatFactsRoute';

// This title is in the Nav bar of the top level scene
const screens = {
    CatFacts:{
         screen: CatFactsRoute,
         navigationOptions: {
             title: 'Cat Facts',
         }
    }
}

const CatFactsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: {backgroundColor: '#eee', height: 60}
    }
});

export default CatFactsStack;