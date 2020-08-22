
import React, {useState, useEffect} from 'react';
import Constants from 'expo-constants';
import {Picker, Text, TextInput, StyleSheet, View, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
          
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
  }
});


//==========================
//
//==========================
const Survey = () => {
    // SurveyData is a single object with 3 key/value pairs
    const [surveyData, setSurveyData] = useState({favoriteName: '', buyOrAdopt: "1", likeDogs: "1"});
    
    useEffect(() => {
       // action on update of state
      getSurveyDataFromStorage();
    }, []);

    //============================
    // Get survey data from AsyncStorage and update hook state
    //============================
    const getSurveyDataFromStorage = async () => {
        await AsyncStorage.getItem('CatitudeSurvey8')
          .then(jsonResult => {
              if(jsonResult != null) {
                const tmpSurveyData =  JSON.parse(jsonResult);

                console.info("\n-----------\ngetSurveyDataFromStorage: AsyncStorge.getItem JSON.parse result: \n{"+ 
                  tmpSurveyData.favoriteName + ", " + tmpSurveyData.buyOrAdopt + ", " + tmpSurveyData.likeDogs + "}");

                // console.info("getSurveyDataFromStorage: JSON.stringify result: \n" + 
                //       JSON.stringify(jsonResult));

                // save all fields at the same time to ensure object has 3 key/value pairs
                setSurveyData({favoriteName: tmpSurveyData.favoriteName, 
                                buyOrAdopt: tmpSurveyData.buyOrAdopt,
                                likeDogs: tmpSurveyData.likeDogs});
            }
            else {
              console.log("\n-----\ngetSurveyDataFromStorage: no data in AsyncStorage, may not exist yet...");
              setSurveyData({favoriteName: ""}, {buyOrAdopt: "1"}, {likeDogs: "1"});
            }
          })
          .catch((error) => {
            //this is even worse, Promise was rejected
            console.log("\n-----------\ngetSurveyDataFromStorage Promise is rejected with error: " + error);
          }); 
    }


    //============================    
    // Save to AsyncStorage
    //============================
    const persistSurveyToAsyncStorage = async () => {
        try {
          
            console.info("\n-----------\persistSurveyToAsyncStorage() stateData b4 call to AsyncStorage"); 
            console.info(surveyData);

            //----------  
            // -Save react state: ensure object with 3 key/value pairs is intact 
            //  Otherwise all other values are lost as was the case with my initial submission.
            // Form does not require all fields to be filled in
            //  enforcing valid value/check for "undefined"
            //----------
            setSurveyData({
              favoriteName: (typeof surveyData.favoriteName != "undefined") ? surveyData.favoriteName : "", 
              buyOrAdopt:   (typeof surveyData.buyOrAdopt != "undefined") ? surveyData.buyOrAdopt : "1",
              likeDogs:     (typeof surveyData.likeDogs != "undefined")  ?  surveyData.likeDogs : "1"
            });

            //----------
            // Save state to AsyncStorage
            //----------            
            const jsonResult = await AsyncStorage.setItem('CatitudeSurvey8',  JSON.stringify(surveyData));

            console.info("\persistSurveyToAsyncStorage() stateData AFTR call to AsyncStorage.setItem"); 
            console.info(surveyData);
            alert("Survey Data saved!")

        } 
        catch (err) {
          console.log("persistSurveyToAsyncStorage failed with error: " + err);
        }    
    };

    //============================
    // Remove item from AsyncStorage
    //============================
    const clearSurveyData = async () => {
      try {

        // console.info("\n-------------\nsurveyData B4 Clearing: \n" + 
        const clonedObj = {... surveyData};
        console.info(clonedObj);
        // console.info(
        //       "{clonedObj.favoriteName: " + clonedObj.favoriteName + ", " +
        //         "clonedObj.buyOrAdopt: " + clonedObj.buyOrAdopt + ", " +
        //         "clonedObj.likeDogs: " +   clonedObj.likeDogs + "}");

          await AsyncStorage.removeItem('CatitudeSurvey8')
          .then(() => {
              //alert('Catitude Survey data was cleared');
              console.info('AsyncStorage CatitudeX Survey data was cleared');
                           
              // Th bad object resulted in "hooks don't support the second callback" error
              //setSurveyData({favoriteName: ""}, {buyOrAdopt: "1"}, {likeDogs: "1"});

              setSurveyData({favoriteName: "", buyOrAdopt: "1", likeDogs: "1"});
              alert("Survey Data cleared!")
          });
      } catch (err) {
        console.log(err);
      }      
    }

    const getAllAsyncStorageKeys = async () => {
          console.info("\n------ Retreiving ALL AsyncStorage keys\n");
          AsyncStorage.getAllKeys((err, keys) => {
            console.info("err1=" + err);
          AsyncStorage.multiGet(keys, (err, stores) => {
            console.info("err2=" + err);
            stores.map((result, i, store) => {
              // get at each store's key/value so you can work with it
              let key = store[i][0];
              let value = store[i][1];

              console.info("key=" + key);
              console.info("value=" + value);
            });
          });
        });
    }

    const removeAsyncStorageKeys = async () => {
      console.info("\n------ Removing AsyncStorage keys\n");
      // let keys = ['CatitudeSurvey2', 'CatitudeSurvey3', 'CatitudeSurvey4', 
      //             'CatitudeSurvey5', 'CatitudeSurvey6', 'CatitudeSurvey7'];
      let keys = ['CatitudeSurvey2', 'CatitudeSurvey3', 'CatitudeSurvey4'];
      
      await AsyncStorage.multiRemove(keys, (err) => {
        console.info("removeKey: err:"  + err)
        // keys removed, if they existed
        // do most stuff after removal (if you want)
      });
    }

    function handleTextFieldChange(value) {
        setSurveyData({
        favoriteName: value, 
        buyOrAdopt:   (typeof surveyData.buyOrAdopt != "undefined") ? surveyData.buyOrAdopt : "1",
        likeDogs:     (typeof surveyData.likeDogs != "undefined")  ?  surveyData.likeDogs : "1"                    
      })
    }
       
    function handlePickerChange(pickerID, selectedValue) {
        let favoriteNameValue  = "";
        let buyOrAdoptValue = "1";
        let likeDogsValue   = "1";

        if(pickerID == "buyOrAdopt") {
          buyOrAdoptValue   = selectedValue;
          favoriteNameValue = (typeof surveyData.favoriteName != "undefined") ? surveyData.favoriteName : "";
          likeDogsValue     = (typeof surveyData.likeDogs != "undefined")  ?  surveyData.likeDogs : "1";
        }
        else if(pickerID == "likeDogs"){
          likeDogsValue     = selectedValue
          favoriteNameValue = (typeof surveyData.favoriteName != "undefined") ? surveyData.favoriteName : "";
          buyOrAdoptValue   = (typeof surveyData.buyOrAdopt != "undefined")  ?  surveyData.buyOrAdopt : "1";        
        }
        
        setSurveyData({
          favoriteName: favoriteNameValue, 
          buyOrAdopt:   buyOrAdoptValue,
          likeDogs:     likeDogsValue
        });      
    }

    //getAllAsyncStorageKeys();
    // removeAsyncStorageKeys();
    // getAllAsyncStorageKeys();

    //============================
    // Render the survey form
    //============================
    return (
        <View style={{alignItems: 'center'}}>
            <WhiteSpaceLineSeparator height={50}/>
            <Text style={styles.textBody}>
                A survey about and Cats, Dogs and YOU!
            </Text>

            <View>
            <WhiteSpaceLineSeparator height={10}/>            
              <View>
                <Text>
                  What is your favorite name for a cat?
                </Text>
                <TextInput
                  style={{ height: 30, width: 300, borderColor: 'blue', borderWidth: 1 }}
                  default=""
                  placeholder="Favorite Cat Name"
                  value={surveyData.favoriteName}
                  //onChangeText={(value) => setSurveyData({favoriteName: value})}
                  onChangeText={(value) => handleTextFieldChange(value)}                  

                  returnKeyType="done"
                />
                <WhiteSpaceLineSeparator height={10}/>
                <Text>
                  How will you obtain your new cat?
                </Text>
                <Picker                  
                  style={{height: 30, width: 300, borderColor: 'blue', borderWidth: 1}}
                  selectedValue={surveyData.buyOrAdopt}
                  //onValueChange={(itemValue, itemPosition) => setSurveyData({buyOrAdopt: itemValue})}
                  onValueChange={(selectedValue) => handlePickerChange("buyOrAdopt", selectedValue)}
                  >
                  <Picker.Item label="(none)"                       value="1" />
                  <Picker.Item label="Adopt from Local SPCA"        value="2" />
                  <Picker.Item label="Buy at a store"               value="3" />
                  <Picker.Item label="Adopt from No kill shelter"   value="3" />
                  <Picker.Item label="Get one from my neighborhood" value="4" />
                </Picker>
                <WhiteSpaceLineSeparator height={10}/>
                <Text>
                  How do you feel about dogs?
                </Text>
                <Picker
                  style={{height: 30, width: 300, borderColor: 'blue', borderWidth: 1}}
                  selectedValue={surveyData.likeDogs}
                  //onValueChange={(selectedValue) => setSurveyData({likeDogs: selectedValue})}
                  onValueChange={(selectedValue) => handlePickerChange("likeDogs", selectedValue)}
                  >
                  <Picker.Item label="(none)"                   value="1" />
                  <Picker.Item label="I like dogs"              value="2" />
                  <Picker.Item label="I don't like dogs"        value="3" />
                  <Picker.Item label="I love dogs!"             value="4" />
                  <Picker.Item label="I like very small dogs"   value="5" />
                </Picker>
              </View>
            </View>
          <WhiteSpaceLineSeparator height={50}/>
          
          <View>
            <Button onPress={persistSurveyToAsyncStorage}
            title="Save Survey" 
            style={{marginLeft: 15, marginRight: 15}}
            color="#841584"/>
          </View>
          <WhiteSpaceLineSeparator height={40}/>
          <View>
            <Button onPress={clearSurveyData}
            title="Clear Survey Data" 
            style={{marginLeft: 15, marginRight: 15}}
            color="#841584"/>
          </View>          
        </View>
    );
}

export default Survey;