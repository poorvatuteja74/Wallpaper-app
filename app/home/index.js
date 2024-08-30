import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme'; // Ensure correct path
import { wp, hp } from '../../helpers/common'; // Ensure correct path
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Ensure correct import
import { Feather, Ionicons } from '@expo/vector-icons'; // Ensure correct import
import Categories from '../../components/categories';

const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const [search, setSearch]= useState ('');
    const [activeCategory, setActiveCategory] =useState(null);
    const searchInputRef = useRef(null)

    const handleChangeCategory =(cat)=> {
        setActiveCategory (cat)
    }

    console.log('active category:', activeCategory)

    return (
        <View style={[styles.container, { paddingTop }]}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable>
                    <Text style={styles.title}>Pixel</Text>
                </Pressable>
                <Pressable>
                    <FontAwesome name="bars" size={20} color={theme.colors.neutral(0.7)} />
                </Pressable>
            </View>

            {/* ScrollView */}
            <ScrollView contentContainerStyle={{ gap: 15 }}>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
                    </View>
                    <TextInput
                        placeholder='Search for photos'
                        value={search}
                        ref= {searchInputRef}
                        onChangeText={value => setSearch(value)}
                        style={styles.searchInput}
                        placeholderTextColor={theme.colors.neutral(0.5)}
                    />

                    {

                        search && (

                            <Pressable style={styles.closeIcon}>
                        <Ionicons name="close" size={24} color={theme.colors.neutral(0.6)} />
                    </Pressable>

                        )
                        
                    }
                    
                </View>

                <View style={styles.categories}>
                    <Categories 
                    activeCategory={activeCategory} 
                    handleChangeCategory={handleChangeCategory} 
                    
                    />
                    </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20, // To ensure space at the bottom of ScrollView
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
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        
    },
    searchIcon: {
        padding: 10,
    },
    searchInput: {
        flex: 1,
        borderRadius: theme.radius.sm,
        paddingVertical: 10,
        fontSize: hp(2),
        // marginLeft: 10,
        // paddingHorizontal: 12,  
        // borderWidth: 1,
        // borderColor: theme.colors.neutral(0.3),
        
    },
    closeIcon: {
        backgroundColor: theme.colors.neutral(0.1),
        padding: 8,
        borderRadius: theme.radius.sm,
    },
});

export default HomeScreen;
