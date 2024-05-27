import { StyleSheet } from "react-native";
import { blueDefault, whiteDefault } from "../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        marginHorizontal: '10%',
        borderRadius: 30,
        backgroundColor: whiteDefault,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        width: '100%',
        padding: '6%',
        justifyContent: 'space-between',
    }
})