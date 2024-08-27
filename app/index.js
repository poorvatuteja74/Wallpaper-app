import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { wp, hp } from '../helpers/common';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
    const router = useRouter(); // Corrected useRouter to be called as a function

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/welcome.jpg')}
                style={styles.bgImage}
                resizeMode='cover'
            />
            
            {/* Content */}
            <View style={styles.contentContainer}>
                <Text style={styles.titles}>PIXELS</Text>
                <Text style={styles.punchline}>Perfectly Papered. Be in Style</Text>
                <Pressable onPress={() => router.push('home')} style={styles.startButton}>
                    <Text style={styles.startText}>Explore</Text>
                </Pressable>
            </View>

            {/* Gradient and animation */}
            <Animated.View 
                entering={FadeInDown.duration(600)} 
                style={styles.gradientContainer}
            >
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'white']}
                    style={styles.gradient}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.8 }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    bgImage: {
        width: wp(100),
        height: hp(100),
        position: 'absolute',
    },
    gradientContainer: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(65), // Adjust this height based on how much of the screen you want the gradient to cover
    },
    gradient: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 14,
        zIndex: 1, // Ensures content is above the gradient
        marginBottom: 30,
    },
    titles: {
        fontSize: hp(5),
        color: theme.colors.neutral(0.9),
        fontWeight: theme.fontWeights.bold,
    },
    punchline: {
        fontSize: hp(2),
        letterSpacing: 1,
        marginBottom: 10,
        fontWeight: theme.fontWeights.bold,
    },
    startButton: {
        marginBottom: 70,
        backgroundColor: theme.colors.neutral(0.9),
        padding: 10,
        paddingHorizontal: 50,
        borderRadius: theme.radius.xl,
    },
    startText: {
        color: theme.colors.white,
        fontSize: hp(3),
        fontWeight: theme.fontWeights.medium,
        letterSpacing: 1,
    },
});

export default WelcomeScreen;
