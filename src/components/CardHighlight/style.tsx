import { StyleSheet } from "react-native";
import { whiteDefault, blackDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    containerImage: {
        paddingRight: 10,
        flex: 0.9,
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameProfessional: {
        width: '80%',
        position: 'absolute',
        fontFamily: 'Rubik-Bold',
        color: whiteDefault,
        fontSize: 30,
        bottom: 0,
        left: 10,
        textShadowColor: blackDefault,
        textShadowRadius: 20,
        textShadowOffset: { width: 5, height: 5}
    },
    nameProfissao: {
        width: '80%',
        position: 'absolute',
        fontFamily: 'Rubik-Bold',
        color: whiteDefault,
        fontSize: 20,
        top: 0,
        left: 10,
        textShadowColor: blackDefault,
        textShadowRadius: 5,
        textShadowOffset: { width: 1, height: 1}
    },
    imageProfessional: {
        flex: 1,
        width: 320,
        height: 200,
        borderRadius: 15
    }
})