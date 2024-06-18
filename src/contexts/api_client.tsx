import React, { createContext, useContext } from 'react';
import ALLORequestBase, { api, verbosAPI } from '../services/api';
import { TipoPessoaEnum } from '../shared/Enums/enums';
import { ClienteInput } from './registerClient';

async function createClient(client: ClienteInput): Promise<void> {
    return new Promise<void>(async(resolve,reject) => {
    
        ALLORequestBase(verbosAPI.POST, 'cliente', client)
        .then(() => {
            resolve();
        })
        .catch(() => {
            reject()
        })
    })
}
export {createClient}