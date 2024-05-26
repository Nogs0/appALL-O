import { StyleSheet } from "react-native";
import { orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        backgroundColor: whiteDefault,
        marginBottom: 5
    },
    titleServices: {
        marginTop: 10,
        marginLeft: 15,
        color: 'black',
        fontSize: 24,
        fontFamily: 'Rubik-Bold'
    },
    listPage: {
        width: '100%',
        alignItems: 'center',
    },
    list: {
        width: '100%',
    }
})