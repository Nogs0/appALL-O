import { StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault, whiteDefault } from "../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: orangeDefault,
        alignItems: 'center',
    },
    botao: {
        marginTop: 100,
        padding: 20,
        width: 300,
        height: 100,
        backgroundColor: whiteDefault,
        borderRadius: 20
    },
    botao2: {
        marginVertical: 20,
        padding: 5,
        width: 200,
        height: 40,
        backgroundColor: whiteDefault,
        borderRadius: 20
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
        color: blackDefault
    },
    text2: {
        fontSize: 20,
        textAlign: 'center',
        color: blackDefault
    }
})