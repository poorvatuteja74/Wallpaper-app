import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { wp  } from '../../helpers/common'
import { useRouter } from 'expo-router'

const imageScreen = () => {

  const router = useRouter();
  return (
    <BlurView
      style={styles.container}
      tint='dark'
      intensity={60}
    >
      <Button title="Back" onPress={() => router.back()} />
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: wp(4)
  }
})

export default imageScreen
