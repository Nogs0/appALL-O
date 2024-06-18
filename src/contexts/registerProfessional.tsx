import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth";
import { Endereco, ProvedorInput, useAPI } from "./api";
import { TipoPessoaEnum } from "../shared/Enums/enums";

interface InitialInformations {
    razaoSocial: string,
    cpfCnpj: string,
    email: string,
    senha: string,
}

interface RegisterProfessionalContextData {
    profissional: ProvedorInput | null,
    loading: boolean,
    setInitialInformations(params: InitialInformations): void,
    setDescription(description: string): void,
    setServices(services: number[]): void,
    setEndereco(endereco: Endereco): void,
    setContacts(phoneNumber: string): void,
    setImages(images: any): void,
    endingRegister(): Promise<void>,
    clearProfessional(): void
}

const RegisterProfessionalContext = createContext<RegisterProfessionalContextData>({} as RegisterProfessionalContextData)

function RegisterProfessionalProvider({ children }: any) {

    const { endRegister } = useAuth();
    const { createProvider } = useAPI();

    const [profissional, setProfissional] = useState<ProvedorInput | null>({
        id: 0,
        email: '',
        senha: '',
        descricao: '',
        telefone: '',
        cpfCnpj: '',
        razaoSocial: '',
        tipoPessoa: TipoPessoaEnum.FISICA,
        enderecoInput: {
          cep: '',
          estado: '',
          cidade: '',
          bairro: '',
          logradouro: '',
          numero: ''
        },
        idProfissoes: [
          
        ],
        perfilImagem: '',
        servicoImagens: []
      });
    const [loading, setLoading] = useState<boolean>(false);

    function setInitialInformations(params: InitialInformations) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorInput;

            prev.razaoSocial = params.razaoSocial;
            prev.cpfCnpj = params.cpfCnpj;
            prev.email = params.email;
            prev.senha = params.senha
            return prev;
        });
    }

    function setDescription(descricao: string) {
        setProfissional((prev) => {
            if (!prev)
                prev = {} as ProvedorInput;

            prev.descricao = descricao;
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

    function endingRegister(): Promise<void> {
        setLoading(true);
        return new Promise<void>((resolve, reject) => {
            if (profissional) {
                console.log()
                console.log(profissional)
                console.log()
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
            id: undefined,
            razaoSocial: '',
            cpfCnpj: '',
            email: '',
            senha: '',
            idProfissoes: [],
            descricao: '',
            enderecoInput: {
                cep: '',
                estado: '',
                cidade: '',
                bairro: '',
                logradouro: '',
                numero: ''
            },
            telefone: '',
            tipoPessoa: TipoPessoaEnum.FISICA,
            perfilImagem: '',
            servicoImagens: [],
        });
        endRegister();
    }

    return (
        <RegisterProfessionalContext.Provider
            value={{ profissional, setInitialInformations, setDescription, setServices, setEndereco, setContacts, setImages, endingRegister, loading, clearProfessional }}>
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
