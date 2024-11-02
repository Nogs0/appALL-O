import { Dimensions, StyleSheet } from "react-native";
import { whiteDefault, blackDefault } from "../../shared/styleConsts";

const win = Dimensions.get('window');

export default StyleSheet.create({
    containerImage: {
        paddingRight: 10,
        flex: 1,
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
        fontSize: 20,
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
        fontSize: 16,
        top: 0,
        left: 10,
        textShadowColor: blackDefault,
        textShadowRadius: 5,
        textShadowOffset: { width: 1, height: 1}
    },
    imageProfessional: {
        flex: 1,
        width: win.width - win.width * 0.25,
        height: win.height > 710 ? win.height * 0.3 : win.height * 0.15,
        borderRadius: 15
    }
})