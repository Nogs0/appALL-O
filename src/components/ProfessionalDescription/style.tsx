import { StyleSheet } from "react-native";
import { blackDefault, orangeDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        marginVertical: 20 
    },
    name: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 18
    },
    description : {
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold',
        textAlign: 'justify',
    }
})