import { StyleSheet } from "react-native";
import { blackDefault, orangeDefault1, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 0.5,
    },
    rateContent: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end'
    },
    imageContainer: {
        flex: 0.2,
    },
    image: {
        position: 'absolute',
        left: '50%',
        top: '15%',
        width: 80,
        height: 80,
        borderRadius: 50
    },
    infoContainer: {
        flex: 0.8,
        backgroundColor: orangeDefault1,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        paddingLeft: 50,
        paddingVertical: 10,
        flexDirection: 'row'
    },
    rate: {
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