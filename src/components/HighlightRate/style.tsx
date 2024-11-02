import { StyleSheet } from "react-native";
import { blackDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    rateContent: {
    },
    infoContainer: {
        width: '80%',
        height: '80%',
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        paddingVertical: 5,
        flexDirection: 'row'
    },
    avaliacao: {
        paddingHorizontal: 10,
        width: '80%'
    },
    name: {
        color: blackDefault,
        fontSize: 16,
        fontFamily: 'Rubik-SemiBold'
    },
    rateNote: {
        textAlign: 'left',
        color: whiteDefault,
        fontFamily: 'Rubik-LightItalic',
        width: '90%',
        fontSize: 14,
    },
    rateStars: {
        width: '20%',
        alignItems: 'center',
    }
})