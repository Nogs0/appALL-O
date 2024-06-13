import { StyleSheet } from "react-native";
import { blueDefault } from "../../../../../shared/styleConsts";

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
    }
})