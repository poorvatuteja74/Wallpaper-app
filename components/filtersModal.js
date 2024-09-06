import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { theme } from '../constants/theme';
import { capitalize, hp } from '../helpers/common';
import { ColorFilterRow, CommonFilterRow, SectionView } from './filterViews';
import { data } from '../constants/data';

const FiltersModal = ({ 
  modalRef,
  filters,
  setFilters,
  onClose,
  onApply,
  onReset
}) => {
  // Define snap points
  const snapPoints = useMemo(() => ['75%'], []);

  // renders
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
            <Text style={styles.filterText}>Filters</Text>
            {
                Object.keys(sections).map((sectionName) => {
                    let sectionView = sections[sectionName];
                    let sectionData = data.filters[sectionName];
                    let title = capitalize(sectionName);
                    return(
                        <View key={sectionName}> 
                            <SectionView
                                title={title}
                                content={sectionView({
                                  data: sectionData,
                                  filters,
                                  setFilters,
                                  filterName: sectionName
                                })}
                            />
                        </View>
                    );
                })
            }

            {/*action */}

            <View style= {styles.button}>
              <Pressable style = {styles.resetButton} onPress={onReset}>
                <Text style={[styles.buttonText, {color: theme.colors.neutral(0.9)} ]}>Reset</Text>
              </Pressable>
              <Pressable style = {styles.applyButton} onPress={onApply}>
                <Text style={[styles.buttonText, {color: theme.colors.white} ]}>Apply</Text>
              </Pressable>

            </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
    "order": (props) => <CommonFilterRow {...props} />,
    "orientation": (props) => <CommonFilterRow {...props} />,
    "type": (props) => <CommonFilterRow {...props} />,
    "colors": (props) => <ColorFilterRow {...props} />
}

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    gap: 15, 
    // width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  button: {
    flex:1,
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 10
  },
  applyButton : {
    flex: 1,
    backgroundColor: theme.colors.neutral( 0.8),
    padding :12,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:  theme.radius.md,
    borderCurve: 'continuous'
  },
  resetButton : {
    flex: 1,
    backgroundColor: theme.colors.neutral( 0.1),
    padding :12,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:  theme.radius.md,
    borderCurve: 'continuous',
    borderWidth: 2,
    borderColor: theme.colors.grayBG
  },
  buttonText: {
    fontSize: hp (2.2)
  }
});

export default FiltersModal;
