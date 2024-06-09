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
    document: string,
    email: string,
    password: string,
}

interface ProfessionalCreateDto {
    document: string,
    email: string,
    password: string,
    services: number[],
    description: string,
    address: Address,
    phoneNumber: string,
    images: any
}

interface RegisterContextData {
    professional: ProfessionalCreateDto | null,
    loading: boolean,
    setInitialInformations(params: InitialInformations): void,
    setDescription(description: string): void,
    setServices(services: number[]): void,
    setAddress(address: Address): void,
    setContacts(phoneNumber: string): void,
    setImages(images: any): void,
    endingRegister(): Promise<string>,
    clearProfessional(): void
}

const RegisterContext = createContext<RegisterContextData>({} as RegisterContextData)

function RegisterProvider({ children }: any) {

    const { endRegister } = useAuth();

    const [professional, setProfessional] = useState<ProfessionalCreateDto | null>({
        document: '',
        email: '',
        password: '',
        services: [],
        description: '',
        address: {
            postalCode: '',
            state: '',
            city: '',
            neighborhood: '',
            street: '',
            number: ''
        },
        phoneNumber: '',
        images: []
    });
    const [loading, setLoading] = useState<boolean>(false);

    function setInitialInformations(params: InitialInformations) {
        setProfessional((prev) => {
            if (!prev)
                prev = {} as ProfessionalCreateDto;

            prev.document = params.document;
            prev.email = params.email;
            prev.password = params.password
            return prev;
        });
    }

    function setDescription(description: string) {
        setProfessional((prev) => {
            if (!prev)
                prev = {} as ProfessionalCreateDto;

            prev.description = description;
            return prev;
        });
    }

    function setServices(listServices: number[]) {
        setProfessional((prev) => {
            if (!prev)
                prev = {} as ProfessionalCreateDto;

            prev.services = listServices;
            return prev;
        });
    }

    function setAddress(address: Address) {
        setProfessional((prev) => {
            if (!prev)
                prev = {} as ProfessionalCreateDto;

            prev.address = address;
            return prev;
        });
    }

    function setContacts(phoneNumber: string) {
        setProfessional((prev) => {
            if (!prev)
                prev = {} as ProfessionalCreateDto;

            prev.phoneNumber = phoneNumber;
            return prev;
        });
    }

    function setImages(images: any) {
        setProfessional((prev) => {
            if (!prev)
                prev = {} as ProfessionalCreateDto;

            prev.images = images;
            return prev;
        });
    }

    function endingRegister(): Promise<string> {
        setLoading(true);
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                console.log(professional);
                resolve("Cadastro finalizado -> Aqui devemos integrar com o cadastro do profissional na API")
                setLoading(false);
            }, 2000)
        });
    }

    function clearProfessional(): void {
        setProfessional({
            document: '',
            email: '',
            password: '',
            services: [],
            description: '',
            address: {
                postalCode: '',
                state: '',
                city: '',
                neighborhood: '',
                street: '',
                number: ''
            },
            phoneNumber: '',
            images: []
        })
        endRegister();
    }

    return (
        <RegisterContext.Provider
            value={{ professional, setInitialInformations, setDescription, setServices, setAddress, setContacts, setImages, endingRegister, loading, clearProfessional }}>
            {children}
        </RegisterContext.Provider>
    )
}

function useRegister() {
    const context = useContext(RegisterContext);

    if (!context)
        throw new Error('useRegister must be used with in RegisterProvider.');

    return context;
}

export { RegisterProvider, useRegister };
