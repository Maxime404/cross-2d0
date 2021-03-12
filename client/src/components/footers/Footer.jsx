import React from 'react'
import { Icon } from 'react-native-elements'
import { Footer, FooterTab, Button } from 'native-base'
import { View } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import TranslatableText from '../TranslatableText'
import { colors } from '../../../assets/styles/colors'

export const MyFooter = () => {
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
      <Footer>
        <FooterTab style={{ backgroundColor: colors.customLightGreen }}>
          <Button vertical onPress={() => navigation.navigate('History')}>
            <View style={{ position: 'relative', bottom: 6 }}>
              <Icon reverse name="history" type="font-awesome-5" size={20} color="transparent" />
            </View>
            <TranslatableText lang={lang} style={{ position: 'absolute', top: 40, color: '#fff' }}>
              Historique
            </TranslatableText>
          </Button>
          <Button vertical onPress={() => navigation.navigate('Favorites')}>
            <View style={{ position: 'relative', bottom: 4 }}>
              <Icon reverse name="star" type="font-awesome-5" size={20} color="transparent" />
            </View>
            <TranslatableText lang={lang} style={{ position: 'absolute', top: 40, color: '#fff' }}>
              Favoris
            </TranslatableText>
          </Button>
          <Button vertical onPress={() => navigation.navigate('Parameter')}>
            <View style={{ position: 'relative', bottom: 5 }}>
              <Icon reverse name="cog" type="font-awesome-5" size={20} color="transparent" />
            </View>
            <TranslatableText lang={lang} style={{ position: 'absolute', top: 40, color: '#fff' }}>
              Paramètres
            </TranslatableText>
          </Button>
        </FooterTab>
      </Footer>
    )
  } else {
    return <View></View>
  }
}

export default MyFooter
