import { Image, StyleSheet, TextInput,SafeAreaView,Button } from 'react-native';
import { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function setNumero() {
    const [number,setNumber]=useState('')
    const [x,setX]=useState('')
    async function setStorage(num){
        await AsyncStorage.setItem("numeroEmergencia", num)
    }
    const Send=()=>{    
        if (number.length<10 ) {
            setX("Numero de telefono inválido")
        }else{
            const numberPosta='+549' + number
            setStorage(numberPosta)
            setX("Numero Guardado!")
            
        }
        setTimeout(()=>setX(''),2000)


    }
    return (

      
            <SafeAreaView style={styles.todo}> 
                <ThemedText>Número de telefono de emergencia</ThemedText>
                <ThemedText>(sin +54 9)</ThemedText>
                <ThemedText>{x}</ThemedText>

                <TextInput
                    style={styles.input}
                    onChangeText={setNumber}
                    value={number}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                    maxLength={10}
                />   
                <Button
                    onPress={Send}
                    title="Guardar"
                    color="#841584"
                />
            </SafeAreaView> 
    );
  }

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor:"white"
    },
    todo:{
        marginTop:100
    }
  });