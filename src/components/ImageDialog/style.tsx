import { StyleSheet } from "react-native";
import { backgroundDialogDefault, greyDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        backgroundColor: backgroundDialogDefault
    },
    contentContainer: {
        borderRadius: 30,
        backgroundColor: whiteDefault,
        width: '90%',
        height: '90%'
    },
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: greyDefault,
        width: '5%'
    },
    imageContainer: {
        padding: '2%',
        width: '95%',
        maxHeight: '100%',
        maxWidth: '100%'
    }
})