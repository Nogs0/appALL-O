import { StyleSheet } from "react-native";
import { blueDefault, orangeDefault, whiteDefault } from "../../../../shared/styleConsts";

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
    buttonOKClient: {
        width: '50%',
        marginTop: '10%',
        padding: '3%',
        backgroundColor: orangeDefault,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})