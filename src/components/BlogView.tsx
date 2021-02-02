import { Dimensions, Text, View, StyleSheet, Image, TouchableOpacity, TouchableOpacityProps} from "react-native";
import React, { useEffect, useState } from 'react';
import { Http, QueryParams } from "../_service/NetworkManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Page } from "../Model/Pagination";
import { BlogModel } from "../Model/BlogModel";
import { EmotionView } from './EmotionView'
import { Link } from "react-router-native";
import { TagsView } from "./TagsView";
import { TitleView } from "./TitleView";
import { ImageViewBlog } from "./ImageBlogView";
import { LoaderView } from "./LoaderView";


export const BlogView = (props: { id: string }) => {  

    const [ blogid, setBlogid ] = useState <string> ( props.id )
    const [ blog, setBlog ] = useState <BlogModel> (  )

    useEffect ( () => {

        AsyncStorage.getItem('accessToken').then ( (val) => {
            if (val!=null) {

                let pageQuery: QueryParams = {};
                pageQuery["blogid"] = props.id;

                const http = new Http( val );
                http.get<BlogModel> ('api/blogs/id', pageQuery
                ).then ( value => {
                    setBlog(value)
                }).catch ( (error) => { alert (error)} )
            }
        }) 

    }, [blogid] )

    return (
        
        <View>
            { blog != undefined ? <TitleView blog={blog}/> : <LoaderView/> }
            { blog != undefined ? <ImageViewBlog blog={blog} isFull={false} /> : <LoaderView/> }

             <Text style={styles.description}>
                {blog?.description.substring(0, 550) + '...'}
            </Text>

            <View style={styles.basement}>
              <TagsView tags={blog?.tags}/>
              <EmotionView id={blogid}/>
            </View>
        </View>
    );
      
}



const styles = StyleSheet.create({

      image: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").width
      },
      description: {
        flex: 1,
        height: 150,
        fontSize: 12,
        backgroundColor: 'white',
        fontWeight: '100',
        color:'black',
        justifyContent: 'center',
        textAlignVertical: "center",
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5

      },

      basement: {
        flex: 1, 
        width: Dimensions.get("screen").width,
        flexDirection: "row",
        height: 50,
        padding:5
      }
  });