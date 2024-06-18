import axios from 'axios';

export enum verbosAPI {
    GET = 1,
    POST = 2,
    PUT = 3,
    DELETE = 4
}

export const api = axios.create({
    baseURL: 'http://192.168.15.68:8080/api/allo/',
})

const token = ''

export default function ALLORequestBase<T>(method: verbosAPI, url: string, params?: any): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        switch (method) {
            case verbosAPI.GET:
                try {
                    if (params) {
                        url = `${url}?id=${params.id}`
                    }

                    await api.get(url).then((result) => {
                        resolve(result.data.content);
                    })
                        .catch((e) => {
                            reject(e);
                        })
                }
                catch (e) {
                    throw e;
                }
                break;
            case verbosAPI.POST:
                try {
                    api.post(url, params)
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
                            'Authorization': token
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
                            'Authorization': token
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