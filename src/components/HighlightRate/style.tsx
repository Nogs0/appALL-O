import { StyleSheet } from "react-native";
import { blackDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rateContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
    },
    imageContainer: {
        flex: 0.2,
    },
    image: {
        position: 'absolute',
        left: '50%',
        top: '10%',
        width: 60,
        height: 60,
        borderRadius: 50
    },
    infoContainer: {
        flex: 0.8,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        paddingLeft: 40,
        paddingVertical: 5,
        flexDirection: 'row'
    },
    avaliacao: {
        width: '80%',
        height: '100%'
    },
    name: {
        color: blackDefault,
        fontSize: 20,
        fontFamily: 'Rubik-SemiBold'
    },
    rateNote: {
        color: whiteDefault,
        fontFamily: 'Rubik-LightItalic'
    },
    rateStars: {
        width: '20%',
        alignItems: 'center',
    }
})