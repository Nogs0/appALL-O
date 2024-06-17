import React, { createContext, useContext } from 'react';
import ALLORequestBase, { api, verbosAPI } from '../services/api';
import { TipoPessoaEnum } from '../shared/Enums/enums';

export interface ClientDTO {
    id: number,
    nome: string,
    email: string,
    senha: string,
    endereco: Endereco,
    imagemDoPerfil: any
}

export interface ProvedorInput {
    id: number | undefined,
    email: string,
    senha: string,
    telefone: string,
    cpfCnpj: string,
    razaoSocial: string,
    tipoPessoa: TipoPessoaEnum,
    profissoesId: number[]
    endereco: Endereco,
    imagemDoPerfil: any,
    images: [],
    servicos: number[],
    descricao: string
}

export interface Endereco {
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    logradouro: string,
    numero: string
}

export interface ProfissaoOutput {
    id: number,
    nomeIcone: string | undefined,
    nome: string
}

interface APIContextData {
    getClientToEdit(id: number): Promise<ClientDTO>,
    getProfessionalToEdit(id: number): Promise<ProvedorInput>,
    updateProfessional(dto: ProvedorInput): Promise<void>,
    updateClient(dto: ClientDTO): Promise<void>,
    updateImage(image: any): Promise<any>,
    updateFavoriteReview(id: number): Promise<boolean>,
    getReviewsByProfessional(id: number): Promise<any>,
    updateSeenNotification(id: number): Promise<boolean>,
    getProfessions(): Promise<ProfissaoOutput[]>,
    sugerirProfissao(sugestao: string): Promise<void>,
    createProvider(profissional: ProvedorInput): Promise<void>
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

    const getClientToEdit = (id: number): Promise<ClientDTO> => {
        return new Promise<ClientDTO>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve({
                        id: 1,
                        nome: 'Matheus',
                        email: 'matheus_jonnas@proton.me',
                        senha: 'ejw-9fí2e2n',
                        endereco: {
                            cep: '37730000',
                            estado: 'MG',
                            cidade: 'Campestre',
                            bairro: 'Campo das Antas',
                            logradouro: 'Avenida Sinesio do Lago',
                            numero: '543'
                        },
                    } as ClientDTO)
                }, 1000)
            }
            catch (e) {
                reject(e);
            }

        })
    }

    const getProfessionalToEdit = (id: number): Promise<ProvedorInput> => {
        return new Promise<ProvedorInput>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve({
                        id: 1,
                        razaoSocial: 'João',
                        email: 'joaoguinogueira04@gmail.com',
                        senha: 'ejw-9fí2e2n',
                        cpfCnpj: '087.606.736-48',
                        telefone: '(35) 99826-5445',
                        tipoPessoa: TipoPessoaEnum.FISICA,
                        profissoesId: [1, 2, 3],
                        imagemDoPerfil: undefined,
                        images: [],
                        endereco: {
                            cep: '37714660',
                            estado: 'MG',
                            cidade: 'Poços de Caldas',
                            bairro: 'Campo das Antas',
                            logradouro: 'Avenida Sinesio do Lago',
                            numero: '543'
                        },
                    } as ProvedorInput)
                }, 1000)
            }
            catch (e) {
                reject(e);
            }
        })
    }

    const updateProfessional = (dto: ProvedorInput): Promise<void> => {
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

    const updateClient = (dto: ClientDTO): Promise<void> => {
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

    const getProfessions = (): Promise<ProfissaoOutput[]> => {
        return new Promise<ProfissaoOutput[]>(async (resolve, reject) => {
            ALLORequestBase<ProfissaoOutput[]>(verbosAPI.GET, 'profissao')
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                })
        })
    }

    const sugerirProfissao = (sugestao: string): Promise<void> => {
        return new Promise<void>(async (resolve, reject) => {
            ALLORequestBase(verbosAPI.POST, 'profissao/sugerir', { sugestao })
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                })
        })
    }

    const createProvider = (profissional: ProvedorInput): Promise<void> => {
        return new Promise<void> ((resolve, reject) => {
            ALLORequestBase(verbosAPI.POST, 'provedor', profissional)
            .then((result) => {
                resolve();
            })
            .catch((e) => {
                console.log(e);
                reject();
            })
        })
    }

    return (
        <APIContext.Provider
            value={{ getClientToEdit, getProfessionalToEdit, updateProfessional, updateImage, updateFavoriteReview, getReviewsByProfessional, updateSeenNotification, updateClient, getProfessions, sugerirProfissao, createProvider }}>
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
