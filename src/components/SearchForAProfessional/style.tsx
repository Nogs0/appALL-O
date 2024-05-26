import { StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 0.15,
        backgroundColor: whiteDefault
    },
    label: {
        left: 10,
        color: blackDefault,
        justifyContent: 'flex-start',
        fontSize: 25,
        fontFamily: 'Rubik-Light'
    },
    containerSearch: {
        margin: '2%',
        height: '45%',
        backgroundColor: greyDefault,
        borderRadius: 30,
        flexDirection: 'row',
    },
    iconSearch: {
        position: 'absolute',
        paddingTop: 13,
        paddingLeft: 15
    },
    search: {
        flex: 1,
        marginLeft: 35,
    }
})