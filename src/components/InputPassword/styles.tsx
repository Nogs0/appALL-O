import { StyleSheet } from "react-native";
import { blackDefault, greyDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    input: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: '2.5%',
        borderRadius: 5,
        backgroundColor: greyDefault,
        elevation: 3,
        alignItems: 'center'
    },
    textInput: {
        color: blackDefault,
        flex: 1
    },
    eye: {
        marginRight: 10
    }
})