import { StyleSheet } from "react-native";
import { blueDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    buttonOk: {
        width: '50%',
        marginTop: '10%',
        padding: '3%',
        backgroundColor: blueDefault,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButtonOk: {
        fontFamily: 'Rubik-SemiBold',
        color: whiteDefault,
        fontSize: 20
    },
    title: {
        paddingTop: '2%',
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 24,
        fontFamily: 'Rubik-SemiBold',
        textAlign: 'center'
    },
    text: {
        paddingTop: '2%',
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 20,
        fontFamily: 'Rubik-Light',
        textAlign: 'center'
    },
    defaultContentContainer: {
        position: 'absolute',
        width: '100%',
        top: '25%',
        padding: '5%',
        borderRadius: 30,
        backgroundColor: whiteDefault,
        alignItems: 'center',
        justifyContent: 'center',
    },
})