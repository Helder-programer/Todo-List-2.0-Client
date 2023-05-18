import { ITask } from "./ITask";

export interface IChecklist {
    checklist_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    tasks: ITask[];
}
