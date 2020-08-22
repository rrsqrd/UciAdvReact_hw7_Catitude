

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import HomeStack            from './HomeStack';
import CatFactsStack        from './CatFactsStack';
import AboutStack           from './AboutStack';
import CatitudeDateAndTimeStack     from './CatitudeDateAndTimeStack';


const RootDrawerNavigation = createDrawerNavigator({
    Home: {
        screen: HomeStack
    },
    CatFacts: {
        screen: CatFactsStack
    },
    About: {
        screen: AboutStack
    },    
    'Date Time Configuration': {
        screen: CatitudeDateAndTimeStack
    }
});

const DrawerNavigator = createAppContainer(RootDrawerNavigation);

export default DrawerNavigator;