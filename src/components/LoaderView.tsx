import { Dimensions, Text, View, StyleSheet, ActivityIndicator} from "react-native";
import React from 'react';

export const LoaderView = () : JSX.Element => {

  return (
      
    <View style={styles.main}>
        <ActivityIndicator />
    </View>
  );
};;

 const styles = StyleSheet.create({

      main: {
          flex:1,
          flexDirection: "row",
          height: Dimensions.get("screen").width,
          padding: 5,
          fontSize: 15,
          backgroundColor: 'white',
          justifyContent: 'center',
          textAlign: "center",
          textAlignVertical: 'center'
      }

  });