import { StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault, whiteDefault } from "../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
    },
    botao: {
        marginVertical: 100,
        padding: 20,
        width: 300,
        height: 100,
        backgroundColor: whiteDefault,
        borderRadius: 20
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
        color: blackDefault
    },
    logo:{
        marginTop : 40,
        flex:1,
        alignItems:'center'
    }
})