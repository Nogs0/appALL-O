import { StyleSheet } from "react-native";
import { greenDefault, greyDefault, orangeDefault1, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: orangeDefault1
    },
    contentContainer: {
        flex: 1,
        backgroundColor: whiteDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    nameProfessional: {
        color: orangeDefault1,
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'Rubik-SemiBold'
    },
    firstSection: {
        flex: 0.3,
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    secondSection: {
        flex: 0.4,
    },
    thirdSection: {
        flex: 0.3,
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: greyDefault
    },
    doesntSendMessage: {
        color: greyDefault,
        textAlign: 'left',
        fontSize: 16
    }
})