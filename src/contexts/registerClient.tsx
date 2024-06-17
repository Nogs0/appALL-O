import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth";

interface Address {
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

interface ClienteInput {
    id: number | undefined,
    senha: string,
    email: string,
    telefone: string,
    cpfCnpj: string,
    nome: string
    imagem: string
}

interface RegisterClientContextData {
    client: ClienteInput | null,
    loading: boolean,
    setInitialInformations(params: InitialInformations): void,
    setAddress(address: Address): void,
    setContacts(phoneNumber: string): void,
    setProfilePic(profilePic: any): void,
    endingRegister(): Promise<string>,
    clearClient(): void
}

const RegisterClientContext = createContext<RegisterClientContextData>({} as RegisterClientContextData)

function RegisterClientProvider({ children }: any) {
    const { endRegister } = useAuth();

    const [client, setClient] = useState<ClienteInput | null>({
        id: undefined,
        email: '',
        senha: '',
        telefone: '',
        cpfCnpj: '',
        nome: '',
        imagem: ''
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


    function setAddress(address: Address) {
        setClient((prev) => {
            if (!prev) prev = {} as ClienteInput;
            return { ...prev, address };
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
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                console.log(client);
                resolve("Cadastro finalizado -> Aqui devemos integrar com o cadastro do cliente na API");
                setLoading(false);
            }, 2000);
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
