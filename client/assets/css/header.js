import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    horizontalList:{  
        flex:1,
        flexDirection: 'row',
        // alignItems: 'center',
        width: '150%',
        justifyContent: 'center',
        marginBottom:110,
        // position: 'relative',
        // left: 10,
    },
    button: {
        marginLeft: -15
    },
    leftButtons: {
        marginLeft: -10
    },
    leftHorizontalList: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:20,
        position: 'relative',
        left: 20,
    },
    circle: {
        zIndex: 999,
        position: 'relative',
        top: 20,
        width: 100,
        height: 100,
        borderWidth: 0.5,
        borderRadius: 100/2,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent:'center',
        alignItems: 'center',
    },
    textWhite: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 15,
    },
    
    titleContainer:{
        borderColor: '#fff',
        top:-20,
        justifyContent:"center",
        alignItems:"center"
    }
  });