import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth";
import { createClient } from "./api_client";

interface Endereco {
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    logradouro: string,
    numero: string
}

interface InitialInformations {
    nome: string,
    email: string,
    senha: string,
}

export interface ClienteInput {
    id: number | undefined,
    senha: string,
    email: string,
    telefone: string,
    cpfCnpj: string,
    nome: string
    endereco: Endereco,
    imagem: string
}

interface RegisterClientContextData {
    client: ClienteInput | null,
    loading: boolean,
    setInitialInformations(params: InitialInformations): void,
    setAddress(address: Endereco): void,
    setContacts(phoneNumber: string): void,
    setProfilePic(profilePic: any): void,
    endingRegister(): Promise<string>,
    clearClient(): void
}

const RegisterClientContext = createContext<RegisterClientContextData>({} as RegisterClientContextData)

function RegisterClientProvider({ children }: any) {
    const { endRegister } = useAuth();

    const [client, setClient] = useState<ClienteInput | null>({
        id: 0,
        email: 'exemploMatheus@org.com',
        senha: '',
        telefone: '33978890000',
        cpfCnpj: '869.039.770-15',
        nome: 'matheus o homem',
        endereco:{
            cep: '37714660',
            estado: '',
            cidade: '',
            bairro: '',
            logradouro: '',
            numero: ''
        },
        imagem: 'string'
        
    });
    const [loading, setLoading] = useState<boolean>(false);

    function setInitialInformations(params: InitialInformations) {
        setClient((prev) => {
            if (!prev)
                prev = {} as ClienteInput;
            prev.email = params.email;
            prev.nome = params.nome;
            prev.senha = params.senha
            return prev;
        });
    }


    function setAddress(endereco: Endereco) {
        setClient((prev) => {
            if (!prev) prev = {} as ClienteInput;
            return { ...prev, endereco };
        });
    }

    function setContacts(phoneNumber: string) {
        setClient((prev) => {
            if (!prev) prev = {} as ClienteInput;
            return { ...prev, phoneNumber };
        });
    }

    function setProfilePic(profilePic: any) {
        setClient((prev) => {
            if (!prev) prev = {} as ClienteInput;
            return { ...prev, profilePic };
        });
    }

    function endingRegister(): Promise<string> {
        setLoading(true);
        return new Promise<string>((resolve, reject) => {
            if (client){
                console.log(client);
                
                createClient(client).then(() => {
                    resolve("AAAAAAAAAAAAAAA");
                })
                .catch(() => {
                    reject()
                });
                setLoading(false);
            }
            else{
                reject(client);
            }
           
        });
    }

    function clearClient(): void {
        setClient({
            id: undefined,
            email: '',
            senha: '',
            telefone: '',
            cpfCnpj: '',
            nome: '',
            endereco:{
                cep: '',
                estado: '',
                cidade: '',
                bairro: '',
                logradouro: '',
                numero: ''
            },
            imagem: ''
        });
        endRegister();
    }

    return (
        <RegisterClientContext.Provider
            value={{ client, setInitialInformations, setAddress, setContacts, setProfilePic, endingRegister, loading, clearClient }}>
            {children}
        </RegisterClientContext.Provider>
    );
}

function useRegisterClient() {
    const context = useContext(RegisterClientContext);

    if (!context)
        throw new Error('useRegisterProfessional must be used with in RegisterProvider.');

    return context;
}


export { RegisterClientProvider, useRegisterClient };
