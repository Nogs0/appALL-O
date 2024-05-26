import { StyleSheet } from "react-native";
import { greenDefault2, greyDefault, orangeDefault, whiteDefault } from "../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: orangeDefault,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: whiteDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    firstSection: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    secondSection: {
        flex: 0.15
    },
    thirdSection : {
        flex: 0.55
    },
    input: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: greyDefault
    },
    trocarSenha: {
        marginHorizontal: 70,
        backgroundColor: orangeDefault,
        alignItems: 'center',
        borderRadius: 10,
    },
    textTrocarSenha: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 20
    }
})