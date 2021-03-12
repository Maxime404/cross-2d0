import { AutoScaling } from 'aws-sdk'
import { StyleSheet, Platform, Dimensions } from 'react-native'

import { colors } from './colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pageTitle: {
    color: '#fff',
    /* fontFamily: 'Rammetto', */
  },
  searchBarContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    maxHeight: 50,
    backgroundColor: colors.customLightGreen,
    overflow: 'hidden',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 100,
  },
  flexItems: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  wfull: {
    width: '100%',
  },
  hfull: {
    width: '100%',
  },
  bgTransparent: {
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#FFF',
  },
  topSreen: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bottomSreen: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashView: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  topView: {
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  loginView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  inputView: {
    width: '95%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
  lowLoginView: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  profilView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
    marginHorizontal: 30
  },
  chooserView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  chooserImg: {
    width: 80,
    height: 80,
    margin: 15
  },
  splitter: {
    width: '95%',
    height: 1,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 15,
  },
  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textInput: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#000',
    textAlign: 'center',
  },
  logoTitle: {
    fontSize: 50
  },
  titlePreference: {
    fontSize: 20,
    marginBottom: 30,
    color: '#000',
    textAlign: 'center',
  },
  mediumTitle: {
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
  },
  smallTitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  button: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.customLightGreen,
    borderRadius: 45,
    marginTop: 10,
  },
  imageButton: {
    height: 35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  halfButton: {
    height: 40,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.customLightGreen,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  textButton: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  textImageButton: {
    color: 'black',
    width: '100%',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  profilInput: {
    width: '100%',
    height: 40,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'left',
    paddingHorizontal: 15,
    color: 'white',
  },
  error: {
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    width: '90%',
    alignItems: 'center',
    borderColor: 'black',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    marginLeft: 0,
  },
  dateInput: {
    position: 'absolute',
    marginLeft: 36,
    borderWidth: 0,
    left: 0,
  },
  buttonPassword: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 10,
    marginTop: 10,
  },
  logo: {
    width: '80%',
    height: 140,
  },
  headerLogo: {
    width: '60%',
    height: 120,
  },
  header: {
    backgroundColor: colors.customDarkGreen,
    justifyContent: 'space-around',
    paddingTop: 0,
    marginBottom: 'auto',
    height: Platform.select({
      android: 56,
      default: 44,
    }),
  },
  chooserImg: {
    width: 80,
    height: 80,
    margin: 15,
  },
  select: {
    height: 40,
    paddingHorizontal: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.customLightGreen,
    borderRadius: 10,
    marginTop: 10,
  },
  paramButton: {
    height: 40,
    paddingHorizontal: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.customLightGreen,
    borderRadius: 10,
    marginTop: 10,
  },
})
