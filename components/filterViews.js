import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { theme } from '../constants/theme';
import { wp, hp, capitalize } from '../helpers/common';

export const SectionView = ({ title, content }) => (
    <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {content}
    </View>
);



export const CommonFilterRow = ({ data, filterName, filters, setFilters }) => {

    const onSelect = (item) => {
        setFilters ({...filters, [filterName]: item})
    } 

    return (
        <View style={styles.flexRowWrap}>
            {data && data.map((item) => {
                const isActive = filters && filters[filterName] === item;
                const backgroundColor = isActive ? theme.colors.neutral(0.7) : 'white';
                const color = isActive ? "white" : theme.colors.neutral(0.7);

                return (
                    <Pressable
                        onPress={() => onSelect(item)}
                        key={item}
                        style={[styles.outlinedButton, { backgroundColor }]}
                    >
                        <Text style={[styles.outlinedButtonText, { color }]}>
                            {capitalize(item)}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};


const styles = StyleSheet.create({
    sectionContainer: {
        gap: 8,
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.neutral(0.8),
    },
    flexRowWrap: {
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    outlinedButton: {
        padding: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.xs,
    },
    outlinedButtonText: {
        fontSize: hp(2),
    }
});
