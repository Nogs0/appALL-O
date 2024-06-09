import { StyleSheet } from "react-native";
import { blackDefault, greyDefault2, orangeDefault, whiteDefault, orangeDefault4 } from "../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
    },
    botaoTrocaLogin: {
        marginTop: 40,
        width: 150,
        height: 30,
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    botaoAcao: {
        marginTop: 20,
        width: 190,
        height: 45,
        backgroundColor: 'orange',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 8
    },
    textTrocaLogin: {
        fontSize: 13,
        color: whiteDefault,
    },
    textAcao:{
        fontSize: 15,
        textAlign: 'center',
        color: whiteDefault
    },
    logo:{
        marginTop : 40,
        flex:1,
        alignItems:'center'
    },
    input:{
        marginVertical: 10,
        backgroundColor: greyDefault2,
        width: 295,
        height: 50,
    },
    iconeTroca:{
        paddingHorizontal: 5,
        color: whiteDefault
    }
})