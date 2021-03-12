import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bdy:{
        flex:1,
    },
    container:{  
        flex:1,
        marginTop:20,
        marginHorizontal:25
    },
    imgContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bgBlue:{
        backgroundColor: 'rgb(63, 81, 181)',
        padding: 28,
        borderWidth: 0.8,
        borderRadius: 5,
    },
    img:{
        width:18,
        height:18
    },
    
    imgTicket:{
        width:80,
        height:80
    },
    
    imgView:{
        minWidth: 80,
        minHeight: 80,
        borderWidth: 0.8,
        borderRadius: 5,
    },
    bg:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:5
    },
    add: {
        width: 150,
        height: 40,
        backgroundColor: 'rgb(63, 81, 181)'
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