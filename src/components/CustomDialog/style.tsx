import { StyleSheet } from "react-native";
import { blackDefault, blueDefault, greyLoadingDefault, greyLoadingDefault2, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    contentContainer: {
        backgroundColor: whiteDefault,
        borderRadius: 50,
        height: 250,
        width: 300,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 45,
        elevation: 5
    },
    titleContainer: {
        borderBottomWidth: 1,
        width: '100%',
        borderColor: greyLoadingDefault2,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 20,
        padding: 10
    },
    message: {
        textAlign: 'justify',
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 16
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: greyLoadingDefault2,
        width: '100%',
        alignItems: 'center'
    },
    buttonCancel: {
        width: '50%',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: greyLoadingDefault2
    },
    buttonOk: {
        width: '50%',
        alignItems: 'center',
        borderLeftWidth: 0.5,
        borderColor: greyLoadingDefault2
    },
    textButtonCancel: {
        fontSize: 20,
        color: blueDefault,
        paddingVertical: 10,
        fontFamily: 'Rubik-SemiBold'
    },
    textButtonOk: {
        fontSize: 20,
        color: orangeDefault,
        paddingVertical: 10,
        fontFamily: 'Rubik-SemiBold'
    }
})