import { StyleSheet } from "react-native";
import { orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        backgroundColor: orangeDefault,
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    goBack: {
        position: 'absolute',
        zIndex: 1,
        left: 10
    },
    label: {
        textAlign: 'center',
        flex: 1,
        color: whiteDefault,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 32
    }
})