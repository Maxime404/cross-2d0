import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{  
        flex:1,
        alignItems: 'center',
        marginTop:50
    },
    roundedFull: {
        borderRadius: 100/2,
    },
    filters: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginLeft: -10,
    },
    filterText: {
        marginLeft: -35
    },
    dialogHead: {
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:'rgb(63, 81, 181)'
    },
    titleContainer: {
        width:'80%', 
        backgroundColor: 'transparent'
    },
    white: {
        color: '#fff'
    }
  });