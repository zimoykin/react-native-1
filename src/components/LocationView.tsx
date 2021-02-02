import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LoaderView } from "./LoaderView";
import { PlaceFull } from "../Model/Place+Country";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Http, QueryParams } from "../_service/NetworkManager";
import { ImageViewBlog } from "./ImageBlogView";
import { BlogModel } from "../Model/BlogModel";
import { BlogView } from "./BlogView";
import { BlogViewShortLine } from "./BlogViewShortLine";

export const LocationView = (props: { id: string }): JSX.Element => {
  const [place, setPlace] = useState<PlaceFull>();
  const [image, setImage] = useState<string>();
  const placeId = props.id;

  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((val) => {
      if (val != undefined) {
        const http = new Http(val);
        let pageQuery: QueryParams = {};
        pageQuery["placeid"] = placeId;

        http.get<PlaceFull>("api/places/full", pageQuery).then((value) => {
          setPlace(value);
          setImage(value.blogs[Random(value.blogs.length - 1)].image);
        });
      }
    });
  }, [placeId]);

  const Random = (val: number): number => {
    return Math.floor(Math.random() * (val - 0 + 1) + 0);
  };

  return (
    <View>
      {place != undefined ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              setImage(place.blogs[Random(place.blogs.length - 1)].image);
              console.log(image);
            }}
          >
            {place.blogs.length > 0 ? (
              <Image
                style={styles.image}
                source={{
                  uri: image,
                }}
              />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.main}>
            {place.title + ", " + place.country.title}
          </Text>

          {true ? (
            <FlatList<BlogModel>
              data={place.blogs}
              scrollEnabled
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={(item: { item: BlogModel }) => {
                return (
                  <View>
                      <BlogViewShortLine blog={item.item}/>
                  </View>
                );
              }}
            />
          ) : null}
        </View>
      ) : (
        <LoaderView />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    zIndex: 999,
    padding: 5,
    top: Dimensions.get("screen").width - 40,
    left: 10,
    color: "white",
    backgroundColor: "black",
    opacity: 0.8,
  },
  image: {
    height: Dimensions.get("screen").width,
    width: Dimensions.get("screen").width,
  }

});
