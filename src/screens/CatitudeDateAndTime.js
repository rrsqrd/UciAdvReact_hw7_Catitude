
import React, {useState} from 'react';
import {View, Button, Platform, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';

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
    color: "purple"
  },  
  buttonsFixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:  10,
    marginLeft:  10
  }
});


const CatitudeDateAndTime = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'and');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    console.info("date:" + date.toString()) 
  };

  const showTimepicker = () => {
    showMode('time');
  };

  // replace with data from date picker?
  const currDateTime = () => { 
    let d = new Date();      
    let localDate = d.toLocaleDateString();
    let localTime = d.toLocaleTimeString()
    return (localDate + " " + localTime);
  }


  return (
        <View>          
          <Text style={styles.textBody}>
            Yup, this in an unlikely place to set the Date and Time for your mobile device!
            Unfortunately changes you make here won't be reflected on your device through
            this mobile application since access to the hardware is not available to me at this time...
            After all, you wouldn't want me to mess up your device would you? 
          </Text>
          <Text style={styles.textBody}>
            {currDateTime()}
          </Text>

          <View  style={styles.buttonsFixToText}>
            <View>
              <Button onPress={showDatepicker} 
                    title="Set Date" 
                    color="#841584"/>
              <Text></Text>
            </View>
            <View>
              <Button onPress={showTimepicker} 
                      title="Set Time" 
                      color="#841584"/>
              <Text></Text>
            </View>            
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>        
  );
}

export default CatitudeDateAndTime;