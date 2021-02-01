import { Dimensions, Text, View, StyleSheet, Image} from "react-native";
import {Picker} from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Http, QueryParams } from "../_service/NetworkManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Page } from "../Model/Pagination";
import { EmotionModel } from "../Model/EmotionModel";
import { default as K } from '../Model/Constants';



export const EmotionView = (props: { id: string }): JSX.Element => { 

    const [ blogid, setBlogid ] = useState <string> ( props.id )
    const [ emotions, setEmotions ] = useState <[EmotionModel]> ( )
    const [ emotionUser, setEmotionUser ] = useState <string> ( )

    const imageLike = K.imageLike
    const imageDislike = K.imageDislike
    const imageReport = K.imageReport
    const imageNoEmotion = K.imageNoEmotion

    const [ state, setState ] = useState<string> ( 'first' )

    useEffect ( () => {

        AsyncStorage.getItem('accessToken').then ( (val) => {
            if (val!=null) {

                let pageQuery: QueryParams = {};
                pageQuery["blogid"] = props.id;

                const http = new Http( val );
                http.get<[EmotionModel]> ('api/emotions', pageQuery
                ).then ( value => {
                    setEmotions(value)
                }).catch ( (error) => { alert (error)} )
            }
        }) 

    }, [ blogid ] )

    useEffect ( () => { 
        if ( emotions != undefined ) {
            AsyncStorage.getItem('user').then ( (user) => { 

                if ( user != null ) {
    
                    let filtred = emotions.filter ( (val) => {
                        return val.user.id == user
                    })
                    if ( filtred != undefined && filtred.length > 0 ) {
                        setEmotionUser( filtred[0].image )
                    } else {
                        setEmotionUser( K.imageNoEmotion )
                    }
                }
    
            } )
        } else {
            setEmotionUser( K.imageNoEmotion )
        }
    }, [ emotions ] )

    return (

      <View style={styles.emotion}>
        <Image
          style={styles.image}
          source={{
            uri: emotionUser,
          }}
        />
      </View>
    );

 };


 const styles = StyleSheet.create({
    emotion: {
        width: 25,
        height: 25,
        padding: 5
    },
    image: {
        width: 25,
        height: 25,
        padding: 5
      }

  });