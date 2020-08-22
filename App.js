


import React from "react";

// import {Router, Scene} from "react-native-router-flux";
// import CatFacts   from "./src/screens/CatFacts";
// import CatFactDetail from './src/screens/CatFactDetail';

// // This is the router
// const App = () => {
//   return (
//     <Router>
//       <Scene key="root">
//         <Scene key ="CatFacts" component={CatFacts} title="Catitude Facts"></Scene>
//         <Scene key ="CatFactDetail" component={CatFactDetail} title="Catitude Details"></Scene>
//       </Scene>
//     </Router>
//   );
// }


// This Drawer wrap mulplie screens including one that 
// contains React Router flux Scenes
import DrawerNavigator from './src/routes/Drawer';

const App = () => {
  return(
      <DrawerNavigator />
  )
}

export default App;
