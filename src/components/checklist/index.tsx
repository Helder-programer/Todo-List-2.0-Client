import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { IChecklist } from '../../services/checklist';
import ChecklistService from '../../services/checklist';
import TasksList from './tasks/list';
import NewTaskForm from './tasks/newTaskForm';
import TaskService from '../../services/task';
import '../../styles/Checklist.scss';
import SearchTask from './tasks/search';


interface IProps {
    checklistId: string | undefined;
}


function Checklist({ checklistId }: IProps) {
    const [currentChecklist, setCurrentChecklist] = useState<IChecklist>({ checklist_id: 0, name: '', created_at: '', updated_at: '', tasks: [] });
    const [showNewTaskForm, setShowNewTaskForm] = useState<boolean>(false);

    const getChecklist = async () => {
        try {
            const searchedChecklist = await ChecklistService.findOneChecklist(Number(checklistId));
            setCurrentChecklist(searchedChecklist);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getChecklist();
    }, []);


    const handleClose = () => {
        setShowNewTaskForm(false);
    }



    const create = async (params: { description: string, priority: number, limitDate: string }) => {
        try {
            await TaskService.create(currentChecklist.checklist_id, params);
            await getChecklist();
        } catch (error) {
            console.log(error);
        }
    }


    const setTaskAsDone = async (taskId: number) => {
        try {
            await TaskService.setTaskAsDone(currentChecklist.checklist_id, taskId);
            await getChecklist();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Container className="pt-5" as='section'>
                <Row className='flex-row align-items-center'>
                    <Col>
                        <h3>Checklist '{currentChecklist.name}'</h3>
                    </Col>
                    <Col md="auto">
                        <Button
                            className='btn-custom-gray border'
                            variant=''
                            onClick={() => setShowNewTaskForm(true)}
                        >
                            New Task
                        </Button>
                    </Col>
                </Row>
                <SearchTask/>


                <TasksList
                    tasks={currentChecklist.tasks!}
                    setTaskAsDone={setTaskAsDone}
                />


                <NewTaskForm
                    show={showNewTaskForm}
                    handleClose={handleClose}
                    create={create}
                />
            </Container>
        </>
    );
}

export default Checklist;