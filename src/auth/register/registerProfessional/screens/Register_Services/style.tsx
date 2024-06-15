import { StyleSheet } from "react-native";
import { blueDefault, whiteDefault } from "../../../../../shared/styleConsts";

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
        marginTop: '10%',
        padding: '3%',
        backgroundColor: blueDefault,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButtonCreateProfession: {
        fontFamily: 'Rubik-SemiBold',
        color: whiteDefault,
        fontSize: 14
    },
    createProfessionContainer: {
        position: 'absolute',
        width: '60%',
        bottom: '15%',
        padding: '5%',
        borderRadius: 30,
        backgroundColor: whiteDefault,
        alignItems: 'center',
        justifyContent: 'center',
    }
})