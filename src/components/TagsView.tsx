import { Dimensions, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {Picker} from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Http, QueryParams } from "../_service/NetworkManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Page } from "../Model/Pagination";
import { EmotionModel } from "../Model/EmotionModel";
import { default as K } from '../Model/Constants';
import { Link } from "react-router-native";
import { NavigationContainer } from '@react-navigation/native';
import { ButtonText } from './../Model/LinkButton'



export const TagsView = (props: { tags?: [string] }): JSX.Element => { 
      
    return (
      <ScrollView 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.basement}>
        { props.tags?.map((val, index) => {
          return (
            <Link
              key={index}
              to={`/tag/${val}`}
              component={ TouchableOpacity }
            >
            <Text> { '#' + val + ' ' }</Text>
            </Link>
          );
        })}
      </ScrollView>
    );
}

const styles = StyleSheet.create({

      basement: {
        width: Dimensions.get("screen").width - 75,
        flexDirection: "row",
        height: 30,
        padding:5,
        fontSize: 10
      },
      tag: {
          fontWeight:'100',
          padding:5,
          fontSize: 10,
          height: 30
      }

  });