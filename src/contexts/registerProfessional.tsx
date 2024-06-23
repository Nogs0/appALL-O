import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth";
import { Endereco, ProvedorInput, useAPI } from "./api";
import { TipoPessoaEnum } from "../shared/Enums/enums";
import md5 from 'md5';

interface InitialInformationsProfessional {
    razaoSocial: string,
    cpfCnpj: string,
    email: string,
    senha: string,
}

interface RegisterProfessionalContextData {
    profissional: ProvedorInput | null,
    loading: boolean,
    setInitialInformations(params: InitialInformationsProfessional): void,
    setDescription(description: string): void,
    setServices(services: number[]): void,
    setEndereco(endereco: Endereco): void,
    setContacts(phoneNumber: string): void,
    setImages(images: any): void,
    endingRegister(): Promise<void>,
    clearProfessional(): void,
    setProfilePic(path: string): void
}

const RegisterProfessionalContext = createContext<RegisterProfessionalContextData>({} as RegisterProfessionalContextData)

function RegisterProfessionalProvider({ children }: any) {

    const { endRegister } = useAuth();
    const { createProvider } = useAPI();

    const [profissional, setProfissional] = useState<ProvedorInput | null>({
        id: 0,
        senha: '',
        razaoSocial: '',
        cpfCnpj: '',
        email: '',
        idProfissoes: [],
        perfilProvedorInput: {
            idProvedor: 0,
            idAvaliacao: 0,
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
    });
    const [loading, setLoading] = useState<boolean>(false);

    function setInitialInformations(params: InitialInformationsProfessional) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorInput;

            prev.razaoSocial = params.razaoSocial;
            prev.cpfCnpj = params.cpfCnpj;
            prev.email = params.email;
            console.log(md5(params.senha));
            prev.senha = md5(params.senha);
            return prev;
        });
    }

    function setDescription(descricao: string) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorInput;

            prev.perfilProvedorInput.descricao = descricao;
            return prev;
        });
    }

    function setServices(profissoes: number[]) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorInput;
            prev.idProfissoes = profissoes;
            return prev;
        });
    }

    function setEndereco(endereco: Endereco) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorInput;

            prev.enderecoInput = endereco;
            return prev;
        });
    }

    function setContacts(telefone: string) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorInput;

            prev.telefone = telefone;
            return prev;
        });
    }

    function setImages(images: any) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorInput;

            prev.servicoImagens = images;
            return prev;
        });
    }

    function setProfilePic(path: string) {
        setProfissional((prev) => {
            if (!prev) prev = {} as ProvedorInput;
            prev.perfilProvedorInput.perfilImage = path;
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
            id: 0,
            senha: '',
            razaoSocial: '',
            cpfCnpj: '',
            email: '',
            idProfissoes: [],
            perfilProvedorInput: {
                idProvedor: 0,
                idAvaliacao: 0,
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
        });
        endRegister();
    }

    return (
        <RegisterProfessionalContext.Provider
            value={{ profissional, setInitialInformations, setDescription, setServices, setEndereco, setContacts, setImages, endingRegister, loading, clearProfessional, setProfilePic }}>
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
