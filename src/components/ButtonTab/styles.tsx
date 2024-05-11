import { StyleSheet } from "react-native";
import { greyDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    containerOption: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: greyDefault,
        borderRadius: 20
    },
    option: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
    }
})