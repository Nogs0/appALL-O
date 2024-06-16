import { StyleSheet } from "react-native";
import { orangeDefault, whiteDefault, greyDefault } from "../../../../../shared/styleConsts";

export default StyleSheet.create({
    buttonAddImage: {
        backgroundColor: orangeDefault,
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
    },
    profilePicture:{
        width: 70,
        height: 70,
        borderRadius: 50
    }
})