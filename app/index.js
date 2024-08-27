import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { wp, hp } from '../helpers/common';
import Animated, { FadeInDown } from 'react-native-reanimated';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/welcome.jpg')}
        style={styles.bgImage}
        resizeMode='cover'
      />
      {/* Linear gradient */}
      <Animated.View 
        entering={FadeInDown.duration(600)} 
        style={{ flex: 1 }}
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
  gradient: {
    width: wp(100),
    height: hp(65), // Adjust this height based on how much of the screen you want the gradient to cover
    position: 'absolute',
    bottom: 0,
  },
});

export default WelcomeScreen;
