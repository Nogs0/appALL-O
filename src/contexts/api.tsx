import React, { createContext, useContext } from 'react';
import ALLORequestBase, { ALLORequestForm, verbosAPI } from '../services/api';
import { TipoPessoaEnum, UsuarioRole } from '../shared/Enums/enums';
import { getTypeFromFileName } from '../shared/helpers';
import { api_url } from '../services/config-dev';
import { useAuth } from './auth';
import Input from '../components/Input';

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
    descricao: string,
    perfilImage: string
}

export interface ProvedorCadastroInput {
    usuario: {
        login: string,
        senha: string,
        role: UsuarioRole.PROVEDOR
    },
    provedor: ProvedorInput
}
export interface ProvedorInput {
    id: number | undefined,
    email: string,
    telefone: string,
    cpfCnpj: string,
    enderecoInput: Endereco,
    razaoSocial: string,
    tipoPessoa: TipoPessoaEnum | undefined,
    idProfissao: number
    servicoImagens: string[],
    perfilProvedorInput: PerfilProvedorInput,
}

export interface ClienteCadastroInput {
    usuario: {
        login: string,
        senha: string,
        role: UsuarioRole.CLIENTE
    },
    cliente: ClienteInput
}

export interface ClienteInput {
    id: number | undefined,
    email: string,
    telefone: string,
    cpfCnpj: string,
    enderecoInput: Endereco,
    nome: string,
    imagem: string,
}

export interface Endereco {
    id: number,
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    logradouro: string,
    numero: string,
    latitude: string,
    longitude: string
}

export interface ProfissaoOutput {
    id: number,
    nomeIcone: string,
    nome: string
}

export interface ProvedorDestaqueOutput{
    id: number,
    razaoSocial: string,
    nomeProfissao: string,
    imagem: string
}

export interface ProvedorOutput {
    id: number,
    razaoSocial: string,
    endereco: Endereco,
    profissao: ProfissaoOutput,
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
}

export interface PefilClienteOutput {
    id: number,
    cliente: ClienteOutput,
    imagemPerfil: string,
}

export interface AvaliacaoOutput {
    id: number,
    qualidade: number,
    preco: number,
    agilidade: number,
    titulo: string,
    descricao: string
    uriImagens: string[]
}

export interface PerfilProvedorOutput {
    id: number,
    provedor: ProvedorOutput,
    avaliacao: AvaliacaoOutput,
    servicosConcluidos: number,
    mediaAvaliacao: number,
    tempoCadastro: string,
    imagemPerfil: string,
    descricao: string,
    totalAvaliacoes: number,
    imagensServicos: string[]
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
    qualidade: number
    agilidade: number
    preco: number,
    uriImagens: string[]
}

export interface ServicoOutput {
    id: number,
    provedor: ProvedorOutput,
    cliente: ClienteOutput,
    avaliacao: AvaliacaoOutput
}

export interface ProvedorListOutput {
    idProvedor: number,
    razaoSocial: string,
    observacao: string,
    mediaAvaliacao: number,
    favorito: boolean,
    imagemPerfil: string
}

export interface NotificacaoOutput {
    nomeCliente: string,
    mensagem: string,
    dtRegistro: string
}

