

import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

import WhiteSpaceLineSeparator from '../utils/utilities';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  textBody: {
    textAlign: 'center',
    marginVertical: 8,
    marginRight:  20,
    marginLeft:  12,
    fontWeight: 'bold',
    width: 300,
    color: "purple"
  }
});

const whiteSpaceStyle = {
  marginVertical: 1,  
  width:  80,
  height: 10  
};

const About = () => {
    
  function WhiteSpaceSeparator() {
    return <View style={whiteSpaceStyle} />;
  }

  return(
        <View>
            <WhiteSpaceLineSeparator height={50}/>
            <WhiteSpaceSeparator/>
            <Text style={styles.textBody} >
              Advanced React UCI Spring 2020
            </Text>

            <Text style={styles.textBody}>
              Assignment 7:
            </Text>
            <Text style={styles.textBody}>              
              Design a React Native mobile application that incorporates several screens
              utilizing Routing, Drawer, Stacks, and multiple controls such as text input, buttons, 
              Date picker, labels and images.
            </Text>            
        </View>
    )
}

export default About;