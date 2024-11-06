import axios from 'axios';
import { Endereco } from '../contexts/api';
import configDefault from './config-default';

const latLongAPI = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?address='
})

interface Response {
    results: any[],
    status: string
}
interface LatLongInput {

}

interface LatLongOutput {
    latitude: string,
    longitude: string
}

export default async function getLatLong(endereco: Endereco): Promise<LatLongOutput> {
    return new Promise<LatLongOutput>(async (resolve, reject) => {
        try {
            let address = getFormattedParameters([endereco.numero, endereco.logradouro, endereco.cidade, endereco.estado]);
            latLongAPI.get<Response>(address)
                .then((response) => {
                    if (response.data.status != 'OK')
                        reject(`Erro ao buscar endereço!`);
                    else {
                        let addressObjects = response.data.results[0];
                        resolve({
                            latitude: addressObjects.geometry.location.lat,
                            longitude: addressObjects.geometry.location.lng
                    });
                    }
                }).catch((e) => {
                    reject();
                });
        }
        catch (e) {
            reject(e);
        }
    })
}

function getFormattedParameters(args: string[]): string {
    let parameters = ''
    for (let i = 0; i < args.length; i++) {
        if (i < args.length)
            parameters += args[i] + '+';
        else parameters += args[i]
    }

    console.log('\n\n', parameters + `&key=${configDefault.google_key}`, '\n\n');
    return parameters + `&key=${configDefault.google_key}`;
}