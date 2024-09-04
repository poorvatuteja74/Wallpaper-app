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
import { debounce } from 'lodash';

let page = 1;

const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const [search, setSearch] = useState('');
    const [images, setImages] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async (params = { page: 1 }, append = false) => {
        try {
            console.log('Fetching images with params:', params);
            let res = await apiCall(params);
            console.log('API response:', res);

            if (res.success && res?.data?.hits) {
                if (append) {
                    setImages(prevImages => [...prevImages, ...res.data.hits]);
                } else {
                    setImages(res.data.hits);
                }
            } else {
                setImages([]); // Clear images if API call fails or returns no hits
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setImages([]); // Clear images if an error occurs
        }
    };

    const handleChangeCategory = (category) => {
        console.log('Selected category:', category);
        setActiveCategory(category);
        clearSearch(); // Clear search when category is changed
        setImages([]); // Clear current images
        page = 1;
        let params = { page };
        if (category) params.category = category; // Add category to params
        console.log('Params being sent:', params);
        fetchImages(params, false); // Fetch images with the selected category
    };

    const handleSearch = (text) => {
        setSearch(text);
        if (text.length > 2) {
            page = 1;
            setImages([]);
            setActiveCategory(null);
            fetchImages({ page, q: text }, false);
        }

        if (text === "") {
            page = 1;
            setImages([]);
            fetchImages({ page, category: activeCategory }, false);
        }
    };

    // Debounce the handleSearch function
    const handleTextDebounce = useCallback(
        debounce((text) => handleSearch(text), 400),
        []
    );

    const onSearchChange = (text) => {
        setSearch(text);
        handleTextDebounce(text);
    };

    const clearSearch = () => {
        setSearch('');
        searchInputRef.current?.clear();
        page = 1;
        setImages([]);
        fetchImages({ page, category: activeCategory });
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
                        value={search}
                        ref={searchInputRef}
                        onChangeText={onSearchChange}
                        style={styles.searchInput}
                    />
                    {search && (
                        <Pressable onPress={clearSearch} style={styles.closeIcon}>
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
                    {images.length === 0 && (
                        <Text style={styles.noImagesText}>No images found.</Text>
                    )}
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
    noImagesText: {
        textAlign: 'center',
        fontSize: hp(2),
        color: theme.colors.neutral(0.6),
        marginTop: 20,
    },
});

export default HomeScreen;
