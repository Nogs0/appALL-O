import { StyleSheet } from "react-native";
import { orangeDefault3, whiteDefault } from "../../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteDefault
    },
    headerContainer: {
        flex: 0.3,
        backgroundColor: orangeDefault3,
        borderBottomWidth: 3,
        borderBottomColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageHeader: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    nameText: {
        fontFamily: 'Rubik-Bold',
        color: 'black',
        fontSize: 24
    },
    professionText: {
        fontFamily: 'Rubik-Bold',
        color: 'black',
        fontSize: 20
    },
    infoContainer: {
        flex: 0.3
    },
    imagesContainer: {
        flex: 0.3
    }
})