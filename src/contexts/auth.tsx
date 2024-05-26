import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import api from '../services/api';
import * as auth from '../services/auth';
import { blueDefault, orangeDefault } from "../shared/styleConsts";
interface User {
    id: number, 
    name: string,
    email: string
}

interface AuthContextData {
    signed: boolean,
    user: User | null,
    isProfessional: boolean,
    signIn(professional: boolean): Promise<void>,
    signOut(): void,
    loading: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: any) {

    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User | null>(null);
    const [isProfessional, setIsProfessional] = useState<boolean>(false);
    const [defaultColor, setDefaultColor] = useState<string>(orangeDefault);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
            const storagedIsProfessional = await AsyncStorage.getItem('@RNAuth:isProfessional');
            let isprofessional = false;
            if (storagedUser && storagedToken && storagedIsProfessional) {
                setUser(JSON.parse(storagedUser));
                isprofessional = JSON.parse(storagedIsProfessional);
                setIsProfessional(isprofessional);
                api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
            }
            if (isprofessional)
                setDefaultColor(blueDefault);

            setLoading(false);
        }

        loadStorageData();
    });

    async function signIn(professional: boolean) {
        const response = await auth.signIn(professional);
        setUser(response.user);
        setToken(response.token);
        setIsProfessional(response.isProfessional);

        if (isProfessional)
            setDefaultColor(blueDefault);
        
        api.defaults.headers.Authorization = `Baerer ${response.token}`;

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@RNAuth:token', response.token);
        await AsyncStorage.setItem('@RNAuth:isProfessional', JSON.stringify(response.isProfessional));

    }

    async function signOut() {
        await AsyncStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{ signed: !!user, user, isProfessional, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used with in AuthProvider.');

    return context;
}

export { AuthProvider, useAuth };
