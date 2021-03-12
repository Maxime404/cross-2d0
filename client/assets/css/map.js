import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    bdy:{  
        flex:1,
    },
    container:{  
        flex:1,
        marginTop: 55
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    tinyLogo: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    markView: {
        borderWidth: 3,
        borderRadius: 100,
        borderColor: '#fff'
    },
    reset: {
        width: 150,
        height: 40,
        borderWidth: 0.2,
        borderColor: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    calloutButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        height:40,
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 0.2,
        borderColor: 'rgb(63, 81, 181)',
        alignItems: 'center',
        margin: 5,
        alignSelf: 'center'
    },
  });