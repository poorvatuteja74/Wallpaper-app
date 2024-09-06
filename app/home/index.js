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
import FiltersModal from '../../components/filtersModal';
import { ActivityIndicator } from 'react-native';

let page = 1;

const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30; 
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState('null');
    const [images, setImages] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const searchInputRef = useRef(null);
    const modalRef = useRef(null);

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

    const openFiltersModal = () => {
        modalRef?.current?.present();
    }

    const closeFiltersModal = () => {
        modalRef?.current?.close();
    }

    const applyFilters = () => {
        if (filters) {
            page = 1; // Changed comma to semicolon
            setImages([]); // Changed comma to semicolon
            let params = {
                page,
                ...filters,
            };
            if (activeCategory) params.category = activeCategory;
            if (search) params.q = search;
            fetchImages(params, false);
        }
        closeFiltersModal();
    };
    
    const resetFilters = () => {
        if (filters) {
            page = 1; // Changed comma to semicolon
            setFilters(null);
            setImages([]); // Changed comma to semicolon
            let params = {
                page,
            };
            if (activeCategory) params.category = activeCategory;
            if (search) params.q = search;
            fetchImages(params, false);
        }
        closeFiltersModal();
    }

    const clearThisFilter = (filterName) =>  {

        let filterz=  {...filters};
        delete filterz[filterName];
        setFilters({...filterz});
        page= 1;
        setImages([]);
        let params = {
            page,
            ...filterz
        }
        if (activeCategory) params.category = activeCategory;
            if (search) params.q = search;
            fetchImages(params, false);
        

    }

    const handleChangeCategory = (category) => {
        console.log('Selected category:', category);
        setActiveCategory(category);
        clearSearch(); // Clear search when category is changed
        setImages([]); // Clear current images
        page = 1;
        let params = { page , ...filters};
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
            fetchImages({ page, q: text, ...filters }, false);
        }

        if (text === "") {
            page = 1;
            setImages([]);
            fetchImages({ page, category: activeCategory, ...filters }, false);
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

console.log ('filters : ', filters)
    return (
        <View style={[styles.container, { paddingTop }]}>
            <View style={styles.header}>
                <Pressable>
                    <Text style={styles.title}>Pixel</Text>
                </Pressable>
                <Pressable onPress={openFiltersModal}>
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
                {
                    filters && 
                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator= {false} contentContainerStyle= {styles.filters}>
                            {
                                Object.keys(filters).map ((key, index) => {
                                     return (
                                        <View key={key} style ={styles.filterItems}>
                                            {
                                                key == "colors"? (
                                                    <View style = {{
                                                        height: 20,
                                                        width: 30,
                                                        borderRadius:7,
                                                        backgroundColor: filters[key]
                                                    }}/>
                                                ): (<Text style ={styles.filterItemText}>{filters[key]}</Text>)  
                                            }
                                            
                                            <Pressable style ={styles.filterCloseIcon} onPress={()=> clearThisFilter(key)}>
                                            <Ionicons name="close" size={14} color={theme.colors.neutral(0.9)} /> 
                                            </Pressable>
                                        </View>
                                     )
                                })
                            }
                        </ScrollView>
                    </View>
                }

                <View>
                    {images.length > 0 && <ImageGrid images={images} />}
                    {/* {images.length === 0 && (
                        <Text style={styles.noImagesText}>No images found.</Text>
                    )} */}
                </View>
                <View style={{ marginBottom: 70, marginTop: Array.isArray(images) && images.length > 0 ? 10 : 70 }}>
                    <ActivityIndicator size="large" />
                    </View>

            </ScrollView>
            <FiltersModal 
            modalRef={modalRef}
            filters ={filters}
            setFilters ={setFilters}
            onClose = {closeFiltersModal}
            onApply = {applyFilters}
            onReset = {resetFilters}
            />
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
    filters: {
        paddingHorizontal :wp(4),
        gap: 10
    },
    filterItems : {
        backgroundColor: theme.colors.grayBG,
        padding: 3,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.radius.xs,
        padding : 8,
        gap: 10,
        paddingHorizontal: 10, 
    },
    filterItemText: {
        fontSize :hp (1.8),

    },
    closeIcon: {
        backgroundColor :theme.colors.neutral(0.2),
        padding:4,
        borderRadius: 7
    }
});

export default HomeScreen;
