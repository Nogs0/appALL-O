import React, { createContext, useContext } from 'react';
import ALLORequestBase, { api, verbosAPI } from '../services/api';
import { TipoPessoaEnum } from '../shared/Enums/enums';

export interface ClienteInput {
    id: number,
    email: string,
    telefone: string,
    cpfCnpj: string,
    nome: string
    imagem: string
}

