import { StyleSheet } from "react-native";
import { whiteDefault, orangeDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
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
        width: 190,
        height: 45,
        backgroundColor: orangeDefault,
        justifyContent: 'center',
        borderRadius: 10
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
        height: 120
    },
    buttonsContainer: {
        marginTop: '10%',
        width: '80%',
        height: 200,
        alignItems: 'center'
    },
    signInContainer: {
        alignItems: 'center'
    },
    registerContainer: {
        marginTop: '30%',
        alignItems: 'center'
    }
})