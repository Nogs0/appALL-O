import { StyleSheet } from "react-native";
import { blueDefault, whiteDefault } from "../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    contentContainer: {
        position: 'absolute',
        width: '80%',
        top: '25%',
        padding: '5%',
        borderRadius: 30,
        backgroundColor: whiteDefault,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        paddingTop: '2%',
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 18,
        textAlign: 'center'
    },
    addProfessionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonAddContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
    },
    buttonAdd: {
        backgroundColor: blueDefault,
        borderRadius: 50,
    },
    buttonNext: {
        width: '100%',
        marginTop: '10%',
        padding: '3%',
        backgroundColor: blueDefault,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButtonNext: {
        fontFamily: 'Rubik-SemiBold',
        color: whiteDefault,
        fontSize: 14
    }
})