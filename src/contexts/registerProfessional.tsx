import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth";
import { Endereco, ProvedorCadastroInput, useAPI } from "./api";
import { TipoPessoaEnum, UsuarioRole } from "../shared/Enums/enums";
import md5 from 'md5';

interface InitialInformationsProfessional {
    razaoSocial: string,
    cpfCnpj: string,
    email: string,
    senha: string,
}

interface RegisterProfessionalContextData {
    profissional: ProvedorCadastroInput | null,
    loading: boolean,
    setInitialInformations(params: InitialInformationsProfessional): void,
    setDescription(description: string): void,
    setProfissao(profissaoId: number): void,
    setEndereco(endereco: Endereco): void,
    setContacts(phoneNumber: string): void,
    setImages(images: string[]): void,
    endingRegister(): Promise<void>,
    clearProfessional(): void,
    setProfilePic(path: string): void
}

const RegisterProfessionalContext = createContext<RegisterProfessionalContextData>({} as RegisterProfessionalContextData)

function RegisterProfessionalProvider({ children }: any) {

    const { endRegister } = useAuth();
    const { createProvider } = useAPI();

    const [profissional, setProfissional] = useState<ProvedorCadastroInput | null>({
        usuario: {
            login: '',
            senha: '',
            role: UsuarioRole.PROVEDOR
        },
        provedor: {

            id: 0,
            razaoSocial: '',
            cpfCnpj: '',
            email: '',
            idProfissao: 0,
            perfilProvedorInput: {
                idProvedor: 0,
                descricao: '',
                perfilImage: ''
            },
            enderecoInput: {
                id: 0,
                cep: '',
                estado: '',
                cidade: '',
                bairro: '',
                logradouro: '',
                numero: ''
            },
            telefone: '',
            tipoPessoa: TipoPessoaEnum.FISICA,
            servicoImagens: [],
        }
    });
    const [loading, setLoading] = useState<boolean>(false);

    function setInitialInformations(params: InitialInformationsProfessional) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorCadastroInput;

            prev.provedor.razaoSocial = params.razaoSocial;
            prev.provedor.cpfCnpj = params.cpfCnpj;
            prev.provedor.email = params.email;
            prev.usuario = {
                login: params.email,
                senha: params.senha,
                role: UsuarioRole.PROVEDOR
            };
            return prev;
        });
    }

    function setDescription(descricao: string) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorCadastroInput;

            prev.provedor.perfilProvedorInput.descricao = descricao;
            return prev;
        });
    }

    function setProfissao(profissaoId: number) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorCadastroInput;
            prev.provedor.idProfissao = profissaoId;
            return prev;
        });
    }

    function setEndereco(endereco: Endereco) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorCadastroInput;

            prev.provedor.enderecoInput = endereco;
            return prev;
        });
    }

    function setContacts(telefone: string) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorCadastroInput;

            prev.provedor.telefone = telefone;
            return prev;
        });
    }

    function setImages(images: string[]) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorCadastroInput;

            prev.provedor.servicoImagens = images;
            return prev;
        });
    }

    function setProfilePic(path: string) {
        setProfissional((prev) => {
            if (!prev) prev = {} as ProvedorCadastroInput;
            prev.provedor.perfilProvedorInput.perfilImage = path;
            return prev;
        });
    }

    function endingRegister(): Promise<void> {
        setLoading(true);
        return new Promise<void>((resolve, reject) => {
            if (profissional) {
                createProvider(profissional)
                    .then(() => {
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    })
            }
            setLoading(false);
        });
    }

    function clearProfessional(): void {
        setProfissional({
            usuario: {
                login: '',
                senha: '',
                role: UsuarioRole.PROVEDOR
            },
            provedor: {
    
                id: 0,
                razaoSocial: '',
                cpfCnpj: '',
                email: '',
                idProfissao: 0,
                perfilProvedorInput: {
                    idProvedor: 0,
                    descricao: '',
                    perfilImage: ''
                },
                enderecoInput: {
                    id: 0,
                    cep: '',
                    estado: '',
                    cidade: '',
                    bairro: '',
                    logradouro: '',
                    numero: ''
                },
                telefone: '',
                tipoPessoa: TipoPessoaEnum.FISICA,
                servicoImagens: [],
            }
        });
        endRegister();
    }

    return (
        <RegisterProfessionalContext.Provider
            value={{ profissional, setInitialInformations, setDescription, setProfissao, setEndereco, setContacts, setImages, endingRegister, loading, clearProfessional, setProfilePic }}>
            {children}
        </RegisterProfessionalContext.Provider>
    )
}

function useRegisterProfessional() {
    const context = useContext(RegisterProfessionalContext);

    if (!context)
        throw new Error('useRegisterProfessional must be used with in RegisterProfessionalProvider.');

    return context;
}

export { RegisterProfessionalProvider, useRegisterProfessional };
