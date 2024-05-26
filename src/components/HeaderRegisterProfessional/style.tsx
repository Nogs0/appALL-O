import { StyleSheet } from "react-native";
import { blueDefault, whiteDefault } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        height: '40%',
        width: '100%',
        flexDirection: 'row',
        paddingTop: '10%',
        backgroundColor: blueDefault,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
        justifyContent: 'center',
    },
    label: {
        fontFamily: 'Rubik-SemiBold',
        fontSize: 50,
        color: whiteDefault
    },
    goBack: {
        top: '20%',
        left: '5%',
        position: 'absolute'
    }
})