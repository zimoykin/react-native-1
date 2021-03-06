import React, { useState } from "react";

import {
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";

import {
  AndroidBackButton,
  BackButton,
  NativeRouter as Router,
  Route,
} from "react-router-native";


import { NavBar } from "./src/components/navBar";
import { Auth, BlogPage, Contacts, Home, LocationPage, New, TagPage } from "./src/components/Pages";

export default class App extends React.Component {
  
  render() {
    return (
     
        <Router initialEntries={["/auth"]} initialIndex={0}>
            <SafeAreaView style={styles.container}> 
            <NavBar/>          
              <Route exact path="/" component={Home} />
              <Route path="/new" component={New} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/location/:id" component={LocationPage} />
              <Route path="/auth" component={Auth} /> 
              <Route path="/blog/:id" component={BlogPage} /> 
              <Route path="/tag/:tag" component={TagPage} /> 
            </SafeAreaView>

        </Router>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom:  Platform.OS === 'android' ? 25 : 0
  }
});