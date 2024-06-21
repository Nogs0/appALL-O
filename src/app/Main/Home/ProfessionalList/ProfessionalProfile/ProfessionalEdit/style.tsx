import { StyleSheet } from "react-native";
import { blackDefault, blueDefault, greyDefault, greyLoadingDefault, whiteDefault } from "../../../../../../shared/styleConsts";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: blueDefault,
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
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 50,
    },
    hasImage: {
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 55, 
        borderWidth: 5, 
        borderColor: blueDefault,
        width: 160,
        height: 160,
    },
    loadingImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        backgroundColor: greyLoadingDefault,
        position: 'absolute',
        zIndex: 1
    },
    imageContainerFlatList: {
        // flexBasis: 0,
        flexGrow: 1
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    imageFlatList: {
        width: 130,
        height: 130,
    },
    noImage: {
        width: 150,
        height: 150,
        backgroundColor: greyDefault,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    inputsContainer: {
        marginTop: '5%'
    },
    inputsContainerAddress: {
        position: 'absolute',
        top: '15%',
        width: '90%',
        height: '70%',
        paddingHorizontal: '5%',
    },
    inputsContainerInformations: {
        top: '14%',
        width: '90%',
        height: '71%',
        paddingHorizontal: '5%',
        position: 'absolute'
    },
    buttonUpdate: {
        backgroundColor: blueDefault,
        width: '70%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: '5%',
    },
    buttonAddImage: {
        backgroundColor: blueDefault,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom: '5%',
        height: 70,
        width: 70
    },
    imageGridContainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabsContainer: {
        width: '100%',
        height: 70,
        backgroundColor: whiteDefault,
        borderBottomColor: blueDefault,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    tab: {
        borderRadius: 50,
        paddingHorizontal: '5%',
        justifyContent: 'center'
    },
    loadingUpdate: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: greyLoadingDefault 
    },
    loadingCEP: {
        position: 'absolute',
        zIndex: 10,
        top: '30%',
        left: '40%'
    },
    textArea: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: greyDefault,
        width: '100%',
        color: blackDefault,
        fontFamily: 'Rubik-Light'
    }
})