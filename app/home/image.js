import { View, Text, StyleSheet, Button, Platform } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import { wp } from '../../helpers/common'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { theme } from '../../constants/theme'

const imageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState('');
  let uri = item?.webformatURL;

  const onLoad = () => {
    setStatus('');
  }

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;
    const maxWidth = Platform.OS === 'web' ? wp(50) : wp(80); // Adjust mobile width to a larger value
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight
    }
  }

  console.log('image :', item);
  return (
    <BlurView
      style={styles.container}
      tint='dark'
      intensity={60}
    >
      <View style={[]}>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={{ uri: uri }} // Wrap uri in an object
          onLoad={onLoad}
        />
      </View>
      <Button title="Back" onPress={() => router.back()} />
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: 'rgba(0,0,0,0.5)' // Correct rgba syntax
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.1)',
  }
})

export default imageScreen;
