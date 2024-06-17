import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth";
interface Address {
    postalCode: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: string
}

interface InitialInformations {
    name: string,
    email: string,
    password: string,
}

interface ClientCreateDto {
    name: string,
    document: string,
    email: string,
    password: string,
    address: Address,
    phoneNumber: string,
    profilePic: any
}

interface RegisterClientContextData {
    client: ClientCreateDto | null,
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

    const [client, setClient] = useState<ClientCreateDto | null>({
        name: '',
        document: '',
        email: '',
        password: '',
        address: {
            postalCode: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            number: ''
        },
        phoneNumber: '',
        profilePic: []
    });
    const [loading, setLoading] = useState<boolean>(false);

    function setInitialInformations(params: InitialInformations) {
        setClient((prev) => {
            if (!prev)
                prev = {} as ClientCreateDto;
            prev.name = params.name;
            prev.email = params.email;
            prev.password = params.password
            return prev;
        });
    }


    function setAddress(address: Address) {
        setClient((prev) => {
            if (!prev) prev = {} as ClientCreateDto;
            return { ...prev, address };
        });
    }

    function setContacts(phoneNumber: string) {
        setClient((prev) => {
            if (!prev) prev = {} as ClientCreateDto;
            return { ...prev, phoneNumber };
        });
    }

    function setProfilePic(profilePic: any) {
        setClient((prev) => {
            if (!prev) prev = {} as ClientCreateDto;
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
            name: '',
            document: '',
            email: '',
            password: '',
            address: {
                postalCode: '',
                state: '',
                city: '',
                neighborhood: '',
                street: '',
                number: ''
            },
            phoneNumber: '',
            profilePic: []
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
