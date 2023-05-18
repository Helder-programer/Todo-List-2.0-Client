import Api from "./api";

interface IUser {
    user_id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}


export interface ILoginDTO {
    email: string;
    password: string;
}

export interface IRegisterDTO {
    username: string;
    email: string;
    password: string;
}

class AuthService {
    public async login(params: ILoginDTO) {

        let response = await Api.post<{ token: string, user: IUser }>('/users/login', params);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user));


    }

    public async register(params: IRegisterDTO) {
        await Api.post('/users/', params);
    }

    public logout() {
        localStorage.clear();
    }
}


export default new AuthService;