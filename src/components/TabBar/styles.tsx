import { StyleSheet } from "react-native";
import { orangeDefault1 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        height: '6%',
        backgroundColor: orangeDefault1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flex: 0.5,
        alignItems: 'center'
    }
})