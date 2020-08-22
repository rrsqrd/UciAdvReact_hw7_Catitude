
import React, { useState, useEffect } from "react";
import {ActivityIndicator, StyleSheet} from "react-native";
import {Image, Text} from 'react-native-elements';
import axios from "axios";


//=========================
// CAT IMAGE API SEARCH 
//------------------------
// -returns an array, typically with only 1 record in breeds array
// -***Note that both the retrieval of Facts and cat Images 
//  are random and thus have no relationship to each other.
//
//  [{
//     "breeds": [{
//         "weight": {
//             "imperial": "5 - 10",
//             "metric": "2 - 5"
//         },
//         "id": "orie",
//         "name": "Oriental",
//         "description": "Orientals are passionate about the people in their ...""
//         "wikipedia_url": "https://en.wikipedia.org/wiki/Oriental_Shorthair",
//          ............
//     }],
//     "id": "jVu6K43F7",
//     "url": "https://cdn2.thecatapi.com/images/jVu6K43F7.jpg",
//     "width": 2000,
//     "height": 1423
// }]
//
// Note that sometimes a request does not contain anything useful in the breeds array
//  [{"breeds":[],"id":"a5j",
//      "url":"https://cdn2.thecatapi.com/images/a5j.jpg",
//      "width":420,"height":407
//  }]
//=========================
const catApiImageSearch  = "https://api.thecatapi.com/v1/images/search";
const CAT_API_KEY        = '8c02a113-d1a2-487d-8c44-c9ce860d0dfd';

const defaultImage       = "https://cdn2.thecatapi.com/images/b61.jpg"
const defaultHeight      = 300;
const defaultWidth       = 300;

const requestOptions = { method: "GET"}

//=========================
//
//=========================
const CatFactDetail = (props) => {       
    const [imageData, setImageData] = useState({imageUri: defaultImage, 
                                                imageHeight: defaultHeight , 
                                                defaultWidth: defaultWidth});

    useEffect(() => {
        //console.info("\n------RETRIEVING CAT IMAGE DATA via useEffect")
        retrieveCatImageData();
    }, []);

   
    //-------------------------
    // Should have a 'real mathematical algorithm' not a stab...
    //--------------------------
    function reduceImageDimension(dimension){
        let newDimension = dimension;
        if((newDimension > 500) && (newDimension <= 600)){
            newDimension = newDimension-100;
        }
        else if((newDimension > 600) && (newDimension <= 800)){
            newDimension = newDimension/2;
        }        
        else if((newDimension > 800) && (newDimension <= 1200)){
            newDimension = newDimension/2;
        }
        if((newDimension > 1200) && (newDimension <= 1600)){
            newDimension = (newDimension/2)-200;
        }
        else if((newDimension > 1600) && (newDimension <= 2000)){
            newDimension = (newDimension/3)-100;
        }
        else if((newDimension > 2000) && (newDimension <= 2400)){
            newDimension = (newDimension/4)-100;
        }
        return newDimension;
    }

    //--------------------------
    // Send request to the catapi
    const retrieveCatImageData = async () => {
        try{            
            // works without the key, including it just in case...
            const response = await axios.get(catApiImageSearch, requestOptions,
                                  {headers: {'x-api-key': CAT_API_KEY} });

            console.info("\n------CatFactDetail CatApiImageSearch results: " + 
                          JSON.stringify(response.data))

            // let height = response.data[0].height;
            // let width  = response.data[0].width;

            let height = reduceImageDimension(response.data[0].height);
            let width  = reduceImageDimension(response.data[0].width);

            //-----------------
            // save the state of imageData
            //-----------------
            setImageData({imageUri: response.data[0].url,  
                          imageHeight: height, 
                          imageWidth: width})

            // setImageData({imageUri: response.data[0].url,  
            //               imageHeight: response.data[0].height, 
            //               imageWidth: response.data[0].width})
        } catch(error) {
            setImageData({imageUri: defaultHeight, imageHeight: 
                          defaultHeight , defaultWidth: defaultWidth})
        }        
    }    
    
    //=========================
    // Image Component:
    // if you use a network or data image you need to manually 
    //  specify dimensions of the image  
    //  style={{width: 50, height: 50}}
    //  source={{uri: 'https://facebook.github.io/react-nativ/img/tiny_logo.pns'}}
    //
    //=========================
    return (
        <>
            <Text h5 style={{padding: 20, color: "blue"}}> {props.text}</Text>
            <Text></Text>
            <Image
                style={{marginTop: 10, marginBottom: 15, marginLeft: 12, marginRight: 12,
                        width: imageData.imageWidth, height: imageData.imageHeight}}
                source={{uri: imageData.imageUri}}
                containerStyle={{flex: 1}}
                resizeMode="contain"
                resizeMethod="resize"
                PlaceholderContent={<ActivityIndicator/>}
            />
        </>
    );
}

export default CatFactDetail;