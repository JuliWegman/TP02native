import { Image, StyleSheet, Platform,Linking } from 'react-native';
import { useState ,useEffect} from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import * as Location from 'expo-location';

const apiKey="164902dbe4541744dab5d3393451cdfc"

export default function HomeScreen() {
    const [lugar,setLugar]=useState()
    const [temperatura,setTemperatura]=useState()
    const [nube,setnube]=useState()
    const [humedad,sethumedad]=useState()
    const [fecha,setFecha]=useState(new Date(Date.now()))
    useEffect(() => {
      (async () => {
        try{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
  
        const location = await Location.getCurrentPositionAsync({});        
        const res=await axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+location.coords.latitude+"&lon="+location.coords.longitude+"&appid="+apiKey+"&units=metric")
        setnube(res.data.clouds.all)
        setTemperatura(res.data.main.temp)
        sethumedad(res.data.main.humidity)
        setLugar(res.data.name)
        console.log(res.data.name);
        }catch(error){
            console.log(error);
            
        }
    })();
    setInterval(()=>{setFecha(new Date(Date.now()))},1000)
    }, []);
    useEffect(()=>{
        async function fetchData(){
            

        }

        fetchData()

    },[])
  
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
            <ThemedText type="title">{fecha.toLocaleDateString()} {fecha.toLocaleTimeString()}</ThemedText>
        </ThemedView>
        <ThemedView >
        <ThemedText type="title">Clima en {lugar}:</ThemedText>
          <ThemedText >La temperatura es de {temperatura}°C</ThemedText>
          <ThemedText >%{nube} Nublado</ThemedText>
          <ThemedText >%{humedad} de humedad</ThemedText>



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
    },centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#2196F3',
        marginTop:24
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      }
  });
  