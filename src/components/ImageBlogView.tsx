
import { Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView, View, Text} from "react-native";
import React, { useEffect, useState } from 'react';
import { BlogModel } from "../Model/BlogModel";
import { Http, QueryParams } from "../_service/NetworkManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "react-router-native";
import { ButtonText } from './../Model/LinkButton'


export const ImageViewBlog = (props: { blog: BlogModel, isFull: boolean }): JSX.Element => {

  const [ image, seImage ] = useState<string> ( props.blog.image );
  const [ images, setImages ] = useState<[string]> ( );

  useEffect ( () => {

    AsyncStorage.getItem( 'accessToken' ).then ( (val) => {

        if (val != null) {
            const http = new Http(val);
            let pageQuery: QueryParams = {};
            pageQuery["blogid"] = props.blog.id;
            http.get<[string]>( 
                'api/blogs/images/list',
                pageQuery
                ).then ( (values) => {
                    setImages(values)
            })      
        }

    })

  }, [ image ]);

  const changeImage = () => {
    if ( images != undefined ) {
        let current = images.indexOf( image )
        current += 1
        if ( current >= images.length ) {
            current = 0
        } 
        seImage(images[current])
    }
  };

  const ImagePreview = (item: string, key: number) => {
    return (
      <View key={key}>
        <TouchableOpacity onPress={() => seImage(item)}>
          <Image style={styles.previewImage} source={{ uri: item }} />
        </TouchableOpacity>
      </View>
    );
  };
   
  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => changeImage()}>
          <Image style={styles.image} source={{ uri: image }} />
        </TouchableOpacity>
      
          <Link
            style={styles.location}
            to={`/location/${props.blog.place.id}`}
            component={ TouchableOpacity }
          >
              <Text>{ props.blog.place.title + ', ' + props.blog.place.country.title}</Text>
          </Link>
       
      </View>
      {props.isFull ? (
        <ScrollView horizontal={true}>{images?.map(ImagePreview)}</ScrollView>
      ) : null}
    </View>
  );
    
};

 const styles = StyleSheet.create({
    image: {
       width: Dimensions.get("screen").width,
       height: Dimensions.get("screen").width
    },
    previewImage: {
        width: Dimensions.get("screen").width / 4,
        height: Dimensions.get("screen").width / 4,
    },
    location: {
        position:'absolute',
        zIndex: 999,
        padding: 5,
        top: 0,
        color: 'black',
        backgroundColor: 'white',
        opacity: 0.7
    }
  });