import { Image, StyleSheet, Platform,Linking } from 'react-native';
import { useState ,useEffect} from 'react';
import { Accelerometer } from 'expo-sensors';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const[{x},setData]=useState({x:0})

  useEffect(()=>{
    const pos=Accelerometer.addListener(setData)
    return ()=>pos.remove()
  },[])

  useEffect(()=>{
    if (x>1.5) {
      handleEnviar()
      console.log("llamada");
    }    
  },[x])

  const handleEnviar=async ()=>{
    const numero=await AsyncStorage.getItem("numeroEmergencia")
    const url="whatsapp://send?phone="+numero+"&text=EMERGENCIA"
    await Linking.openURL(url)

  }


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenido!</ThemedText>
        <HelloWave />
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
