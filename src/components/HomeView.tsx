import { FlatList, ListViewComponent, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { Http, QueryParams } from "../_service/NetworkManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Page } from "../Model/Pagination";
import { BlogModel } from "../Model/BlogModel";
import { BlogView } from "./BlogView";
import { LoaderView } from "./LoaderView";


export const HomeView = () : JSX.Element => { 

    const [ page, setPage ] = useState(1);
    const [ blogs, setblogs ] = useState<[String]> ()

    useEffect( () => {

         let pageQuery: QueryParams = {};
         pageQuery["page"] = page.toString();
         pageQuery["per"] = '10';

        AsyncStorage.getItem('accessToken').then ( val => {
            if (val != null) {
                const http = new Http(val);
                http.get <Page<string>>( 'api/blogs/list', 
                    pageQuery
                )
                .then ((page) => {
                    setblogs(page.items)
                })
            }
        })
    }, [page])

    const renderItem = ({ item }: { item: string }) => (
        <BlogView id={item} />
    );

    return (

        <View>
            { blogs != undefined 
            ?
            <FlatList<any>
            data = { blogs }
            scrollEnabled

            keyExtractor={(item, index) => {
                return  index.toString();
               }}

            renderItem={ renderItem }
            />
            : 
            <LoaderView/>
            }
        </View>

    );

}