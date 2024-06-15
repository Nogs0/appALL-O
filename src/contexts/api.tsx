import React, { createContext, useContext } from 'react';
import api from '../services/api';

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
    getProfessionalToEdit(id: number): Promise<ProfessionalToEditDTO>,
    updateProfessional(dto: ProfessionalToEditDTO): Promise<void>,
    updateImage(image: any): Promise<any>,
    updateFavoriteReview(id: number): Promise<boolean>,
    getReviewsByProfessional(id: number): Promise<any>,
    updateSeenNotification(id: number): Promise<boolean>,
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

    const getClient = (id: number): Promise<ClientDTO> => {
        return new Promise<ClientDTO>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve({
                        name: 'João',
                        email: 'joaoguinogueira04@gmail.com',
                        password: 'ejw-9fí2e2n'
                    } as ClientDTO)
                }, 1000)
            }
            catch (e) {
                reject(e);
            }

        })
    }

    const getProfessionalToEdit = (id: number): Promise<ProfessionalToEditDTO> => {
        return new Promise<ProfessionalToEditDTO>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve({
                        id: 1,
                        name: 'João',
                        email: 'joaoguinogueira04@gmail.com',
                        document: '087.606.736-48',
                        perfilImage: '',
                        images: [],
                        address: {
                            postalCode: '37714660',
                            state: 'MG',
                            city: 'Poços de Caldas',
                            neighborhood: 'Campo das Antas',
                            street: 'Avenida Sinesio do Lago',
                            number: '543'
                        },

                    } as ProfessionalToEditDTO)
                }, 1000)
            }
            catch (e) {
                reject(e);
            }
        })
    }

    const updateProfessional = (dto: ProfessionalToEditDTO): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve()
                }, 2000);
            }
            catch (e) {
                reject(e);
            }
        })
    }

    const updateImage = (image: any): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve(image)
                }, 2000);
            }
            catch (e) {
                reject(e);
            }
        })
    }

    const updateFavoriteReview = (id: number): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve(true)
                }, 2000);
            }
            catch (e) {
                reject(e);
            }
        })
    }

    const updateSeenNotification = (id: number): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve(true)
                }, 2000);
            }
            catch (e) {
                reject(e);
            }
        })
    }
    const getReviewsByProfessional = (id: number): Promise<any> => {

        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {


                resolve({
                    professionalName: 'Marcio DME',
                    revs: [
                        {
                            client: 'Guilherme Customer',
                            rate: 3,
                            rateNote: 'aaaaaaaaaaaaaaaa',
                            date: '04/05/2024',
                            image: require('../assets/images/encanador.jpg'),
                            images: [
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                            ]
                        },
                        {
                            client: 'Andrew Customer',
                            rate: 5,
                            rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            date: '09/05/2024',
                            image: require('../assets/images/encanador.jpg'),
                            images: [
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg')
                            ]
                        },
                        {
                            client: 'Andrew Customer',
                            rate: 5,
                            rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            date: '09/05/2024',
                            image: require('../assets/images/encanador.jpg'),
                            images: [
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg')
                            ]
                        },
                        {
                            client: 'Andrew Customer',
                            rate: 5,
                            rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            date: '09/05/2024',
                            image: require('../assets/images/encanador.jpg'),
                            images: [
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                            ]
                        },
                        {
                            client: 'Andrew Customer',
                            rate: 5,
                            rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            date: '09/05/2024',
                            image: require('../assets/images/encanador.jpg'),
                            images: [
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg'),
                                require('../assets/images/eletricista.jpg')
                            ]
                        },
                        {
                            client: 'Andrew Customer',
                            rate: 5,
                            rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            date: '09/05/2024',
                            image: require('../assets/images/encanador.jpg'),
                            images: [
                                require('../assets/images/encanador.jpg'),
                                require('../assets/images/encanador.jpg'),
                                require('../assets/images/encanador.jpg'),
                                require('../assets/images/encanador.jpg')
                            ]
                        },
                        {
                            client: 'Andrew Customer',
                            rate: 5,
                            rateNote: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                            date: '09/05/2024',
                            image: require('../assets/images/encanador.jpg'),
                            images: [
                                require('../assets/images/encanador.jpg'),
                                require('../assets/images/encanador.jpg'),
                                require('../assets/images/encanador.jpg'),
                                require('../assets/images/encanador.jpg')
                            ]
                        },
                    ]
                })
            }, 2000);
        })
    }

    return (
        <APIContext.Provider
            value={{ getClient, getProfessionalToEdit, updateProfessional, updateImage, updateFavoriteReview, getReviewsByProfessional, updateSeenNotification }}>
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
