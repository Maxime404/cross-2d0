import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import TranslatableText from '../TranslatableText'
import { colors } from '../../../assets/styles/colors'
import styles from '../../../assets/styles/styles'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

export const MyHeader = ({ text }) => {
  const navigation = useNavigation()
  const [lang, setLang] = React.useState(null)

  const getAppLanguage = async () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('appLanguage')
        .then(appLanguage => {
          setLang(appLanguage)
          resolve(lang)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  React.useEffect(() => {
    getAppLanguage()
  }, [])

  if (lang != undefined && lang != null) {
    return (
      <View>
        <Header
          centerComponent={
            <TranslatableText lang={lang} style={styles.pageTitle}>
              {text}
            </TranslatableText>
          }
          rightComponent={
            <TouchableOpacity
              style={styles.textButton}
              onPress={() => {
                navigation.navigate('Home')
              }}
            >
              <Icon reverse name="home" type="fontawesome" color="transparent" size={25} />
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: colors.customLightGreen,
            height: 80,
          }}
        />
      </View>
    )
  } else {
    return <View></View>
  }
}
export default MyHeader
