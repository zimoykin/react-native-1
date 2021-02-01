import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Link } from "react-router-native";
import { ButtonText as Button } from "./../Model/LinkButton";

export const NavBar = () => {
  const SideBarContent = () => {
    return (
      <View style={styles.nav}>
        <Link
          to="/"
          text="HOME"
          component={TouchableOpacity}
          activeOpacity={0.8}
          style={styles.navItem}
        >
          <Text> HOME </Text>
        </Link>
        <Link
          to="/location"
          style={styles.navItem}
          component={TouchableOpacity}
          activeOpacity={0.8}
          text="Location"
        >
          <Text> LOCATION </Text>
        </Link>
        <Link
          to="/new"
          style={styles.navItem}
          component={TouchableOpacity}
          activeOpacity={0.8}
          text="New"
        >
          <Text> NEW </Text>
        </Link>

        <Link
          to="/auth"
          style={styles.navItem}
          component={TouchableOpacity}
          activeOpacity={0.8}
        >
          <Text> AUTH </Text>
        </Link>
      </View>
    );
  };

  return (
    <View>
      <SideBarContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "gray",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lemonchiffon",
    opacity: 0.5,
    padding: 10,
    justifyContent: "center",
  },
});
