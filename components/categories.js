import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { data } from '../constants/data'; // Ensure this path is correct
import { wp, hp } from '../helpers/common';
import { theme } from '../constants/theme';
import Animated, { FadeInRight } from 'react-native-reanimated';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleChangeCategory = (category) => {
    console.log('Selected Category:', category); // Debugging log
    setActiveCategory(category);
  };

  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item} // Ensure unique key
      renderItem={({ item, index }) => (
        <CategoryItem
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
          title={item}
          index={index}
        />
      )}
    />
  );
};

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  let backgroundColor = isActive ? theme.colors.neutral(0.8) : theme.colors.white;

  return (
    <Animated.View entering={FadeInRight.delay(index * 200).duration(1000)}>
      <Pressable
        onPress={() => {
          console.log('Pressed:', title); // Debugging log
          handleChangeCategory(isActive ? null : title);
        }}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: 'white',
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});

export default Categories;
