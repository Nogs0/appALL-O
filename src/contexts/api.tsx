import React, { createContext, useContext } from 'react';
import ALLORequestBase, { api, verbosAPI } from '../services/api';
import { TipoPessoaEnum } from '../shared/Enums/enums';
import { ClienteInput } from './registerClient';

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
    tipoPessoa: TipoPessoaEnum | undefined,
    idProfissoes: number[]
    enderecoInput: Endereco,
    perfilImagem: any,
    servicoImagens: string[],
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

export interface ProvedorOutput {
    id: number,
    razaoSocial: string,
    endereco: Endereco,
    profissoes: ProfissaoOutput[],
    tipoPessoa: TipoPessoaEnum,
    cpfCnpj: string,
    email: string,
    telefone: string,
    ativo: boolean,
    favorito: boolean
}

export interface ClienteOutput {
    id: number,
    nome: string,
    provedoresFavoritados: ProvedorOutput[],
}

export interface AvaliacaoOutput {
    id: number,
    provedor: ProvedorOutput,
    cliente: ClienteOutput,
    nota: number,
    titulo: string,
    descricao: string
}

export interface PerfilProvedorOutput {
    id: number,
    provedor: ProvedorOutput,
    avaliacao: AvaliacaoOutput,
    servicosConcluidos: number,
    mediaAvaliacao: number,
    tempoCadastro: number,
    pathToImage: any,
    nome: string,
    email: string,
    descricao: string,
    quantidadeAvaliacoes: number | undefined
}

interface APIContextData {
    getClientToEdit(id: number): Promise<ClientDTO>,
    getPerfilProfissional(id: number): Promise<PerfilProvedorOutput>,
    updateProfessional(dto: ProvedorInput): Promise<void>,
    updateClient(dto: ClientDTO): Promise<void>,
    updateImage(image: any): Promise<any>,
    updateFavoriteReview(id: number): Promise<boolean>,
    getReviewsByProfessional(id: number): Promise<any>,
    updateSeenNotification(id: number): Promise<boolean>,
    getProfessions(): Promise<ProfissaoOutput[]>,
    sugerirProfissao(sugestao: string): Promise<void>,
    createProvider(profissional: ProvedorInput): Promise<void>,
    createClient(client: ClienteInput): Promise<void>
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

    const getPerfilProfissional = (id: number): Promise<PerfilProvedorOutput> => {
        return new Promise<PerfilProvedorOutput>((resolve, reject) => {
            ALLORequestBase<PerfilProvedorOutput>(verbosAPI.GET, 'provedor/perfil', `idProvedor=${id}`)
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    console.log(e.request);
                    reject(e);
                })
        })
    }

    const updateProfessional = (input: ProvedorInput): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            ALLORequestBase<void>(verbosAPI.PUT, 'provedor', input)
                .then(() => {
                    resolve();
                })
                .catch((e) => {
                    console.log(e.request)
                    reject();
                })
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
            ALLORequestBase<any>(verbosAPI.GET, 'profissao')
                .then((result) => {
                    resolve(result.content as ProfissaoOutput[]);
                })
                .catch((e) => {
                    console.log(e.request)
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
        return new Promise<void>((resolve, reject) => {
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

    const createClient = (client: ClienteInput): Promise<void> => {
        console.log(client)
        return new Promise<void>(async (resolve, reject) => {
            ALLORequestBase(verbosAPI.POST, 'cliente', client)
                .then(() => {
                    resolve();
                })
                .catch((e) => {
                    console.log(e.request);
                    reject(e);
                })
        })
    }

    return (
        <APIContext.Provider
            value={{ getClientToEdit, getPerfilProfissional, updateProfessional, updateImage, updateFavoriteReview, getReviewsByProfessional, updateSeenNotification, updateClient, getProfessions, sugerirProfissao, createProvider, createClient }}>
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
