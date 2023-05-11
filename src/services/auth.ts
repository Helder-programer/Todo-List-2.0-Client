import Api from "./api";

interface IUser {
    user_id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

const AuthService = {
    login: async (params: { email: string, password: string }) => {
        let response = await Api.post<{ token: string, user: IUser }>('/users/login', params);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user));
    },
    register: async (params: { username: string, email: string, password: string }) => {
        await Api.post('/users/register', params);
    }
}


export default AuthService;