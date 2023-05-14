import Api from "./api";

export interface ITask {
    task_id: number;
    description: string;
    done: number;
    priority: number;
    limit_date: string;
    created_at: string;
    updated_at: string;
}


class TaskService {
    public async create(checklistId: number, params: { description: string, priority: number, limitDate: string }): Promise<void> {
        const token = JSON.parse(localStorage.getItem('token') ?? '');

        await Api.post(`/checklists/${checklistId}/tasks`, params, {
            headers: { 'access-token': token }
        });
    }

    public async setTaskAsDone(checklistId: number, taskId: number) {
        const token = JSON.parse(localStorage.getItem('token') ?? '');

        await Api.patch(`/checklists/${checklistId}/tasks/${taskId}`, {}, {
            headers: { 'access-token': token }
        });
    }



    public async delete(id: number): Promise<void> {

    }
}


export default new TaskService;