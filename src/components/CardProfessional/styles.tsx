import { StyleSheet } from "react-native";
import { greenDefault, greenDefault2, greyDefault, orangeDefault3 } from "../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 15,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: greyDefault,
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    contentContainer: {
        flex: 0.9,
        flexDirection: 'row'
    },
    imageContainer: {
        flex: 0.3,
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    informationContainer: {
        flex: 0.7,
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    nameProfessional: {
        fontFamily: 'Rubik-Bold',
        color: 'black',
    },
    info: {
        fontFamily: 'Rubik-Bold',
        color: 'black',
        alignContent: 'center',
        fontSize: 10
    },
    infoObs: {
        fontFamily: 'Rubik-Bold',
        color: greenDefault,
        textAlign: 'center',
        fontSize: 10,
        backgroundColor: greenDefault2,
        borderRadius: 10,
        width: '70%'
    },
    favoriteContainer: {
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    status: {
        color: 'black',
        marginBottom: 15
    },
    information: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Rubik-Regular'
    },
    tapTo: {
        fontSize: 12,
        color: 'black'
    }
})