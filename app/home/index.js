import {View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '../../constants/theme';
import { wp,hp } from '../../helpers/common';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const homeScreen = () => {

    const {top} = useSafeAreaInsets();
    const paddingTop = top>0? top+10: 30;

    return (
        <View style= {[styles.container, {paddingTop}]}>

            {/*header */}

            <View style= {styles.header}>

            <Pressable><Text style={styles.title}>Pixel</Text></Pressable>
            <Pressable>
                <FontAwesome name="bars" size= {20} color= {theme.colors.neutral(0.7)}/>
            </Pressable>

            </View>
        </View>
    )


}

const styles = StyleSheet.create({

    container: {

        flex:1,
        gap:15,
    },

    header: {

        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    title: {

        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9)

    }
})

export default homeScreen