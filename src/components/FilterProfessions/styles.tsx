import { StyleSheet } from "react-native";
import { greyDefault, orangeDefault2, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 0.05,
        paddingHorizontal: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: whiteDefault,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})