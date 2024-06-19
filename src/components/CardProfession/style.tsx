import { StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        width: '33.333333333333%',
        height: '100%',
    },
    informationContainer: {
        alignItems: 'center',
        marginTop: 7,
        marginHorizontal: 5,
        backgroundColor: whiteDefault,
        borderRadius: 15,
        padding: 10,
        borderWidth: 2,
        borderColor: greyDefault,
    },
    professionName: {
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold'
    }
})