import { StyleSheet } from "react-native";
import { blueDefault, redDefault, whiteDefault } from "../../../../../shared/styleConsts";

export default StyleSheet.create({
    addProfessionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonAddContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
    },
    buttonAdd: {
        backgroundColor: blueDefault,
        borderRadius: 50,
    },
    buttonCreateProfession: {
        width: '100%',
        marginTop: '5%',
        alignItems: 'center',
    },
    textButtonCreateProfession: {
        color: redDefault,
        fontFamily: 'Rubik-SemiBold',
        fontSize: 14,
    },
})