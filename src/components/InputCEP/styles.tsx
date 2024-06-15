import { StyleSheet } from "react-native";
import { blackDefault, blueDefault, greyDefault, orangeDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: whiteDefault,
        marginVertical: '2.5%',
    },
    textInput: {
        borderRadius: 5,
        backgroundColor: greyDefault,
        elevation: 3,
        color: blackDefault,
        flex: 1
    },
    buttonSearchContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
    },
    buttonSearch: {
        backgroundColor: blueDefault,
        borderRadius: 50
    },
    buttonSearchClient: {
        backgroundColor: orangeDefault,
        borderRadius: 50
    }
})