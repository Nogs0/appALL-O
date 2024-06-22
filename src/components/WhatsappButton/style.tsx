import { StyleSheet } from "react-native";
import { blackDefault, greenWpp, whiteDefault } from "../../shared/styleConsts";
import WhatsappButton from ".";

export default StyleSheet.create({
    WhatsappButton: {
        marginTop: 3,
        fontSize: 14,
        color: whiteDefault,
        fontFamily: 'Rubik-Regular'
    },
    WhatsappContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: "5%",
        backgroundColor: greenWpp,
        alignItems: 'center',
        borderRadius: 50,
        height: '20%',
        width: "40%",
        right: 0,
        position: 'absolute'
    },

})