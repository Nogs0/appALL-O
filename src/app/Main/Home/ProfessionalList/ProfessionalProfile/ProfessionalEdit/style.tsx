import { StyleSheet } from "react-native";
import { blueDefault, greyDefault, whiteDefault } from "../../../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: blueDefault
    },
    contentContainer: {
        flex: 1,
        backgroundColor: whiteDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100, 
        height: 100,
        borderRadius: 50,
        marginTop: '5%'
    },
    inputsContainer: {
        width: '90%',
        height: '30%',
        padding: '5%'
    },
    inputsContainerAddress: {
        position: 'absolute',
        top: '25%',
        width: '90%',
        height: 350,
        marginTop: '10%',
        paddingHorizontal: '5%'
    },
    buttonUpdate: {
        backgroundColor: blueDefault,
        width: '70%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '10%'
    },
    tabsContainer: {
        position: 'absolute',
        top: '20%',
        width: '100%',
        height: '10%',
        backgroundColor: whiteDefault,
        borderBottomColor: blueDefault,
        borderBottomWidth: 5,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tab: {
        paddingHorizontal: 30,
        justifyContent: 'center'
    }
})