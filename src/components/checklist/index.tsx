import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { IChecklist } from '../../interfaces/IChecklist';
import { ITask } from '../../interfaces/ITask';
import { IAppError } from '../../interfaces/IError';
import ChecklistService from '../../services/checklist';
import TasksList from './tasks/list';
import NewTaskForm from './tasks/newTaskForm';
import TaskService, { ISeachTaskDTO, ICreateTaskDTO } from '../../services/task';
import SearchTask from './tasks/search';
import ErrorModal from '../messages/error/modal';
import '../../styles/Checklist.scss';


interface IProps {
    checklistId: string | undefined;
}


function Checklist({ checklistId }: IProps) {
    const [currentChecklist, setCurrentChecklist] = useState<IChecklist>({ checklist_id: 0, name: '', created_at: '', updated_at: '', tasks: [] });
    const [tasks, setTasks] = useState<ITask[]>(currentChecklist.tasks);
    const [currentFilters, setCurrentFilters] = useState<ISeachTaskDTO>({ description: '', done: -1, priority: -1 });
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });
    const navigate = useNavigate();

    const getChecklist = async () => {
        try {
            const searchedChecklist = await ChecklistService.findOneChecklist(Number(checklistId));
            setCurrentChecklist(searchedChecklist);
            setTasks(searchedChecklist.tasks);
        } catch (err: any) {
            setError({ isError: true, message: err.message });
            console.log(err);
        }
    }

    useEffect(() => {
        getChecklist();
    }, []);


    const createTask = async (params: ICreateTaskDTO) => {
        await TaskService.create(currentChecklist.checklist_id, params);
        await getChecklist();
    }


    const setTaskAsDone = async (taskId: number) => {
        await TaskService.setTaskAsDone(currentChecklist.checklist_id, taskId);
        await searchTasks(currentFilters);
    }

    const searchTasks = async (params: ISeachTaskDTO) => {
        try {
            const searchedTasks = await TaskService.searchTask(currentChecklist.checklist_id, params);
            setTasks(searchedTasks);
            console.log(currentFilters);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (taskId: number) => {
        await TaskService.deleteTask(currentChecklist.checklist_id, taskId);
        await searchTasks(currentFilters);
    }


    return (
        <>
            <Container className="pt-5" as='section'>
                <Row className='flex-row align-items-center'>
                    <Col>
                        {
                            error.isError && <ErrorModal message={error.message} />
                        }
                        <h3>Checklist '{currentChecklist.name}'</h3>
                    </Col>
                    <Col md="auto">
                        <NewTaskForm
                            create={createTask}
                        />
                    </Col>
                    <Col md="auto">
                        <Button variant="outline-primary" onClick={() => navigate('/checklists')}>Your Checklists</Button>
                    </Col>
                </Row>
                <SearchTask
                    currentFilters={currentFilters}
                    setCurrentFilters={setCurrentFilters}
                    searchTasks={searchTasks}
                />


                <TasksList
                    tasks={tasks}
                    setTaskAsDone={setTaskAsDone}
                    deleteTask={deleteTask}
                />
            </Container>
        </>
    );
}

export default Checklist;