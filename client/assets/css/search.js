import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    bdy:{
        flex:1,
    },
    container:{  
        flex:1,
        marginTop:70,
        marginHorizontal:25
    },
    distanceView: {
        marginVertical: 30,
    },
    cont: {
        marginTop: 10,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
    },
    filters: {
        alignItems: 'center'
    },
    check: {
        backgroundColor: 'red'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:5
    },
    search: {
        width: 150,
        height: 40,
        backgroundColor: 'rgb(63, 81, 181)',
    },
    reset: {
        width: 150,
        height: 40,
        borderWidth: 0.2,
        borderColor: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    resetLabel: {
        color: 'rgb(63, 81, 181)',
    }
  });