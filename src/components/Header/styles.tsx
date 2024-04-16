import { StyleSheet } from "react-native";
import { greyDefault, orangeDefault1, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: whiteDefault,
        justifyContent: 'space-between',
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
        height: '100%',
        width: '10%',
        borderRadius: 100,
        marginRight: '5%'
    }
})