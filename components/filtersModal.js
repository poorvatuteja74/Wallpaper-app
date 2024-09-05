import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const FiltersModal = ({modalRef}) => {
  // ref
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//   // variables
  const snapPoints = useMemo(() => ['75%'], []);

  // renders
  return (
        <BottomSheetModal
          ref={modalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose ={true}
        //   onChange={handleSheetChanges}
        
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
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
});

export default FiltersModal;