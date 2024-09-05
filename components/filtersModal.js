import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated'; // Import Animated from react-native-reanimated

const FiltersModal = ({ modalRef }) => {
  // Define snap points
  const snapPoints = useMemo(() => ['75%'], []);

  // renders
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop} // Use CustomBackdrop
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const CustomBackdrop = ({ animatedIndex, style }) => {

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );

    return { opacity }; // Return opacity as an object
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      <BlurView 
        style={StyleSheet.absoluteFill}
        tint='dark'
        intensity={25}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)', // Correct the rgba format
  },
});

export default FiltersModal;
