import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { api_url } from "../services/config-dev";
import OneSignal from "react-native-onesignal";

interface AuthInput {
    login: string,
    senha: string,
    oneSignalId?: string
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

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadStorageData()
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                console.log('ERRO AUTH')
            })
    }, []);

    const loadStorageData = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            AsyncStorage.getItem('@RNAuth:user')
                .then((storagedUser) => {
                    AsyncStorage.getItem('@RNAuth:token')
                        .then((storagedToken) => {
                            AsyncStorage.getItem('@RNAuth:isProfessional')
                                .then((storagedIsProfessional) => {
                                    if (storagedUser && storagedToken && storagedIsProfessional) {
                                        setIsProfessional(JSON.parse(storagedIsProfessional));
                                        setToken(storagedToken)
                                        setUser(JSON.parse(storagedUser));
                                        resolve()   
                                    }
                                    setLoading(false);

                                }).catch((e) => console.log(e));
                        }).catch((e) => console.log(e));
                }).catch((e) => console.log(e));
        })
    }

    function signIn(input: AuthInput): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fetch(`${api_url}auth/login`, {
                method: 'POST',
                body: JSON.stringify(input),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.code) {
                        reject();
                        return;
                    }

                    setIsProfessional(json.role == "PROVEDOR")
                    setToken(json.token);
                    setUser({ name: json.nome, id: json.id });

                    AsyncStorage.setItem('@RNAuth:user', JSON.stringify({ name: json.nome, id: json.id }))
                        .then(() => {
                            AsyncStorage.setItem('@RNAuth:token', json.token)
                                .then(() => {
                                    AsyncStorage.setItem('@RNAuth:isProfessional', JSON.stringify(json.role == "PROVEDOR"))
                                        .then(() => {
                                            resolve();
                                        });
                                });
                        });
                })
                .catch((e) => {
                    console.log('ERRO AUTH SIGNIN--->', e);
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
