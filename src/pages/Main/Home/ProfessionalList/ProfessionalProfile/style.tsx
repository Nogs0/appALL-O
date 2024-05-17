import { StyleSheet } from "react-native";
import { greenDefault, greyDefault, orangeDefault1, whiteDefault } from "../../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: orangeDefault1,
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
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        marginHorizontal: 20
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        right: '15%'
    },
    secondSection: {
        flex: 0.4,
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    thirdSection: {
        flex: 0.3,
    },
    fourthSection: {
        flex: 0.2,
    },
    doesntSendMessage: {
        color: greyDefault,
        textAlign: 'left',
        fontSize: 16
    }
})