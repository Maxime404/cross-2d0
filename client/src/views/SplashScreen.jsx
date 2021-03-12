import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'

import styles from '../../assets/styles/styles'

export default class SplashScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setDataStorage()
    }, 3000)
  }

  setDataStorage = async () => {
    const data = await AsyncStorage.getItem('data')
    const appLanguage = await AsyncStorage.getItem('appLanguage')

    if (!appLanguage) {
      this.props.navigation.navigate('LanguageChooser')
    } else if (!data) {
      this.props.navigation.navigate('SignIn')
    } else {
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    const { navigation } = this.props

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.splashView}>
          <Text style={styles.logoTitle}>2D0</Text>
        </View>
      </SafeAreaView>
    )
  }
}
