import { Dimensions, Text, View, StyleSheet, Image, TouchableOpacity, TouchableOpacityProps} from "react-native";
import React from 'react';
import { BlogModel } from "../Model/BlogModel";
import { Link } from "react-router-native";
import { ButtonText } from './../Model/LinkButton'


export const TitleView = (props: { blog: BlogModel }): JSX.Element => {

  return (
    <View style={styles.main}>
      <Image
        style={styles.image}
        //todo add avatar no photo
        source={{ uri: props.blog.user.image }}
      />

    <View style={styles.leftPart}>
    <Link
        to={`/blog/${props.blog.id}`}
        component={ButtonText}
        text={props.blog.title}
      />
      
      <Text style={styles.subTitle} >
        { props.blog.user.username}        
      </Text>
    </View>

    </View>
  );
};;

 const styles = StyleSheet.create({

      image: {
        width: Dimensions.get("screen").width / 12,
        height: Dimensions.get("screen").width / 12,
        backgroundColor: 'white',
  
        borderColor: "red",
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: (Dimensions.get("screen").width / 12) / 2
      },
      main: {
          flex:1,
          flexDirection: "row",
          height: (Dimensions.get("screen").width / 12)+ 10,
          padding:5,
          fontSize: 15,
          backgroundColor: 'white'
      },
      title: {
        
        //height: (Dimensions.get("screen").width / 12),
        fontSize: 14,
        fontWeight: '200',
        color:'black',
 
       // paddingTop: Platform.OS == 'ios' ? 10 : 0,
        backgroundColor: 'white',
        paddingLeft: 5
      },

      subTitle: {
        fontSize: 10,
        fontWeight: '200',
        paddingLeft: 5
      }, 
      leftPart: {
          flex: 1
      }

  });