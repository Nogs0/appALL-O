import axios from 'axios';
import configDev from './config-dev';

export enum verbosAPI {
    GET = 1,
    POST = 2,
    PUT = 3,
    DELETE = 4
}

export const api = axios.create({
    baseURL: configDev.api_url,
})

export const ALLORequestForm = (token: string, url: string, form: FormData): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        api.postForm(url, form,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((result) => {
                resolve(result.data);
            })
            .catch((e) => {
                console.log(e.request);
                reject(e);
            })
    })
}

export default function ALLORequestBase<T>(token: string, method: verbosAPI, url: string, params?: any): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        switch (method) {
            case verbosAPI.GET:
                try {
                    if (params)
                        url = `${url}?${params}`;

                    await api.get(url, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((result) => {
                            resolve(result.data);
                        })
                        .catch((e) => {
                            console.log(e.request)
                            reject(e);
                        })
                }
                catch (e) {
                    throw e;
                }
                break;
            case verbosAPI.POST:
                try {
                    api.post(url, params, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((result) => {
                            resolve(result.data.content)
                        })
                        .catch((e) => {
                            console.log(e.request)
                            reject(e);
                        })
                }
                catch (e) {
                    throw e;
                }
                break;
            case verbosAPI.PUT:
                try {
                    api.put(url, params, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((result) => {
                        resolve(result.data.content)
                    })
                        .catch((e) => {
                            reject(e);
                        })
                }
                catch (e) {
                    throw e;
                }
                break;
            case verbosAPI.DELETE:
                try {
                    api.delete(url, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((result) => {
                        resolve(result.data.content)
                    })
                        .catch((e) => {
                            reject(e);
                        })
                }
                catch (e) {
                    throw e;
                }
                break;
        }
    })
}
