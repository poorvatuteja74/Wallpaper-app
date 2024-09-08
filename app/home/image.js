import { View, Text, StyleSheet, ActivityIndicator, Pressable, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { wp, hp } from '../../helpers/common';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { theme } from '../../constants/theme';
import { Entypo, Octicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';

const ImageScreen = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [status, setStatus] = useState('loading');
  
  const uri = item?.webformatURL;
  const fileName = item?.previewURL?.split('/').pop();
  const imageUrl = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  const onLoad = () => {
    setStatus('loaded');
  };

  const handleDownloadImage = async () => {
    setStatus('downloading');
    try {
      const downloadedUri = await downloadFile();
      if (downloadedUri) {
        showToast('Image Downloaded');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Download Error', 'There was an issue downloading the image.');
    } finally {
      setStatus('idle');
    }
  };

  const handleShareImage = async () => {
    setStatus('sharing');
    try {
      const uri = await downloadFile();
      if (uri) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error('Error sharing image:', error);
      Alert.alert('Share Error', 'There was an issue sharing the image.');
    } finally {
      setStatus('idle');
    }
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      console.log('Finished downloading to', uri);
      return uri;
    } catch (err) {
      console.error('Error downloading file:', err.message);
      Alert.alert('Download Error', err.message);
      return null;
    }
  };

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
    });
  };

  const toastConfig = {
    success: ({ text1 }) => (
      <View style={styles.toast}>
        <Text style={styles.toastText}>{text1}</Text>
      </View>
    ),
  };

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;
    const maxWidth = Platform.OS === 'web' ? wp(50) : wp(80);
    const calculatedHeight = maxWidth / aspectRatio;
    const calculatedWidth = aspectRatio < 1 ? calculatedHeight * aspectRatio : maxWidth;

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  return (
    <BlurView style={styles.container} tint='dark' intensity={60}>
      <View style={getSize()}>
        {status === 'loading' && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={{ uri }}
          onLoad={onLoad}
        />
      </View>

      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Octicons name='x' size={24} color="white" />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100)}>
          {status === 'downloading' ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <Octicons name='download' size={24} color="white" />
            </Pressable>
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === 'sharing' ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleShareImage}>
              <Entypo name='share' size={22} color="white" />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast config={toastConfig} visibilityTime={2500} />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(80), // Adjust width to fit button spacing
    paddingHorizontal: wp(4),
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: hp(1),
  },
  toast: {
    paddingHorizontal: 30,
    padding: 15,
    borderRadius: theme.radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
});

export default ImageScreen;
