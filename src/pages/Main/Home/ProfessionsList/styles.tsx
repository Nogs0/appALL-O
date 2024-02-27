import { StyleSheet } from "react-native";
import { whiteDefault } from "../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: whiteDefault,
    },
    listPage: {
        width: '100%',
        height: 100,
        alignItems: 'center',
    },
    list: {
        width: '100%',
    },
    titleServices: {
        marginTop: 15,
        marginLeft: 15,
        color: 'black',
        fontSize: 24,
        fontFamily: 'Rubik-Bold'
    }
})