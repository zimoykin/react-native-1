import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage, ScrollView} from "react-native";
import { Link } from "react-router-native";
import { BlogModel } from "../Model/BlogModel";
import { Http, QueryParams } from "../_service/NetworkManager";
import { LoaderView } from "./LoaderView";



export const BlogViewShortLine = (props: { blog: BlogModel }): JSX.Element => {

    const [images, setImages] = useState<[string]>();
    const blogid = props.blog.id
  
    useEffect(() => {
      AsyncStorage.getItem("accessToken").then((val) => {
        if (val != null) {
          let pageQuery: QueryParams = {};
          pageQuery["blogid"] = props.blog.id;
          const http = new Http(val);
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

  return ( <View>

    {
        images!=undefined
        ?
        <Link
            to={`/blog/${props.blog.id}`}
            component={ TouchableOpacity }
        >
            <ScrollView horizontal={true}>{images?.map( (val) =>
                <Image
                style={ styles.previewImage }
                source={{uri: val }}
                />
            )}</ScrollView>
            <View style={styles.preview}>
                <Text style={styles.title}>{props.blog.title}</Text>
                <Text style={styles.author}>{props.blog.user.username}</Text>
            </View>
        </Link>
        :
        <LoaderView/>
    }


  </View>
  );
};


const styles = StyleSheet.create({

  previewImage: {
    opacity: 0.5,
    height: Dimensions.get("screen").width / 4,
    width: Dimensions.get("screen").width / 4,
  },

  preview: {
    position: "absolute",
    zIndex: 999,
    transform: [
      {
        translateY: 50,
      }
    ]
  },
  title: {
    color: "black",
    backgroundColor: "white",
    fontSize: 12,
    padding: 5,
    fontWeight: "200",
  },

  author: {
    color: "black",
    backgroundColor: "white",
    fontSize: 11,
    padding: 5,
    fontWeight: "200",
  }


});