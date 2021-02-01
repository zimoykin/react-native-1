import { default as K } from "../Model/Constants";
import React from "react";
import { UserModel } from "../Model/UserModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode as atob, encode as btoa } from "base-64";

export class Auth {
  accessToken?: string;
  ref?: string;

  login(login: string, password: string): Promise<void> {
    return new Promise((resolve, reason) => {
      let loginpass = login + ":" + password;
      loginpass = btoa(loginpass);

      const authrizationData = `Basic ` + loginpass;

      fetch(`${K.server}api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authrizationData,
        },
      })
        .then((response) => response.json())
        .then((user: UserModel) => {
          this.saveUser(user).then(() => {
            resolve();
          });
        })
        .catch((smth) => {
          reason(smth);
        });
    });
  }

  async saveUser(user: UserModel) {
    AsyncStorage.setItem("user", user.id);
    AsyncStorage.setItem("username", user.username);
    AsyncStorage.setItem("accessToken", user.accessToken);
    AsyncStorage.setItem("refreshToken", user.refreshToken);
  }

  logout(): Promise<void> {
    return new Promise((resolve, reason) => {
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem("accessToken");
      AsyncStorage.removeItem("refreshToken");
      resolve();
    });
  }

  refresh () : Promise<string> {
    return new Promise((resolve, reason) => {
      AsyncStorage.getItem("refreshToken").then((val) => {
        fetch(`${K.server}api/users/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: val }),
        })
          .then((response) => response.json())
          .then((user: UserModel) => {
            this.saveUser(user).then((val) => {
              resolve(user.accessToken);
            });
          })
          .catch((smth) => {
            reason(smth);
          });
      });
    });
  }
}
