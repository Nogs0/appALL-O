import { StyleSheet } from "react-native";
import { blackDefault, orangeDefault1 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        marginVertical: 20 
    },
    name: {
        color: orangeDefault1,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 18
    },
    description : {
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold',
        textAlign: 'justify',
    }
})