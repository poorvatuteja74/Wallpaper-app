import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { wp, hp } from '../../helpers/common';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather, Ionicons } from '@expo/vector-icons';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import {debounce} from 'lodash'
var page= 1;

const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const [search, setSearch] = useState('');
    const [images, setImages] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const searchInputRef = useRef(null);

    useEffect(() =>{
        fetchImages();
    },[]);

    const fetchImages = async (params={page: 1}, append=false)=>{
        console.log('params:', params, append);
        let res =await apiCall(params);
        if(res.success && res?.data?.hits){
            if (append)
                setImages([...images, ...res.data.hits])
            else 
                setImages([...res.data.hits])
        }
    }

    const handleChangeCategory = (cat) => {
        setActiveCategory(cat);
    };

    const handleSerch = (text)=>{
        setSearch(text);
        if (text.length>2){
            page=1;
            setImages([]);
            fetchImages({page, q:text});
        }

        if(text==""){

            page=1;
            setImages([]);
            fetchImages({page});
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSerch, 400, []))

    const clearSearch = () => {
        setSearch('');
        searchInputRef.current.clear(); // Clear the input field
    };

    return (
        <View style={[styles.container, { paddingTop }]}>
            <View style={styles.header}>
                <Pressable>
                    <Text style={styles.title}>Pixel</Text>
                </Pressable>
                <Pressable>
                    <FontAwesome name="bars" size={20} color={theme.colors.neutral(0.7)} />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={{ gap: 15 }}>
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
                    </View>
                    <TextInput
                        placeholder='Search for photos'
                        // value={search}
                        ref={searchInputRef}
                        onChangeText={handleTextDebounce}
                        style={styles.searchInput}
                    />
                    {search && (
                        <Pressable style={styles.closeIcon} >
                            <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
                        </Pressable>
                    )}
                </View>

                <View style={styles.categories}>
                    <Categories 
                        activeCategory={activeCategory} 
                        handleChangeCategory={handleChangeCategory} 
                    />
                </View>

                <View>
                    {images.length > 0 && <ImageGrid images={images} />}
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
    },
    header: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9),
    },
    searchBar: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        backgroundColor: theme.colors.white,
        padding: 6,
        borderRadius: theme.radius.lg,
        paddingLeft: 10,
    },
    searchIcon: {
        padding: 10,
    },
    searchInput: {
        flex: 1,
        borderRadius: theme.radius.sm,
        paddingVertical: 10,
        fontSize: hp(2),
    },
    closeIcon: {
        backgroundColor: theme.colors.neutral(0.1),
        padding: 8,
        borderRadius: theme.radius.sm,
    },
    categories: {
        marginBottom: 15,
    },
});

export default HomeScreen;
