import { StyleSheet } from "react-native";
import { greyDefault, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: whiteDefault,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 5,
    },
    menuContainer: {
        marginLeft: '5%',
        width: '15%',
    },
    perfilContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '75%',
    },
    imgPerfil: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: '5%'
    }
})