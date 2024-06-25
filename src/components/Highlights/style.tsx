import { StyleSheet } from "react-native";
import { blackDefault, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 0.3,
        margin: 25
    },
    label: {
        color: orangeDefault,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 18,
        justifyContent: 'flex-start'
    }
})