import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Layout = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} // Hide header if needed
      />
      
      <Stack.Screen
        name="home/index"
        options={{ headerShown: false }} // Hide header if needed
      />
      
      <Stack.Screen
        name="home/image"
        options={{ 
          headerShown: false, 
          presentation: "transparentModal",
          animation:'fade'


        }} // Hide header if needed
      />
    </Stack>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