interface APIContextData {
    getProvedorNotificacoes(): Promise<NotificacaoOutput[]>,
    getProvedorHighlights(): Promise<ProvedorDestaqueOutput[]>,
    getProfissoesMaisUtilizadas(): Promise<ProfissaoOutput[]>,
    getProfissoesAleatorias(): Promise<ProfissaoOutput[]>,
    getPerfilCliente(id: number): Promise<PefilClienteOutput>,
    getPerfilProfissional(id: number): Promise<PerfilProvedorOutput>,
    updateProfessional(input: ProvedorInput): Promise<void>,
    updateClient(input: ClienteInput): Promise<void>,
    updateFavoriteReview(id: number): Promise<boolean>,
    updateFavoriteProvider(id: number): Promise<boolean>,
    getReviewsByProfessional(id: number): Promise<any>,
    updateSeenNotification(id: number): Promise<boolean>,
    getProfessions(): Promise<ProfissaoOutput[]>,
    sugerirProfissao(sugestao: string): Promise<void>,
    createProvider(profissional: ProvedorCadastroInput): Promise<void>,
    createClient(client: ClienteCadastroInput): Promise<void>,
    getProfessionsBySearch(search: string): Promise<ProfissaoOutput[]>
    getProvedoresByFilter(idProfissao: number, melhoresAvaliados: boolean, maisRelevantes: boolean): Promise<ProvedorListOutput[]>,
    getImageClient(idImage: string): Promise<any>,
    getImageProfessional(idImage: string): Promise<any>,
    getImageServico(idImage: string): Promise<any>,
    updateImageClient(uri: string, fileName: string): Promise<string>,
    createImageClient(uri: string, fileName: string): Promise<string>,
    updateImageProfessional(uri: string, fileName: string): Promise<string>,
    updateImageProfessionalServico(uri: string, fileName: string): Promise<string>,
    uploadImageAvaliacao(uri: string, fileName: string): Promise<string>,
    getImageAvaliacao(idImage: string): Promise<any>,
    createImageProfessional(uri: string, fileName: string): Promise<string>,
    getServicosNaoVistosProfissional(id: number): Promise<ServicoOutput[]>,
    feedbackServico(input: FeedbackServicoInput): Promise<void>,
    getServicosParaAvaliarCliente(id: number): Promise<ServicoOutput[]>,
    registrarServico(idProfissional: number): Promise<void>,
    createAvaliacao(input: AvaliacaoInput): Promise<void>
}

const APIContext = createContext<APIContextData>({} as APIContextData);

