import React, { useState, useEffect } from 'react'
import Layout from '../layouts/Layout'
import styles from '../../assets/styles/styles'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Icon } from 'react-native-elements'
import TranslatableText from '../components/TranslatableText'
import { useNavigation } from '@react-navigation/native'
import { lang } from 'moment'

export const Home = props => {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null)
  const [isCamOpened, toggleCam] = useState(false)
  const [user, setUser] = useState(null)
  const [appLanguage, setAppLanguage] = useState(null)

  //  const [search, setSearch] = useState("")
  //  const [data,setData] = useState([])

  setDataStorage = async () => {
    let data = await AsyncStorage.getItem('data')
    const appLanguage = await AsyncStorage.getItem('appLanguage')
    if (!data) {
      navigation.navigate('SignIn')
    } else {
      // console.log(data)
      setAppLanguage(appLanguage)
      let dataObj = JSON.parse(data)
      setUser(dataObj)
    }
  }

  useEffect(() => {
    ;(async () => {
      await setDataStorage()
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    toggleCam(false)
    navigation.navigate('ProductDetails', { barcode: data, user, appLanguage })
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const activateCam = () => {
    return (
      <View style={styles.container}>
        <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFill} />
      </View>
    )
  }

  if (!isCamOpened) {
    return (
      <Layout title="Home">
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 600,
          }}
        >
          <TouchableOpacity>
            <Icon name="camera" type="font-awesome-5" size={100} onPress={() => toggleCam(true)}></Icon>
          </TouchableOpacity>
        </View>
      </Layout>
    )
  } else {
    return activateCam()
  }
}

export default Home
