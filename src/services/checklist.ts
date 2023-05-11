import Api from './api';

class ChecklistService {
    public async index<T>(): Promise<T> {
        const token = JSON.parse(localStorage.getItem('token') ?? '');

        const response = await Api.get<T>('/checklists/', {
            headers: { 'access-token': token }
        });

        return response.data;
    }

    public async delete(id: number): Promise<void> {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        const response = await Api.delete<{ message: string }>(`checklists/${id}`, {
            headers: { 'access-token': token }
        });
    }
}


export default new ChecklistService;