import { StyleSheet } from "react-native";
import { blackDefault, orangeDefault1, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 0.3,
        margin: 25
    },
    label: {
        color: blackDefault,
        fontSize: 18,
        fontFamily: 'Rubik-Regular',
        justifyContent: 'flex-start'
    },
    containerImage: {
        paddingRight: 10,
        flex: 0.9,
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameProfessional: {
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
    imageProfessional: {
        flex: 1,
        width: 340,
        height: 200,
        borderRadius: 15
    }
})