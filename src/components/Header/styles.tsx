import { StyleSheet } from "react-native";
import { greyDefault, orangeDefault1 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: orangeDefault1,
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,
    },
    menuContainer: {
        width: '20%',
    },
    perfilContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
    },
    name: {
        fontSize: 20,
        width: '70%',
        textAlign: 'center',
        fontFamily: 'Rubik-Regular',
    },
    imgPerfil: {
        height: '90%',
        width: '25%',
        borderRadius: 100
    }
})