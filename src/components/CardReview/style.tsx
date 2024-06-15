import { StyleSheet } from "react-native";
import { blackDefault, greyDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    cardReview: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: greyDefault,
        padding: 15
    },
    imageContainer: {
        flex: 0.2
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    infoContainer: {
        flex: 0.8
    },
    nameClient: {
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold',
        textAlign: 'left',
        fontSize: 16
    },
    rateNote: {
        color: blackDefault,
        fontSize: 14
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        color: blackDefault,
        fontFamily: 'Rubik-Light',
    },
    imageReview: {
        width: 30,
        height: 30,
    },
    favoriteContainer: {
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})