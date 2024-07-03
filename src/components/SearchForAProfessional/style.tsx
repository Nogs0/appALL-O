import { Dimensions, StyleSheet } from "react-native";
import { blackDefault, greyDefault, orangeDefault, whiteDefault } from "../../shared/styleConsts";

const win = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingTop: 10,
        height: win.height > 710 ? 120 : 110,
        backgroundColor: whiteDefault
    },
    label: {
        left: 10,
        justifyContent: 'flex-start',
        fontSize: win.height > 710 ? 25 : 20,
        color: orangeDefault,
        fontFamily: 'Rubik-SemiBold',
    },
    containerSearch: {
        margin: '2%',
        height: '45%',
        backgroundColor: whiteDefault,
        borderWidth: 2,
        borderColor: greyDefault,
        borderRadius: 30,
        flexDirection: 'row',
    },
    iconSearch: {
        position: 'absolute',
        paddingTop: 10,
        paddingLeft: 15,
        color: blackDefault
    },
    search: {
        flex: 1,
        marginLeft: 35,
        color: blackDefault,
        fontFamily: 'Rubik-SemiBold'
    }
})