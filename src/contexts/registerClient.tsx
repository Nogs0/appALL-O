import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth";
import { ClienteCadastroInput, useAPI } from "./api";
import { UsuarioRole } from "../shared/Enums/enums";

interface Endereco {
    id: number,
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    logradouro: string,
    numero: string
}

interface InitialInformationsProfessional {
    nome: string,
    email: string,
    senha: string,
}

interface InitialInformationsClient {
    nome: string,
    email: string,
    senha: string,
    cpfCnpj: string,
    telefone: string
}

interface RegisterClientContextData {
    client: ClienteCadastroInput | null,
    loading: boolean,
    setInitialInformations(params: InitialInformationsClient): void,
    setAddress(address: Endereco): void,
    setProfilePic(profilePic: any): void,
    endingRegister(): Promise<void>,
    clearClient(): void
}

const RegisterClientContext = createContext<RegisterClientContextData>({} as RegisterClientContextData)

function RegisterClientProvider({ children }: any) {
    const { endRegister } = useAuth();
    const { createClient } = useAPI();

    const [client, setClient] = useState<ClienteCadastroInput | null>({
        usuario: {
            login: '',
            senha: '',
            role: UsuarioRole.CLIENTE
        },
        cliente: {
            id: 0,
            email: '',
            telefone: '',
            nome: '',
            cpfCnpj: '',
            enderecoInput: {
                id: 0,
                cep: '',
                estado: '',
                cidade: '',
                bairro: '',
                logradouro: '',
                numero: ''
            },
            imagem: ''
        }
    });
    const [loading, setLoading] = useState<boolean>(false);

    function setInitialInformations(params: InitialInformationsClient) {
        setClient((prev) => {
            if (!prev)
                prev = {} as ClienteCadastroInput;

            prev.cliente.cpfCnpj = params.cpfCnpj;
            prev.cliente.telefone = params.telefone;
            prev.cliente.email = params.email;
            prev.cliente.nome = params.nome;
            prev.usuario = {
                login: params.email,
                senha: params.senha,
                role: UsuarioRole.CLIENTE
            }
            return prev;
        });
    }


    function setAddress(endereco: Endereco) {
        setClient((prev) => {
            if (!prev) prev = {} as ClienteCadastroInput;

            prev.cliente.enderecoInput = endereco;
            return prev;
        });
    }

    function setProfilePic(path: string) {
        setClient((prev) => {
            if (!prev) prev = {} as ClienteCadastroInput;
            prev.cliente.imagem = path;
            return prev;
        });
    }

    function endingRegister(): Promise<void> {
        setLoading(true);
        return new Promise<void>((resolve, reject) => {
            if (client) {
                createClient(client)
                    .then(() => {
                        resolve();
                    })
                    .catch((e) => {
                        reject(e)
                    });
            }
            setLoading(false);
        });
    }

    function clearClient(): void {
        setClient({
            usuario: {
                login: '',
                senha: '',
                role: UsuarioRole.CLIENTE
            },
            cliente: {
                id: 0,
                email: '',
                telefone: '',
                nome: '',
                cpfCnpj: '',
                enderecoInput: {
                    id: 0,
                    cep: '',
                    estado: '',
                    cidade: '',
                    bairro: '',
                    logradouro: '',
                    numero: ''
                },
                imagem: ''
            }
        });
        endRegister();
    }

    return (
        <RegisterClientContext.Provider
            value={{ client, setInitialInformations, setAddress, setProfilePic, endingRegister, loading, clearClient }}>
            {children}
        </RegisterClientContext.Provider>
    );
}

function useRegisterClient() {
    const context = useContext(RegisterClientContext);

    if (!context)
        throw new Error('useRegisterClient must be used with in RegisterClientProvider.');

    return context;
}


export { RegisterClientProvider, useRegisterClient };
