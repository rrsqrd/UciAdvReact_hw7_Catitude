
import React from 'react';
import {View, ActivityIndicator, StyleSheet, Button} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Constants from 'expo-constants';

import WhiteSpaceLineSeparator from '../utils/utilities';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  textBody: {
    textAlign: 'center',
    marginVertical: 8,
    marginRight:  20,
    marginLeft:  20,
    fontWeight: 'bold'
  },  
  buttonsFixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:  10,
    marginLeft:  10
  },
  hairLineSeparator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const whiteSpaceStyle = {
  marginVertical: 1,  
  width:  80,
  height: 10  
};

const Home = ({ navigation }) => {

    const currDateTime = () => { 
      let d = new Date();      
      let localDate = d.toLocaleDateString();
      let localTime = d.toLocaleTimeString()
      return (localDate + " " + localTime);
    }

    function WhiteSpaceSeparator() { 
      return <View style={whiteSpaceStyle} />; }

    const CatImage =() => {
            return (
          <View>
              <Image
                  style={{marginTop: 20, marginLeft: 15, marginRight: 15,
                          width: 150, height: 150}}
                  source={require('../images/notBlockingView.jpg')}
                  containerStyle={{flex: 1}}
                  resizeMode="contain"
                  resizeMethod="resize"
                  PlaceholderContent={<ActivityIndicator/>}
              />
      </View>
    );
  }
    
  return (
        <View style={{alignItems: 'center'}}>
          <WhiteSpaceSeparator />
          <WhiteSpaceLineSeparator height={50}/>
          <Text style={styles.textBody}>
           Welcome to Catitude, spend some time learning and laughing about Cats!!!
          </Text>
          <Text style={styles.textBody}>
            {currDateTime()}
          </Text>
          <WhiteSpaceSeparator style={styles.textBody} />
          <View>
            <WhiteSpaceSeparator style={styles.textBody} />
            <WhiteSpaceSeparator style={styles.textBody} />
            <Button onPress={() => navigation.navigate('Survey')}            
              title="Take the Survey" 
              style={{marginTop: 100, marginLeft: 15, marginRight: 15}}
              color="#841584"/>
          </View>
          <WhiteSpaceLineSeparator height={30}/>
          <CatImage/>          
        </View>
  );
}

export default Home;