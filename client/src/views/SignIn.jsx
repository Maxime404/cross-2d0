import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import translate from '../../lib/utils/Translate'
import TranslatableText from '../components/TranslatableText'
import styles from '../../assets/styles/styles'

export default class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: '',
      lang: '',
      placeHolders: [],
    }
  }

  async signIn() {
    const req = await fetch('https://glutendb.herokuapp.com/api/authenticate/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.state.email.trim(), password: this.state.password.trim() }),
    })
    try {
      const json = await req.json()
      if (json.err) {
        this.setState({ error: json.err.description })
      } else {
        await this._storeData(json.data)
        if (json.data.user) {
          this.props.navigation.navigate('Home')
        } else {
          console.log('Error: no user type')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  _storeData = async data => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(data))
    } catch (error) {
      console.log('Local storage data Error : ', error)
    }
  }

  getAppLanguage = async () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('appLanguage')
        .then(appLanguage => {
          this.setState(state => ({
            email: state.email,
            password: state.password,
            error: state.error,
            lang: appLanguage,
            placeHolders: [],
          }))
          resolve(this.lang)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  translateWord = async lang => {
    const placeholderEmail = await translate('Email', lang)
    const placeholderPwd = await translate('Mot de passe', lang)
    this.setState(state => ({
      email: state.email,
      password: state.password,
      error: state.error,
      lang: state.lang,
      placeHolders: [placeholderEmail, placeholderPwd],
    }))
    console.log(this.state)
  }

  async componentDidMount() {
    await this.getAppLanguage()
    await this.translateWord(this.state.lang)
  }

  render() {
    const { navigation } = this.props

    if (
      this.state.lang != undefined &&
      this.state.lang != '' &&
      this.state.placeHolders != undefined &&
      this.state.placeHolders.length != 0
    ) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.titleView}>
            <Text style={[styles.title, { marginTop: 20 }]}>Gluten App</Text>
          </View>
          <View style={styles.loginView}>
            <View style={styles.inputView}>
              <TextInput
                name="email"
                autoCapitalize="none"
                style={styles.input}
                placeholder={this.state.placeHolders[0]}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder={this.state.placeHolders[1]}
                onChangeText={password => this.setState({ password })}
              />
              <TouchableOpacity style={styles.button} onPress={() => this.signIn()}>
                <TranslatableText style={styles.textButton} lang={this.state.lang}>
                  Connexion
                </TranslatableText>
              </TouchableOpacity>
            </View>
            <Text style={styles.error}>{this.state.error}</Text>
            <TouchableOpacity style={styles.textInput} onPress={() => navigation.navigate('ForgotPassword')}>
              <TranslatableText lang={this.state.lang}>Mot de passe oublié</TranslatableText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.bottomView} onPress={() => navigation.navigate('SignUp')}>
            <TranslatableText lang={this.state.lang}>Pas encore inscrit ? Clique ici !</TranslatableText>
          </TouchableOpacity>
        </SafeAreaView>
      )
    } else {
      return <View></View>
    }
  }
}
