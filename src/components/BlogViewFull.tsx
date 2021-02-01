import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  ScrollView,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Http, QueryParams } from "../_service/NetworkManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Page } from "../Model/Pagination";
import { BlogModel } from "../Model/BlogModel";
import { EmotionView } from "./EmotionView";
import { Link } from "react-router-native";
import { TagsView } from "./TagsView";
import { TitleView } from "./TitleView";
import { ImageViewBlog } from "./ImageBlogView";

// import ContextMenu from "react-native-context-menu-view";

export const BlogViewFull = (props: { id: string }): JSX.Element => {

  const [blogid, setBlogid] = useState<string>(props.id);
  const [blog, setBlog] = useState<BlogModel>();
  const [images, setImages] = useState<[string]>();
  
  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((val) => {
      if (val != null) {
        let pageQuery: QueryParams = {};
        pageQuery["blogid"] = props.id;

        const http = new Http(val);
        http
          .get<BlogModel>("api/blogs/id", pageQuery)
          .then((value) => {
            setBlog(value);
          })
          .catch((error) => {
            alert(error);
          });

        http
          .get<[string]>("api/blogs/images/list", pageQuery)
          .then((value) => {
            setImages(value);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [blogid]);

  return (
    <ScrollView>
      <View>
      { blog != undefined ? <TitleView blog={blog}/> : null }
      { blog != undefined ? <ImageViewBlog blog={blog} isFull={true} /> : null }

        <View style={styles.screen}>
          <Text style={styles.description}>{blog?.description}</Text>
        </View>

        <View style={styles.basement}>
          <TagsView tags={blog?.tags} />
          <EmotionView id={blogid} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 50,
  },

  title: {
    flex: 1,
    height: 50,
    fontSize: 18,
    backgroundColor: "gray",
    fontWeight: "100",
    color: "lemonchiffon",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  description: {
    fontSize: 14,
    backgroundColor: "white",
    fontWeight: "200",
    color: "black",
    paddingLeft: 5,
    paddingRight: 5,
  },

  basement: {
    flex: 1,
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    height: 30,
    paddingBottom: 10,
  },
});
