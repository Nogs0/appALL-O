import React, { createContext, useContext } from 'react';

export interface ClientDTO {
    name: string,
    email: string,
    password: string
}

export interface ProfessionalToEditDTO {
    id: number,
    name: string,
    email: string,
    document: string,
    perfilImage: any,
    images: any[],
    address: Address,
}

export interface Address {
    postalCode: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    number: string
}

interface APIContextData {
    getClient(id: number): Promise<ClientDTO>,
    getProfessionalToEdit(id: number): Promise<ProfessionalToEditDTO>
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

    const getClient = (id: number): Promise<ClientDTO> => {
        return new Promise<ClientDTO>((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    name: 'João',
                    email: 'joaoguinogueira04@gmail.com',
                    password: 'ejw-9fí2e2n'
                } as ClientDTO)
            }, 1000)

        })
    }

    const getProfessionalToEdit = (id: number): Promise<ProfessionalToEditDTO> => {
        return new Promise<ProfessionalToEditDTO>((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: 'João',
                    email: 'joaoguinogueira04@gmail.com',
                    document: '087.606.736-48',
                    perfilImage: '',
                    images: [],
                    address: {
                        postalCode: '',
                        state: '',
                        city: '',
                        neighborhood: '',
                        street: '',
                        number: ''
                    },

                } as ProfessionalToEditDTO)
            }, 1000)

        })
    }

    return (
        <APIContext.Provider
            value={{ getClient, getProfessionalToEdit }}>
            {children}
        </APIContext.Provider>
    )
}

const useAPI = () => {
    const context = useContext(APIContext);
    if (!context)
        throw new Error('useAPI  must be used with in APIProvider.');

    return context;
}

export { APIProvider, useAPI };
