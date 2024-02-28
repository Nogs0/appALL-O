import { StyleSheet } from "react-native";
import { whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: whiteDefault,
    },
    titleServices: {
        marginTop: 15,
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