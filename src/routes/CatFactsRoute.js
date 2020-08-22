

import React from "react";
import {Router, Scene} from "react-native-router-flux";

import CatFacts   from "../screens/CatFacts";
import CatFactDetail from '../screens/CatFactDetail';

// Things you might not know about Cats
const CatFactsRoute = () => {  
  return (
    <Router>
      <Scene key="root">
        <Scene key ="CatFacts" component={CatFacts} title="" hideNavBar="true"></Scene>
        <Scene key ="CatFactDetail" component={CatFactDetail} title="Catitude Details"></Scene>
      </Scene>
    </Router>
  );
}

export default CatFactsRoute;