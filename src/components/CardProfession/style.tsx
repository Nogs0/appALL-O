import { StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        width: '30%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: greyDefault,
        marginHorizontal: '1%',
        marginVertical: '1%',
        padding: '2%',
    },
    informationContainer: {
        alignItems: 'center',
    },
    professionName: {
        fontSize: 10,
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold'
    }
})