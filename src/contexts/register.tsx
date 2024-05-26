import { createContext, useContext, useState } from "react";

interface Address {
    postalCode: string,
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
    phone: string,
}

interface RegisterContextData {
    professional: ProfessionalCreateDto | null,
    setInitialInformations(params: InitialInformations): void
}

const RegisterContext = createContext<RegisterContextData>({} as RegisterContextData)

function RegisterProvider({ children }: any) {

    const [professional, setProfessional] = useState<ProfessionalCreateDto | null>(null);

    function setInitialInformations(params: InitialInformations) {
        let auxProf = !!professional ? professional : {} as ProfessionalCreateDto;

        auxProf.document = params.document;
        auxProf.email = params.email;
        auxProf.password = params.password;

        setProfessional(auxProf);
    }

    return (
        <RegisterContext.Provider
            value={{ professional, setInitialInformations }}>
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

export { RegisterProvider, useRegister }