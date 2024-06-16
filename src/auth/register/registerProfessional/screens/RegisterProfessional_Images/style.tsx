import { StyleSheet } from "react-native";
import { blueDefault, whiteDefault, greyDefault } from "../../../../../shared/styleConsts";

export default StyleSheet.create({
    buttonAddImage: {
        backgroundColor: blueDefault,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5
    },
    textButtonAddImage: {
        color: whiteDefault,
        fontFamily: 'Rubik-SemiBold'
    },
    listContainer: {
        borderRadius: 10,
        borderColor: greyDefault,
        padding: 5,
        borderWidth: 3,
        height: 120,
        width: '100%'
    }
})