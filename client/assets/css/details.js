import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    bdy:{  
        flex:1,
    },
    container:{  
        flex:1,
        marginTop:55
    },
    blankText:{
        color: '#fff',
    },
    detailsContainer: {
        marginVertical: 10,
        marginHorizontal:20
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    italic: {
        fontStyle: 'italic',
    },
    bold: {
        fontWeight: 'bold',
    },
    titleContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    title: {
        fontWeight: 'bold'
    },
    descContainer: {
        marginVertical: 5,
    },
    mapContainer: {
        flex: 1,
        marginBottom: 10
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    slider: {
        flex:1,
        zIndex: 1,
    },
    buttonContainer: {
        marginBottom: 20,
        marginHorizontal: 20
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