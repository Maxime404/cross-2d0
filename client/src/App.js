import { registerRootComponent } from 'expo'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import Parameter from './views/Parameter'
import History from './views/History'
import Favorites from './views/Favorites'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import ForgotPassword from './views/ForgotPassword'
import Home from './views/Home'
import SplashScreen from './views/SplashScreen'
import LanguageChooser from './views/LanguageChooser'
import Header from './components/headers/Header'
import Footer from './components/footers/Footer'
import ProductDetails from './views/ProductDetails'
import Preference from './views/Preference'
import Profil from './views/Profil'

const Drawer = createDrawerNavigator()
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="SplashScreen" screenOptions={{ gestureEnabled: false }}>
        <Drawer.Screen name="SplashScreen" component={SplashScreen} />
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="Header" component={Header} />
        <Drawer.Screen name="Footer" component={Footer} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="SignUp" component={SignUp} />
        <Drawer.Screen name="Profil" component={Profil} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default registerRootComponent(App)
