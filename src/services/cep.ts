import axios from 'axios';

// https://viacep.com.br/ws/01001000/json/
const cepAPI = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
})

interface CEPAPIAddress {
    cep: string,
    uf: string,
    localidade: string,
    logradouro: string,
    bairro: string
}

export default async function getAddress(cep: string): Promise<CEPAPIAddress> {
    return new Promise<CEPAPIAddress>(async (resolve, reject) => {
        try {
            let response = await cepAPI.get<CEPAPIAddress>(`/${cep.replace('.', '').replace('-', '')}/json`);
            resolve(response.data);
        }
        catch(e) {
            reject(e);
        }
    })
}