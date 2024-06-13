import { StyleSheet } from "react-native";
import { whiteDefault } from "../../../../../shared/styleConsts";

export default StyleSheet.create({
    loadingCEP: {
        position: 'absolute',
        zIndex: 10,
        top: '50%'
    },
    scrollViewDefaultContentContainer: {
        position: 'absolute',
        top: '25%',
        width: '80%',
        height: '70%',
        padding: '5%',
        borderRadius: 30,
        backgroundColor: whiteDefault,
    },
})