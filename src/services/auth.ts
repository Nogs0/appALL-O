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
        let info = {
            token: 'logado',
            user: {
                id: 1,
                name: 'Joao',
                email: input.email,
            },
            isProfessional: input.isProfessional
        };
        resolve(info);
    });
}