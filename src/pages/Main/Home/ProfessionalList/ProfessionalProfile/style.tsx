import { StyleSheet } from "react-native";
import { greenDefault, greyDefault, orangeDefault, whiteDefault } from "../../../../../shared/styleConsts";

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
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'Rubik-SemiBold'
    },
    firstSection: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        marginHorizontal: 20,
        justifyContent: 'space-between',
    },
    thirdSection: {
        flex: 0.4,
    },
    fourthSection: {
        flex: 0.3,
    },
    doesntSendMessage: {
        color: greyDefault,
        textAlign: 'left',
        fontSize: 16
    }
})