function APIProvider({ children }: any) {

    const { token } = useAuth();

    const getProvedoresByFilter = (idProfissao: number, melhoresAvaliados: boolean, maisRelevantes: boolean): Promise<ProvedorListOutput[]> => {
        return new Promise<ProvedorListOutput[]>((resolve, reject) => {
            ALLORequestBase<ProvedorListOutput[]>(token, verbosAPI.GET, 'provedor', 
                `idProfissao=${idProfissao}&melhoresAvaliados=${melhoresAvaliados}&maisRelevantes=${maisRelevantes}`)
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
            ALLORequestBase<ServicoOutput>(token, verbosAPI.PUT, 'provedor/perfil/destacar', id)
                .then((result) => {
                    resolve(result.avaliacao.id == id)
                })
                .catch((e) => {
                    reject(e);
                })
        })
    }

    const updateFavoriteProvider = (id: number): Promise<boolean> => {
        return new Promise<boolean>((resolve, reject) => {
            ALLORequestBase<ClienteOutput>(token, verbosAPI.PUT, 'cliente/favoritar', id)
                .then((result) => {
                    resolve(result.favoritos.findIndex(x => x.id == id) != -1)
                })
                .catch((e) => {

                    console.log(e.request);
                    reject(e);
                })
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

    const getReviewsByProfessional = (id: number): Promise<ServicoOutput[]> => {
        return new Promise<ServicoOutput[]>((resolve, reject) => {
            ALLORequestBase<ServicoOutput[]>(token, verbosAPI.GET, 'servico/filter/provedor', `idProvedor=${id}`)
                .then((result) => {
                    resolve(result);
                })
                .catch((e) => {
                    console.log(e.request);
                    reject(e)
                })
        })
    }

    const getProfessions = (): Promise<ProfissaoOutput[]> => {
        return new Promise<ProfissaoOutput[]>(async (resolve, reject) => {
            fetch(`${api_url}profissao`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((result) => result.json())
                .catch((e) => console.log(e))
                .then((json) => {

                    resolve(json as ProfissaoOutput[]);
                })
                .catch((e) => {
                    console.log(e.request);
                    reject();
                })
        })
    }

    const getProfessionsBySearch = (search: string): Promise<ProfissaoOutput[]> => {
        return new Promise<ProfissaoOutput[]>(async (resolve, reject) => {
            fetch(`${api_url}profissao/filter?profissao=${search}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then((result) => result.json())
                .catch((e) => console.log(e))
                .then((json) => {
                    console.log(json);
                    resolve(json as ProfissaoOutput[]);
                })
                .catch((e) => {
                    console.log(e.request);
                    reject();
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

    const createProvider = (profissional: ProvedorCadastroInput): Promise<void> => {
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

    const createClient = (client: ClienteCadastroInput): Promise<void> => {
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

    const getImageAvaliacao = (idImage: string): Promise<ArrayBuffer | string> => {
        return new Promise<ArrayBuffer | string>((resolve, reject) => {
            let urlToFetch = `${api_url}servico/searchImage?filename=${idImage}`;
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

    const getImageServico = (idImage: string): Promise<ArrayBuffer | string> => {
        return new Promise<ArrayBuffer | string>((resolve, reject) => {
            let urlToFetch = `${api_url}provedor/buscarImagem/servico?fileName=${idImage}`;
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
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
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

    const createImageClient = (uri: string, fileName: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
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

    const updateImageProfessionalServico = (uri: string, fileName: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
            const imageObject = {
                name: 'servico-profissional',
                uri: uri,
                type: `image/${getTypeFromFileName(fileName)}`
            }

            form.append('image', imageObject)
            fetch(`${api_url}provedor/upload/servico`, {
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

    const uploadImageAvaliacao = (uri: string, fileName: string): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const form = new FormData();
            const imageObject = {
                name: 'avaliacao-servico',
                uri: uri,
                type: `image/${getTypeFromFileName(fileName)}`
            }

            console.log(`${api_url}servico/upload`)
            form.append('file', imageObject)
            fetch(`${api_url}servico/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
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

    const createImageProfessional = (uri: string, fileName: string): Promise<string> => {
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
                        qualidade: input.qualidade,
                        preco: input.preco,
                        agilidade: input.agilidade,
                        descricao: input.descricao,
                        uriImagens: input.uriImagens
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
                    console.log('Erro ao buscar a imagem:', e);
                    reject(e)
                });
        })
    }

    const getProfissoesAleatorias = (): Promise<ProfissaoOutput[]> => {
        return new Promise<ProfissaoOutput[]>((resolve, reject) => {
            ALLORequestBase<ProfissaoOutput[]>(token, verbosAPI.GET, 'profissao/aleatorias')
                .then((result) => {
                    resolve(result)
                })
                .catch((e) => {
                    console.log('Erro ao buscar profissões aleatórias:', e);
                    reject(e);
                })
        })
    }

    const getProfissoesMaisUtilizadas = (): Promise<ProfissaoOutput[]> => {
        return new Promise<ProfissaoOutput[]>((resolve, reject) => {
            ALLORequestBase<ProfissaoOutput[]>(token, verbosAPI.GET, 'profissao/destaques')
                .then((result) => {
                    resolve(result)
                })
                .catch((e) => {
                    console.log('Erro ao buscar profissões mais utilizadas:', e);
                    reject(e);
                })
        })
    }

    const getProvedorHighlights = (): Promise<ProvedorDestaqueOutput[]> => {
        return new Promise<ProvedorDestaqueOutput[]>((resolve, reject) => {
            ALLORequestBase<ProvedorDestaqueOutput[]>(token, verbosAPI.GET, 'provedor/melhoresAvaliados')
            .then((result) => {
                resolve(result);
            })
            .catch((e) => {
                console.log('Erro ao buscar profissionais melhores avaliados:', e);
                reject(e);
            })
        })
    }

    const getProvedorNotificacoes = (): Promise<NotificacaoOutput[]> => {
        return new Promise<NotificacaoOutput[]>((resolve, reject) => {
            ALLORequestBase<NotificacaoOutput[]>(token, verbosAPI.GET, 'notificacao')
            .then((result) => {
                resolve(result);
            })
            .catch((e) => {
                console.log('Erro ao buscar notificações:', e);
                reject(e);
            })
        })
    }

    return (
        <APIContext.Provider
            value={{
                getProvedorNotificacoes,
                getImageServico,
                updateImageProfessionalServico,
                getImageAvaliacao,
                getProfissoesMaisUtilizadas,
                getProfissoesAleatorias,
                getProvedoresByFilter,
                getPerfilCliente,
                getPerfilProfissional,
                updateProfessional,
                updateFavoriteReview,
                updateFavoriteProvider,
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
                createImageClient,
                updateImageProfessional,
                createImageProfessional,
                getImageProfessional,
                getServicosNaoVistosProfissional,
                feedbackServico,
                getServicosParaAvaliarCliente,
                createAvaliacao,
                registrarServico,
                getProvedorHighlights,
                uploadImageAvaliacao
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
