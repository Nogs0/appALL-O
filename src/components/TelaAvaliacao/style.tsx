import { StyleSheet } from "react-native";
import { blackDefault, blueDefault, greyDefault, greyLoadingDefault, greyLoadingDefault2, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    contentContainer: {
        backgroundColor: whiteDefault,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 45
    },
    titleContainer: {
        borderBottomWidth: 1,
        width: '100%',
        borderColor: greyLoadingDefault2,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 20,
        padding: 10,
        color: orangeDefault
    },
    message: {
        textAlign: 'justify',
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 16
    },
    buttonsContainer: {
        paddingVertical: 5,
        borderTopWidth: 1,
        borderColor: greyLoadingDefault2,
        width: '100%',
        alignItems: 'center',
    },
    buttonOk: {
        width: '50%',
        alignItems: 'center',
    },
    textButtonOk: {
        fontSize: 20,
        color: orangeDefault,
        fontFamily: 'Rubik-SemiBold'
    },
    descContainer: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textArea: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: greyDefault,
        width: '80%',
        height: '80%',
        color: blackDefault,
        fontFamily: 'Rubik-Light',
    },
})