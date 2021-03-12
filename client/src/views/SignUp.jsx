import React, { Component } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import translate from '../../lib/utils/Translate'
import TranslatableText from '../components/TranslatableText'
import styles from '../../assets/styles/styles'

export default class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: '',
      passwordConfirmation: '',
      error: '',
      lang: '',
      placeHolders: [],
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
            firstname: state.firstname,
            lastname: state.lastname,
            phone: state.phone,
            passwordConfirmation: state.passwordConfirmation,
            placeHolders: state.placeHolders,
            lang: appLanguage,
          }))
          resolve(this.state.lang)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  translateWord = async lang => {
    const placeholderFirstname = await translate('Prénom', lang)
    const placeholderLastname = await translate('Nom', lang)
    const placeholderMail = await translate('Email', lang)
    const placeholderPhone = await translate('phone', lang)
    const placeholderPwd = await translate('Mot de passe', lang)
    const placeholderPwdConf = await translate('Confirmation du mot de passe', lang)

    this.setState(state => ({
      email: state.email,
      password: state.password,
      error: state.error,
      lang: state.lang,
      firstname: state.firstname,
      lastname: state.lastname,
      phone: state.phone,
      passwordConfirmation: state.passwordConfirmation,
      placeHolders: [
        placeholderFirstname,
        placeholderLastname,
        placeholderMail,
        placeholderPhone,
        placeholderPwd,
        placeholderPwdConf,
      ],
    }))
    console.log(this.state.placeHolders)
  }

  async componentDidMount() {
    await this.getAppLanguage()
    await this.translateWord(this.state.lang)
  }

  async signUp() {
    if (this.isSamePasswords(this.state.password, this.state.passwordConfirmation)) {
      const req = await fetch('https://glutendb.herokuapp.com/api/authenticate/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: this.state.firstname.trim(),
          lastname: this.state.lastname.trim(),
          email: this.state.email.trim(),
          password: this.state.password.trim(),
          passwordConfirmation: this.state.passwordConfirmation.trim(),
          phone: this.state.phone,
        }),
      })
      try {
        const json = await req.json()
        if (json.err) {
          this.setState({ error: json.err.description })
        } else {
          await this._storeData(json.data)
          this.props.navigation.navigate('Preference', { data: json.data })
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      this.setState({ error: 'Attention,\nLes mots de passe saisis ne correspondent pas' })
    }
  }

  isSamePasswords(password, passwordConfirmation) {
    return password.trim() === passwordConfirmation.trim() ? true : false
  }

  _storeData = async data => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(data))
    } catch (error) {
      console.log('Local storage data Error : ', error)
    }
  }

  render() {
    const { navigation } = this.props
    console.disableYellowBox = true

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
                autoCapitalize="none"
                style={styles.input}
                placeholder={this.state.placeHolders[0]}
                onChangeText={firstname => this.setState({ firstname })}
              />
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder={this.state.placeHolders[1]}
                onChangeText={lastname => this.setState({ lastname })}
              />
              <TextInput
                //caretHidden
                autoCapitalize="none"
                style={styles.input}
                placeholder={this.state.placeHolders[2]}
                onChangeText={email => this.setState({ email })}
              />

              <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder={this.state.placeHolders[3]}
                onChangeText={phone => this.setState({ phone })}
              />
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder={this.state.placeHolders[4]}
                onChangeText={password => this.setState({ password })}
              />
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder={this.state.placeHolders[5]}
                onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
              />
              <TouchableOpacity style={styles.button} onPress={() => this.signUp()}>
                <TranslatableText lang={this.state.lang} style={styles.textButton}>
                  S'inscrire
                </TranslatableText>
              </TouchableOpacity>
            </View>
            <Text style={styles.error}>{this.state.error}</Text>
          </View>
          <TouchableOpacity style={styles.bottomView} onPress={() => navigation.navigate('SignIn')}>
            <TranslatableText lang={this.state.lang}>Vous avez déja un compte ? Clique ici !</TranslatableText>
          </TouchableOpacity>
        </SafeAreaView>
      )
    } else {
      return <View></View>
    }
  }
}
