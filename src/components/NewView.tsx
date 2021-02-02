import { Dimensions, Text, View, StyleSheet, TextInput, TouchableOpacity, TouchableOpacityProps} from "react-native";
import React from 'react';


export const NewView = () : JSX.Element => {

  return (
    <View>
        <TextInput style={styles.title} placeholder='title'/>
        <TextInput style={styles.description} 
         multiline={true}
         placeholder='description'/>
        <TextInput style={styles.title} placeholder='tags'/>
    </View>

  );
};;

 const styles = StyleSheet.create({

    title: {
        backgroundColor: 'white',
        top: 5,
        margin:10,
        padding:10,
        borderWidth:0.3,
        borderRadius:5,
        borderTopColor: 'lightgray'
    },
    description: {
        backgroundColor: 'white',
        top: 5,
        margin:10,
        height: 200,
        padding:10,
        borderWidth:0.3,
        borderRadius:5,
        borderTopColor: 'lightgray'
    },

  });