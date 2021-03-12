import React from 'react'
import { SafeAreaView, View } from 'react-native'

import MyHeader from '../components/headers/Header'
import Footer from '../components/footers/Footer'
import styles from '../../assets/styles/styles'

export default function Layout({ title, children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topScreen}>
        <MyHeader text={title} />
      </View>
      <View>{children}</View>
      <View style={styles.bottomSreen}>
        <Footer />
      </View>
    </SafeAreaView>
  )
}
