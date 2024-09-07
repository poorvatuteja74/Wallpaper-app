import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti'; // Moti for animations
import { theme } from '../constants/theme';
import { capitalize, hp } from '../helpers/common';
import { ColorFilterRow, CommonFilterRow, SectionView } from './filterViews';
import { data } from '../constants/data';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'; // Import Animated and interpolate

const FiltersModal = ({
  modalRef,
  filters,
  setFilters,
  onClose,
  onApply,
  onReset,
}) => {
  const snapPoints = useMemo(() => ['75%'], []);

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
          {Object.keys(sections).map((sectionName, index) => {
            const sectionView = sections[sectionName];
            const sectionData = data.filters[sectionName];
            const title = capitalize(sectionName);

            return (
              <MotiView
                key={sectionName}
                from={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'timing',
                  delay: index * 100, // Set delay here
                  duration: 300,
                }}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </MotiView>
            );
          })}
          <View style={styles.button}>
            <Pressable style={styles.resetButton} onPress={() => {
                console.log('Resetting filters:', filters);
                onReset();
            }}>
              <Text style={[styles.buttonText, { color: theme.colors.neutral(0.9) }]}>
                Reset
              </Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={() => {
                console.log('Applying filters:', filters);
                onApply();
            }}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  order: (props) => <CommonFilterRow {...props} />,
  orientation: (props) => <CommonFilterRow {...props} />,
  type: (props) => <CommonFilterRow {...props} />,
  colors: (props) => <ColorFilterRow {...props} />,
};

// Updated CustomBackdrop component
const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolate.CLAMP); // Use Extrapolate.CLAMP for safety
    return { opacity };
  });

  const containerStyle = [StyleSheet.absoluteFill, style, styles.overlay, containerAnimatedStyle];

  return (
    <Animated.View style={containerStyle}>
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={20} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    gap: 10,
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.1),
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.grayBG,
  },
  buttonText: {
    fontSize: hp(2.2),
  },
});

export default FiltersModal;
