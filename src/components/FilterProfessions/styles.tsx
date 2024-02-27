import { StyleSheet } from "react-native";
import { greyDefault, orangeDefault2 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        height: '6%',
        flexDirection: 'row',
        backgroundColor: orangeDefault2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerOption: {
        width: '33.34%',
        height: '100%',
        borderBottomWidth: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    option: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 22,
        height: 30,
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
    }
})