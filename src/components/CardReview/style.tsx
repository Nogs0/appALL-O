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
    infoContainer: {
        flex: 1
    },
    nameClient: {
        color: blackDefault,
        fontFamily: 'Rubik-SemiBoldItalic',
        textAlign: 'left',
        fontSize: 16,
    },
    rateNote: {
        color: blackDefault,
        fontSize: 14
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    favoriteContainer: {
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})