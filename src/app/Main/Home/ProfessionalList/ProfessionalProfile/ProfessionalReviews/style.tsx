import { StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault, whiteDefault } from "../../../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: whiteDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    nameProfessional: {
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'Rubik-SemiBold'
    },
    cardReview : {
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
    rateNote:{
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
    listContainer: {
        flex: 0.8
    },
    imageReview: {
        width: 30,
        height: 30,
    }
})