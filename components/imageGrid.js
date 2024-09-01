// imageGrid.js
import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from './imageCard';
import { wp, hp } from '../helpers/common';
import { getColumnCount } from '../helpers/common';


const ImageGrid = ({ images }) => {

    const columns = getColumnCount();
    return (
        <View styles= {styles.container}>
            <MasonryFlashList
            data={images}
            numColumns={columns}
            initialNumToRender ={1000}
            contentContainerStyle={styles.listContainerStyle}
            renderItem={({ item, index }) => <ImageCard item = {item} columns={columns} index={index}/>}
            estimatedItemSize={200}
            />
        </View>
    );
}

const styles =StyleSheet.create({

    container: {

        minHeight: 3,
        width: wp (100)
    },
    listContainerStyle: {
        paddingHorizontal: wp (4)
    }


})


export default ImageGrid;
