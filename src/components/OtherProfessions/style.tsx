import { StyleSheet } from "react-native";
import { orangeDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 25
    },
    row: {
        flexDirection: 'row'
    },
    label: {
        color: orangeDefault,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 18,
        justifyContent: 'flex-start'
    },
})