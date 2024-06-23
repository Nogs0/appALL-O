import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import api, { verbosAPI } from '../services/api';
import { blueDefault, orangeDefault } from "../shared/styleConsts";
import { useRegisterProfessional } from "./registerProfessional";
import ALLORequestBase from "../services/api";
import { api_url } from "../services/config-dev";
import { UsuarioRole } from "../shared/Enums/enums";

interface AuthInput {
    login: string,
    senha: string
}

interface User {
    id: number,
    name: string
}

interface AuthContextData {
    signed: boolean,
    token: string,
    user: User | null,
    isProfessional: boolean,
    signIn(input: AuthInput): Promise<void>,
    signOut(): void,
    register(professional: boolean): void,
    loading: boolean,
    isRegister: boolean,
    endRegister(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: any) {

    const [token, setToken] = useState<any>();
    const [user, setUser] = useState<User | null>(null);
    const [isProfessional, setIsProfessional] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [defaultColor, setDefaultColor] = useState<string>(orangeDefault);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
            const storagedIsProfessional = await AsyncStorage.getItem('@RNAuth:isProfessional');

            let isprofessional = false;
            console.log(storagedToken)

            if (storagedUser && storagedToken && storagedIsProfessional) {
                setUser(JSON.parse(storagedUser));
                isprofessional = JSON.parse(storagedIsProfessional);
                setIsProfessional(isprofessional);
                setToken(storagedToken)
            }
            if (isprofessional)
                setDefaultColor(blueDefault);

            setLoading(false);
        }

        loadStorageData();
    }, []);

    function signIn(input: AuthInput): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fetch(`${api_url}auth/login`, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then((response) => response.json())
                .then(async (json) => {
                    if (json.code){
                        reject();
                        return;
                    }

                    setUser({ name: json.nome, id: json.id });
                    setToken(json.token);
                    setIsProfessional(json.role == "PROVEDOR")
                    
                    if (json.role == UsuarioRole.PROVEDOR)
                        setDefaultColor(blueDefault);

                    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify({ name: json.nome, id: json.id }));
                    await AsyncStorage.setItem('@RNAuth:token', json.token);
                    await AsyncStorage.setItem('@RNAuth:isProfessional', JSON.stringify(json.role == "PROVEDOR"));
                    resolve();
                })
                .catch((e) => {
                    console.log('ERRO --->', e);
                    reject(e);
                })
        })
    }

    async function signOut() {
        await AsyncStorage.clear();
        setUser(null);
    }

    async function register(professional: boolean) {
        setIsRegister(true);
        setIsProfessional(professional);
    }

    function endRegister() {
        setIsRegister(false);
        setIsProfessional(false);
    }

    return (
        <AuthContext.Provider
            value={{ signed: !!user, user, isProfessional, signIn, signOut, register, loading, isRegister, endRegister, token }}>
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
