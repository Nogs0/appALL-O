import axios from 'axios';

// https://viacep.com.br/ws/01001000/json/
const cepAPI = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
})

interface CEPAPIAddress {
    erro: boolean,
    cep: string,
    uf: string,
    localidade: string,
    logradouro: string,
    bairro: string
}

export default async function getAddress(cep: string): Promise<CEPAPIAddress> {
    return new Promise<CEPAPIAddress>(async (resolve, reject) => {
        try {
            cepAPI.get<CEPAPIAddress>(`/${cep.replace('.', '').replace('-', '')}/json`)
            .then((response) => {
                if (response.data.erro)
                    reject();
                resolve(response.data);
            }).catch((e) => {
                reject();
            });
        }
        catch (e) {
            reject(e);
        }
    })
}