import { StyleSheet } from "react-native";
import { orangeDefault3 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 15,
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        elevation: 5,
        width: '95%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: orangeDefault3,
    },
    imageContainer: {
        flex: 0.3,
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    nameProvider: {
        fontFamily: 'Rubik-Bold',
        color: 'black',
        alignContent: 'center'
    },
    timeDistance: {
        fontFamily: 'Rubik-Bold',
        color: 'black',
        alignContent: 'center',
        fontSize: 10
    },
    informationContainer: {
        flex: 0.7,
        alignItems: 'flex-end',
    },
    status: {
        color: 'black',
        marginBottom: 15
    },
    information: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Rubik-Regular'
    },
    tapTo: {
        fontSize: 12,
        color: 'black'
    }
})