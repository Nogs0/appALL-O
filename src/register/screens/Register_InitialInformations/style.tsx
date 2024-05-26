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
    },
    text: {
        paddingTop: '4%',
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 18,
        textAlign: 'center'
    },
    buttonNext: {
        marginTop: '10%',
        padding: '3%',
        backgroundColor: blueDefault,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButtonNext: {
        fontFamily: 'Rubik-SemiBold',
        color: whiteDefault
    }
})