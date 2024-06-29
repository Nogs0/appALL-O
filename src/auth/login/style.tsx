import { StyleSheet } from "react-native";
import { whiteDefault, orangeDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingTop: '15%',
        backgroundColor: whiteDefault,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botaoTrocaLogin: {
        marginVertical: '7%',
        paddingHorizontal: 15,
        paddingVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    botaoAcao: {
        backgroundColor: orangeDefault,
        justifyContent: 'center',
        borderRadius: 10,
        width: '50%',
        height: 35
    },
    textTrocaLogin: {
        fontSize: 13,
        fontFamily: 'Rubik-Regular',
        color: whiteDefault,
    },
    textAcao:{
        fontSize: 16,
        fontFamily: 'Rubik-Regular',
        textAlign: 'center',
        color: whiteDefault
    },
    iconeTroca:{
        paddingHorizontal: 5,
        color: whiteDefault
    },
    inputsContainer: {
        width: '80%',
    },
    buttonsContainer: {
        width: '100%',
        height: '25%',
        alignItems: 'center',
    },
    signInContainer: {
        height: '50%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerContainer: {
        height: '40%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})