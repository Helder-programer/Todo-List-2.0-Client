import Api from './api';
import { IChecklist } from '../interfaces/IChecklist';

class ChecklistService {
    public async create(name: string): Promise<void> {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        await Api.post('/checklists', { name }, {
            headers: { 'access-token': token }
        });
    }

    public async index(): Promise<IChecklist[]> {
        const token = JSON.parse(localStorage.getItem('token') ?? '');

        const response = await Api.get<IChecklist[]>('/checklists', {
            headers: { 'access-token': token }
        });

        return response.data;
    }

    public async update(id: number, name: string) {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        await Api.put(`/checklists/${id}`, { name }, {
            headers: { 'access-token': token }
        });
    }

    public async delete(id: number): Promise<void> {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        await Api.delete(`/checklists/${id}`, {
            headers: { 'access-token': token }
        });
    }

    public async findOneChecklist(id: number): Promise<IChecklist> {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        const response = await Api.get(`/checklists/${id}`, {
            headers: { 'access-token': token }
        });
        return response.data;
    }
}


export default new ChecklistService;