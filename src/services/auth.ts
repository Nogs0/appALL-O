export interface SignInInput {
    email: string,
    password: string,
    isProfessional: boolean
}

interface Response {
    token: string,
    user: {
        id: number,
        name: string,
        email: string
    },
    isProfessional: boolean
}

export function signIn(input: SignInInput) {
    return new Promise<Response>((resolve) => {
        setTimeout(() => {
            let info = {
                token: 'logado',
                user : {
                    id: 2,
                    name: 'Joao',
                    email: input.email,
                },
                isProfessional: input.isProfessional
            };
            resolve(info);
        }, 1000);
    });
}