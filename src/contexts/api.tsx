import React, { createContext, useContext } from 'react';

export interface Client {
    name: string,
    email: string,
    password: string
}

interface APIContextData {
    getClient(id: number): Promise<Client>
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

    const getClient = (id: number): Promise<Client> => {
        return new Promise<Client>((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    name: 'João',
                    email: 'joaoguinogueira04@gmail.com',
                    password: 'ejw-9fí2e2n'
                } as Client)
            }, 1000)

        })
    }

    return (
        <APIContext.Provider
            value={{ getClient }}>
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
