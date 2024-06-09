import { StyleSheet } from "react-native";
import { blackDefault, greyDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    input: {
        borderRadius: 5,
        backgroundColor: greyDefault,
        elevation: 3,
        marginVertical: '2.5%',
        color: blackDefault,
        flex: 1,
        borderWidth: 1,
        borderColor: greyDefault,
    },
    textInput: {
        color: blackDefault,
        flex: 1
    }
})