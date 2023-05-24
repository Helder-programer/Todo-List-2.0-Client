import Api from "./api";
import { ITask } from "../interfaces/ITask";

export interface ISeachTaskDTO {
    description: string;
    priority: number;
    done: number;
}

export interface ICreateTaskDTO {
    description: string;
    priority: number;
    limitDate: string;
}


class TaskService {
    public async create(checklistId: number, params: ICreateTaskDTO) {
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


    public async searchTask(checklistId: number, params: ISeachTaskDTO) {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        let requestUrl = `/checklists/${checklistId}/tasks/?description=${params.description}`;

        if (params.done !== -1) requestUrl += `&done=${params.done}`;
        if (params.priority !== -1) requestUrl += `&priority=${params.priority}`;


        const response = await Api.get<ITask[]>(requestUrl, {
            headers: {
                'access-token': token,
            }
        });

        return response.data;
    }


    public async deleteTask(checklistId: number, taskId: number) {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        await Api.delete(`/checklists/${checklistId}/tasks/${taskId}`, {
            headers: { 'access-token': token }
        });
    }

    public async searchTasksWithShortDeadline() {
        const token = JSON.parse(localStorage.getItem('token') ?? '');
        const response = await Api.get<ITask[]>('/tasks/tasksWithShortDeadline', {
            headers: { 'access-token': token }
        });

        return response.data;
    }
}


export default new TaskService();