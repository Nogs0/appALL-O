import React, { createContext, useContext } from 'react';
import ALLORequestBase, { ALLORequestForm, api, verbosAPI } from '../services/api';
import { TipoPessoaEnum } from '../shared/Enums/enums';
import { getTypeFromFileName } from '../shared/helpers';
import { api_url } from '../services/config-dev';

export interface ClientDTO {
    id: number,
    nome: string,
    email: string,
    senha: string,
    endereco: Endereco,
    imagemDoPerfil: any
}

export interface PerfilProvedorInput {
    idProvedor: number,
    idAvaliacao: number,
    descricao: string,
    perfilImage: string
}

export interface ProvedorInput {
    id: number | undefined,
    email: string,
    telefone: string,
    cpfCnpj: string,
    enderecoInput: Endereco,
    razaoSocial: string,
    tipoPessoa: TipoPessoaEnum | undefined,
    idProfissoes: number[]
    perfilProvedorInput: PerfilProvedorInput,
    servicoImagens: string[],
    senha: string,
}

export interface ClienteInput {
    id: number | undefined,
    email: string,
    senha: string,
    telefone: string,
    cpfCnpj: string,
    nome: string,
    enderecoInput: Endereco,
    imagem: string,
}

export interface Endereco {
    id: number,
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    logradouro: string,
    numero: string
}

export interface ProfissaoOutput {
    id: number,
    nomeIcone: string,
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
    favorito: boolean,
    imagem: string,
    mediaAvaliacao: number,
}

export interface ClienteOutput {
    id: number,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    endereco: Endereco,
    favoritos: ProvedorOutput[],
    ativo: boolean,

}

export interface PefilClienteOutput {
    id: number,
    nome: string,
    cpf: string,
    email: string,
    cliente: ClienteOutput,
    telefone: string,
    imagemPerfil: string,
    provedoresFavoritados: ProvedorOutput[],
}

export interface AvaliacaoOutput {
    id: number,
    provedor: ProvedorOutput,
    cliente: PefilClienteOutput,
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
    imagemPerfil: string,
    nome: string,
    email: string,
    descricao: string,
    quantidadeAvaliacoes: number | undefined
}

interface APIContextData {
    getPerfilCliente(id: number): Promise<PefilClienteOutput>,
    getPerfilProfissional(id: number): Promise<PerfilProvedorOutput>,
    updateProfessional(input: ProvedorInput): Promise<void>,
    updateClient(input: ClienteInput): Promise<void>,
    updateFavoriteReview(id: number): Promise<boolean>,
    getReviewsByProfessional(id: number): Promise<any>,
    updateSeenNotification(id: number): Promise<boolean>,
    getProfessions(): Promise<ProfissaoOutput[]>,
    sugerirProfissao(sugestao: string): Promise<void>,
    createProvider(profissional: ProvedorInput): Promise<void>,
    createClient(client: ClienteInput): Promise<void>,
    getProfessionsBySearch(search: string): Promise<ProfissaoOutput[]>
    getAllProfessionalsByID(id: number): Promise<ProvedorOutput[]>,
    getImageClient(idImage: string): Promise<any>,
    getImageProfessional(idImage: string): Promise<any>,
    updateImageClient(uri: string, fileName: string): Promise<string>,
    updateImageProfessional(uri: string, fileName: string): Promise<string>
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

    const getAllProfessionalsByID = (id: number): Promise<ProvedorOutput[]> => {
        return new Promise<ProvedorOutput[]>((resolve, reject) => {
            ALLORequestBase<ProvedorOutput[]>(verbosAPI.GET, 'provedor/filter/profissao', `idProfissao=${id}`)
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    console.log(e.request);
                    reject(e);
                })
        })
    }
    const getPerfilCliente = (id: number): Promise<PefilClienteOutput> => {
        return new Promise<PefilClienteOutput>((resolve, reject) => {
            ALLORequestBase<PefilClienteOutput>(verbosAPI.GET, 'cliente/perfil', `idCliente=${id}`)
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    console.log(e.request);
                    reject(e);
                })

        })
    }

    const getPerfilProfissional = (id: number): Promise<PerfilProvedorOutput> => {
        return new Promise<PerfilProvedorOutput>((resolve, reject) => {
            ALLORequestBase<PerfilProvedorOutput>(verbosAPI.GET, 'provedor/perfil', `idProvedor=${id}`)
                .then((result) => {
                    console.log(result);
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

    const updateClient = (input: ClienteInput): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            ALLORequestBase<void>(verbosAPI.PUT, 'cliente', input)
                .then(() => {
                    resolve();
                })
                .catch((e) => {
                    console.log(e.request)
                    reject();
                })
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

    const getProfessionsBySearch = (search: string): Promise<ProfissaoOutput[]> => {
        return new Promise<ProfissaoOutput[]>(async (resolve, reject) => {
            ALLORequestBase<any>(verbosAPI.GET, 'profissao/filter', `profissao=${search}`)
                .then((result) => {
                    resolve(result as ProfissaoOutput[]);
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
                    console.log(e.request);
                    reject();
                })
        })
    }

    const createClient = (client: ClienteInput): Promise<void> => {
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

    const getImageClient = (idImage: string): Promise<ArrayBuffer | string> => {
        return new Promise<ArrayBuffer | string>((resolve, reject) => {
            let urlToFetch = `${api_url}cliente/buscarImagem?fileName=${idImage}`;
            fetch(urlToFetch)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const imageData = reader.result;
                        resolve(imageData);
                    };
                    reader.readAsDataURL(blob);
                })
                .catch((e) => {
                    console.error('Erro ao buscar a imagem:', e);
                    reject(e)
                });
        })
    }

    const getImageProfessional = (idImage: string): Promise<ArrayBuffer | string> => {
        return new Promise<ArrayBuffer | string>((resolve, reject) => {
            let urlToFetch = `${api_url}provedor/buscarImagem?fileName=${idImage}`;
            console.log(urlToFetch)
            fetch(urlToFetch)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const imageData = reader.result;
                        resolve(imageData);
                    };
                    reader.readAsDataURL(blob);
                })
                .catch((e) => {
                    console.error('Erro ao buscar a imagem:', e);
                    reject(e)
                });
        })
    }

    const updateImageClient = (uri: string, fileName: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
            const imageObject = {
                name: 'perfil-cliente',
                uri: uri,
                type: `image/${getTypeFromFileName(fileName)}`
            }

            form.append('image', imageObject)
            ALLORequestForm('cliente/upload', form)
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    reject(e);
                });
        })
    }

    const updateImageProfessional = (uri: string, fileName: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
            const imageObject = {
                name: 'perfil-profissional',
                uri: uri,
                type: `image/${getTypeFromFileName(fileName)}`
            }

            form.append('image', imageObject)
            ALLORequestForm('provedor/upload', form)
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    reject(e);
                });
        })
    }

    return (
        <APIContext.Provider
            value={{ getAllProfessionalsByID, getPerfilCliente, getPerfilProfissional, updateProfessional, updateFavoriteReview, getReviewsByProfessional, updateSeenNotification, updateClient, getProfessions, sugerirProfissao, createProvider, createClient, getProfessionsBySearch, getImageClient, updateImageClient, updateImageProfessional, getImageProfessional }}>
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
