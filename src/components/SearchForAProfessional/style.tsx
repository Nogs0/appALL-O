import { StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingTop: 10,
        flex: 0.15
    },
    label: {
        left: 10,
        justifyContent: 'flex-start',
        fontSize: 25,
        color: orangeDefault,
        fontFamily: 'Rubik-SemiBold',
    },
    containerSearch: {
        margin: '2%',
        height: '45%',
        backgroundColor: whiteDefault,
        borderWidth: 2,
        borderColor: greyDefault,
        borderRadius: 30,
        flexDirection: 'row',
    },
    iconSearch: {
        position: 'absolute',
        paddingTop: 10,
        paddingLeft: 15,
        color: blackDefault
    },
    search: {
        flex: 1,
        marginLeft: 35,
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold'
    }
})