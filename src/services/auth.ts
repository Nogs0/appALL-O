interface Response {
    token: string,
    user: {
        id: number,
        name: string,
        email: string
    },
    isProfessional: boolean
}

export function signIn(professional: boolean) {
    return new Promise<Response>((resolve) => {
        setTimeout(() => {
            let info = {
                token: 'logado',
                user : {
                    id: 1,
                    name: 'Joao',
                    email: 'joao@gmail.com',
                },
                isProfessional: professional
            };
            resolve(info);
        }, 1000);
    });
}