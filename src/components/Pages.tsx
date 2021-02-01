import React, { useState } from "react";
import { AsyncStorage, SafeAreaView, Text, StyleSheet, Dimensions, View } from "react-native";
import { match, RouteComponentProps, RouteProps } from "react-router-native";
import { AuthorizationView } from "./AuthorizationView";
import { HomeView } from "./HomeView";
import { BlogViewFull } from './BlogViewFull';
import { TagView } from './TagView'

export const Home = () => {
    
    return (
      <HomeView />
    );
  };
  
  export const LocationPage = () => {
    return (
      <SafeAreaView style={styles.page}>
         <Text> LocationPage </Text>
      </SafeAreaView>
   );
  };
  export const New = () => {
    return (
      <SafeAreaView style={styles.page}>
         <Text> New </Text>
      </SafeAreaView>
   );
  };
  export const Contacts = () => {
    return (
      <SafeAreaView style={styles.page}>
         <Text> Contacts </Text>
      </SafeAreaView>
   );
  };
  
  export const BlogPage = ({ match }: RouteComponentProps<RouteInfo>) => {
    return (
      <BlogViewFull id={match.params.id} />
    );
  };

export const TagPage = ({ match }: RouteComponentProps<RouteInfo>) => {
  return (
    <View >
      <TagView tag={match.params.tag} />
    </View>
  );
};

  export const Auth = () => {
    return <AuthorizationView />;
  };


  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "seagreen",
    },
    page: {
      fontSize: 20,
      backgroundColor:'lemonchiffon',
      height: Dimensions.get("screen").height
    }
  
  });

  interface RouteInfo { 
    id: string;
    tag: string;
  }