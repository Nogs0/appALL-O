import { StyleSheet } from "react-native";
import { blackDefault, greyDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        width: '35%',
        height: '100%',
    },
    informationContainer: {
        alignItems: 'center',
        marginTop: 7,
        marginHorizontal: 5,
        backgroundColor: greyDefault,
        borderRadius: 15,
        padding: 10
    },
    professionName: {
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold'
    }
})