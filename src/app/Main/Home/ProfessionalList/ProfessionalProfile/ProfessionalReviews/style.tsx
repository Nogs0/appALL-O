import { StyleSheet } from "react-native";
import { greyLoadingDefault, whiteDefault } from "../../../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        backgroundColor: whiteDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    nameProfessional: {
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 32,
        fontFamily: 'Rubik-SemiBold'
    },
    listContainer: {
        flex: 0.8
    },
    loadingUpdate: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: greyLoadingDefault 
    }
})