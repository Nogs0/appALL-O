import { StyleSheet } from "react-native";
import { blackDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    label: {
        left: 3,
        color: blackDefault,
        fontSize: 12,
        fontFamily: 'Rubik-Light'
    }
})