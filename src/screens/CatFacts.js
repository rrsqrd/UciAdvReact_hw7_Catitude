import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FlatList, StyleSheet } from 'react-native';
import {Actions}  from 'react-native-router-flux';
import {ListItem} from 'react-native-elements';


const requestOptions = { method: "GET"}
const numCatFactsToRetrieve = "25";
const herokuRandomCatFactsUrl = "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=" + 
                                 numCatFactsToRetrieve;


//=========================
// CAT FACTS SEARCH
//------------------------
// -returns an array of random cat facts.
// -The only piece of data used in this applicaiton is the content from the text field.
// -This application makes another request to a different url to get a random cat image.
//  So the text for 'cat fact' and the cat image have nothing to do with each other.
// 
//  results: [{
//      "used": false, "source": "api",  "type": "cat",  "deleted": false,  "_id": "591f98783b90f7150a19c1c4",
//      "__v": 0,      
//      "text": "According to a Gallup poll, most American pet owners obtain their cats by adopting strays.",
//      "updatedAt": "2020-06-30T20:20:33.478Z",  "createdAt": "2018-01-04T01:10:54.673Z", 
//      "status": {  "verified": true,  "sentCount": 1  },
//      "user": "5a9ac18c7478810ea6c06381",
//      "id": 1
//  },
//  {
//      "used": true,  "source": "user", "type": "cat", "deleted": false,  "_id": "5b4912c60508220014ccfe99",
//      "updatedAt": "2020-07-23T20:20:05.005Z",   "createdAt": "2018-07-20T20:20:03.770Z",
//      "user": "5a9ac18c7478810ea6c06381",
//      "text": "Cats aren’t the only animals that purr — squirrels, lemurs, elephants, and even gorillas purr too.",
//      "__v": 0,
//      "status": {    "verified": true,  "sentCount": 1  },
//      "id": 2
//  }]
// 
//=========================
export default function CatFacts() {
    let keyId=0;
    const [catFacts, setCatFacts] = useState({catFacts: []});

    useEffect(() => {
        //console.info("\n------RETRIEVING CAT FACTS via useEffect")
        fetchCatFacts();
    }, []);


    //---------------------------
    // The orginal results from heroku do not contain a valid id
    // so one is added.
    //---------------------------
    function addIdToCatFactsArray(facts) {
        for (var i=0; i<facts.length; i++) {
            facts[i].id=i+1;
        }
    }

    const fetchCatFacts = async () => {
        try{
            const results = await axios.get(herokuRandomCatFactsUrl, requestOptions);

            addIdToCatFactsArray(results.data);     // add an id
            setCatFacts({catFacts: results.data});  // store the catFacts retrieved

            console.info("\n\n------CatFacts: fetchCatFacts results:" + 
                    JSON.stringify(results.data))
        } catch(error) {
            console.info("\n------CatFats: fetchCatFacts ERROR: " + error  + "\n");
            setCatFacts({catFacts: error})
        } 
    }

    //==========================
    // Render the list of catFacts
    // -subtitle is essentially the 'body' minus the image
    // -onPress routes to Action.CatFactDetail with 2 properties, title and text.
    //  CatFactDetails receives these in it's props.
    //==========================    
    return (
        <FlatList            
            style={{marginLeft: 20, marginTop: 5, color: "puples"}}
            data={catFacts.catFacts}
            renderItem={catFact => 
                <ListItem                
                  onPress={()=>{
                      Actions.CatFactDetail(
                          {title: 'Cat Fact #' + catFact.item.id, 
                           text: catFact.item.text })
                  }}
                  titleStyle={[styles.item]}
                  title={'Cat Fact #' + catFact.item.id}
                  subtitle={catFact.item.text}
                  subtitleStyle={{padding: 10, color: "blue", fontSize: 14}}
                  bottomDivider
                  chevron
                />
                }
            keyExtractor={(item, i) => i.toString()}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00FF00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        color:  "#9932CC",
        padding: 5,
        marginLeft: 10,
        fontSize: 20    
    },
    text: {
        fontSize: 32
    }
});

