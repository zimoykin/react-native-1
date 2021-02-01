import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Http, QueryParams } from "../_service/NetworkManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Page } from "../Model/Pagination";
import { BlogView } from "./BlogView";

export const TagView = (props: { tag: string }): JSX.Element => {
  const [tag, setTag] = useState<string>(props.tag);
  const [page, setPage] = useState(1);
  const [blogs, setblogs] = useState<[String]>();

  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((val) => {
      if (val != null) {
        let pageQuery: QueryParams = {};
        pageQuery["tag"] = props.tag;

        const http = new Http(val);
        http
          .get<Page<string>>("api/search/tag", pageQuery)
          .then((value) => {
            setblogs(value.items);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [tag]);

  return (
    <View>
      <FlatList<any>
        data={blogs != undefined ? blogs : null}
        scrollEnabled
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }: { item: string }): JSX.Element => (
          <BlogView id={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("screen").width / 15,
    height: Dimensions.get("screen").width / 15,
  },
  dropdown: {
    position: "absolute",
    shadowColor: "gray",
    shadowOffset: { width: 5, height: 5 },
    zIndex: 10,
    backgroundColor: "#fff",
  },
});
