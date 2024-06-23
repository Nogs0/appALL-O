import React, { createContext, useContext } from 'react';
import ALLORequestBase, { ALLORequestForm, verbosAPI } from '../services/api';
import { TipoPessoaEnum, UsuarioRole } from '../shared/Enums/enums';
import { getTypeFromFileName } from '../shared/helpers';
import { api_url } from '../services/config-dev';
import { useAuth } from './auth';

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
    usuario: {
        login: string,
        senha: string,
        role: UsuarioRole.PROVEDOR
    },
}

export interface ClienteInput {
    id: number | undefined,
    email: string,
    usuario: {
        login: string,
        senha: string,
        role: UsuarioRole.CLIENTE
    },
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

export interface FeedbackServicoInput {
    id: number,
    confirmado: boolean
}

export interface ImagemUpload {
    uri: string,
    fileName: string
}

export interface AvaliacaoInput {
    idServico: number,
    descricao: string,
    nota: number
}

export interface ServicoOutput {
    id: number,
    provedor: ProvedorOutput,
    cliente: ClienteOutput,
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
    updateImageProfessional(uri: string, fileName: string): Promise<string>,
    getServicosNaoVistosProfissional(id: number): Promise<ServicoOutput[]>,
    feedbackServico(input: FeedbackServicoInput): Promise<void>,
    getServicosParaAvaliarCliente(id: number): Promise<ServicoOutput[]>,
    registrarServico(idProfissional: number): Promise<void>,
    createAvaliacao(input: AvaliacaoInput): Promise<void>
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

    const { token } = useAuth();

    const getAllProfessionalsByID = (id: number): Promise<ProvedorOutput[]> => {
        return new Promise<ProvedorOutput[]>((resolve, reject) => {
            ALLORequestBase<ProvedorOutput[]>(token, verbosAPI.GET, 'provedor/filter/profissao', `idProfissao=${id}`)
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
        console.log(token)
        return new Promise<PefilClienteOutput>((resolve, reject) => {
            ALLORequestBase<PefilClienteOutput>(token, verbosAPI.GET, 'cliente/perfil', `idCliente=${id}`)
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    reject(e);
                })

        })
    }

    const getPerfilProfissional = (id: number): Promise<PerfilProvedorOutput> => {
        return new Promise<PerfilProvedorOutput>((resolve, reject) => {
            ALLORequestBase<PerfilProvedorOutput>(token, verbosAPI.GET, 'provedor/perfil', `idProvedor=${id}`)
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    reject(e);
                })
        })
    }

    const updateProfessional = (input: ProvedorInput): Promise<void> => {
        console.log(input)
        return new Promise<void>((resolve, reject) => {
            ALLORequestBase<void>(token, verbosAPI.PUT, 'provedor', input)
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
            ALLORequestBase<void>(token, verbosAPI.PUT, 'cliente', input)
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
                resolve(true)
            }
            catch (e) {
                reject(e);
            }
        })
    }

    const updateSeenNotification = (id: number): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            try {
                resolve(true)
            }
            catch (e) {
                reject(e);
            }
        })
    }

    const getReviewsByProfessional = (id: number): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            resolve({
                professionalName: 'Marcio DME',
                revs: [
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
        })
    }

    const getProfessions = (): Promise<ProfissaoOutput[]> => {
        return new Promise<ProfissaoOutput[]>(async (resolve, reject) => {
            ALLORequestBase<any>(token, verbosAPI.GET, 'profissao')
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
            ALLORequestBase<any>(token, verbosAPI.GET, 'profissao/filter', `profissao=${search}`)
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
            ALLORequestBase(token, verbosAPI.POST, 'profissao/sugerir', { sugestao })
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
            fetch(`${api_url}provedor/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profissional)
            })
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
            fetch(`${api_url}cliente/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            })
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
            fetch(urlToFetch, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
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
            fetch(urlToFetch, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
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
            console.log(uri)
            const form = new FormData();
            const imageObject = {
                name: 'perfil-cliente',
                uri: uri,
                type: `image/${getTypeFromFileName(fileName)}`
            }

            form.append('image', imageObject)
            fetch(`${api_url}cliente/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: form
            })
                .then((result) => result.text())
                .then((id) => {
                    resolve(id);
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
            fetch(`${api_url}provedor/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: form
            })
                .then((result) => result.text())
                .then((id) => {
                    resolve(id);
                })
                .catch((e) => {
                    console.log(e)
                    reject(e);
                });
        })
    }

    const getServicosNaoVistosProfissional = (id: number): Promise<ServicoOutput[]> => {
        return new Promise<ServicoOutput[]>((resolve, reject) => {
            ALLORequestBase<ServicoOutput[]>(token, verbosAPI.GET, 'servico/naoVistoPeloProvedor')
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    reject(e);
                })
        })
    }

    const feedbackServico = (input: FeedbackServicoInput): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            ALLORequestBase(token, verbosAPI.PUT, 'servico/confirmacao', input)
                .then(() => resolve())
                .catch((e) => {
                    reject();
                })
        })
    }

    const getServicosParaAvaliarCliente = (id: number): Promise<ServicoOutput[]> => {
        return new Promise<ServicoOutput[]>((resolve, reject) => {
            ALLORequestBase<ServicoOutput[]>(token, verbosAPI.GET, 'servico/naoVistoPeloCliente')
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    reject(e);
                })
        })
    }

    const createAvaliacao = (input: AvaliacaoInput): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            ALLORequestBase(token, verbosAPI.PUT, 'servico/avaliar',
                {
                    id: input.idServico, 
                    avaliacao: {
                        nota: input.nota,
                        descricao: input.descricao
                    }
                })
                .then((result) => resolve())
                .catch((e) => {
                    reject(e)
                })
        })
    }

    const registrarServico = (idProfissional: number): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            let urlToFetch = `${api_url}servico/abertura?idProvedor=${idProfissional}`;
            fetch(urlToFetch, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => resolve())
                .catch((e) => {
                    console.error('Erro ao buscar a imagem:', e);
                    reject(e)
                });
        })
    }

    return (
        <APIContext.Provider
            value={{
                getAllProfessionalsByID,
                getPerfilCliente,
                getPerfilProfissional,
                updateProfessional,
                updateFavoriteReview,
                getReviewsByProfessional,
                updateSeenNotification,
                updateClient,
                getProfessions,
                sugerirProfissao,
                createProvider,
                createClient,
                getProfessionsBySearch,
                getImageClient,
                updateImageClient,
                updateImageProfessional,
                getImageProfessional,
                getServicosNaoVistosProfissional,
                feedbackServico,
                getServicosParaAvaliarCliente,
                createAvaliacao,
                registrarServico
            }}>
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
