import { View, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'expo-image'; // Ensure this import is correct for your use case
import { getImageSize } from '../helpers/common'; // Use the correct function from your helpers
import { theme } from '../constants/theme';
import { wp } from '../helpers/common';

const ImageCard = ({ item, index, column }) => {

    const isLastInRow = () => {
        return (index + 1) % column === 0;
    }

    const { imageHeight: height, imageWidth: width } = item;
    const imageSize = getImageSize(height, width); // Get the height based on dimensions

    return (
        <View style={[styles.container, !isLastInRow() && styles.spacing]}>
            <Pressable style={styles.imageWrapper}>
                <Image
                    style={[styles.image, { height: imageSize }]} // Apply dynamic height here
                    source={{ uri: item?.webformatURL }} // Ensure correct property name and usage
                    transition={100} // Verify this prop in the expo-image documentation
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: wp(2), // Margin bottom for spacing between rows
    },
    image: {
        width: '100%',
    },
    imageWrapper: {
        backgroundColor: theme.colors.grayBG,
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
    },
    spacing: {
        marginHorizontal: wp(1), // Apply equal margin horizontally
    }
});

export default ImageCard;
