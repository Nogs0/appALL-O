import { StyleSheet } from "react-native";
import { orangeDefault1, whiteDefault } from "../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: whiteDefault,
        alignItems: 'center',
    },
    listPage: {
        width: '100%',
        alignItems: 'center',
        height: '93%',
    },
    list: {
        width: '100%',
        paddingHorizontal: 10,
    }
})