import { StyleSheet } from "react-native";
import { orangeDefault1, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        backgroundColor: whiteDefault,
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBack: {
        position: 'absolute',
        zIndex: 1,
        left: 10
    },
    label: {
        textAlign: 'center',
        flex: 1,
        color: orangeDefault1,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 32
    }

})