import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListViewComponent,
  FlatList,
  SafeAreaView,
  TextInput,
  Button,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Dimensions } from "react-native";
import { Route, Router } from "react-router-native";

import { Auth } from "../_service/Auth";

export const AuthorizationView = (): JSX.Element => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");

  AsyncStorage.getItem("accessToken").then((val) => {
    if (val != null) {
      setAccessToken(val);
    }
  });

  AsyncStorage.getItem("username").then((val) => {
    if (val != null) {
      setLogin(val);
    }
  });

  return (
    <SafeAreaView
      style={{
        width: getWindowSize()[0],
        height: getWindowSize()[1],
        top: 20,
      }}
    >
      <Image
        style={{
          width: getWindowSize()[0],
          height: getWindowSize()[0],
          borderRadius: getWindowSize()[0] / 2,
        }}

        source={{
          uri:
            "https://images.freeimages.com/images/large-previews/c64/my-beloved-mountains-2-1375135.jpg",
        }}
      />

      <View
        style={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={0}>
          <ScrollView>
            {accessToken == "" ? (
              <View>
                <TextInput
                  style={{
                    backgroundColor: "lemonchiffon",
                    width: getWindowSize()[0] * 0.75,
                    padding: 5,
                    margin: 5,
                    fontWeight: "400",
                    fontSize: 16,
                    borderRadius: 7,
                    textAlign: "center",
                    color: "seagreen",
                  }}
                  secureTextEntry={false}
                  placeholder="login"
                  onChangeText={(text) => setLogin(text)}
                  value={login}
                />
                <TextInput
                  style={{
                    backgroundColor: "lemonchiffon",
                    width: getWindowSize()[0] * 0.75,
                    padding: 5,
                    margin: 5,
                    fontWeight: "400",
                    fontSize: 16,
                    textAlign: "center",
                    borderRadius: 5,
                    color: "seagreen",
                  }}
                  secureTextEntry={true}
                  placeholder="password"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                />
                <Button
                  color="green"
                  title="signup"
                  onPress={() => authorize()}
                />
              </View>
            ) : (
              <View>
                <Text
                style={styles.name}
                >You are logged as {login}</Text>
                <Button color="red" title="logout?!" onPress={() => logout()} />
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );

  function getWindowSize(): [number, number] {
    return [Dimensions.get("screen").width, Dimensions.get("screen").height];
  }

  function authorize() {
    if (login != "" && password != "") {
      const auth = new Auth();
      auth
        .login(login, password)
        .then(() => {
          AsyncStorage.getItem("accessToken").then((val) => {
            if (val != null) {
              setAccessToken(val);
            }
          });
        })
        .catch((val) => {
          alert("catch: " + val);
        });
    }
  }

  function logout() {
    const auth = new Auth();
    auth.logout().then(() => {
      setLogin("");
      setAccessToken("");
      setPassword("");
    });
  }
};





const styles = StyleSheet.create({
  name: {
    width: Dimensions.get("screen").width * 0.75,
    textAlign: "center",
    backgroundColor: "lemonchiffon",
    padding: 5,
    margin: 5,
    fontWeight: "400",
    fontSize: 16,
    borderRadius: 5,
    color: "seagreen",
  },
});