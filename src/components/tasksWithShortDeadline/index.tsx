import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import ErrorModal from '../messages/error/modal';
import TaskService from '../../services/task';
import List from './list';
import { ITask } from '../../interfaces/ITask';
import { IAppError } from '../../interfaces/IError';
import '../../styles/TasksWithShortDeadline.scss';

function TasksWithShortDeadline() {
    const [tasksWithShortDeadline, setTasksWithShortDeadline] = useState<ITask[]>([]);
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });
    const navigate = useNavigate();

    const getTasksWithShortDeadline = async () => {
        const tasksWithShortDeadline = await TaskService.searchTasksWithShortDeadline();
        setTasksWithShortDeadline(tasksWithShortDeadline);
    }

    useEffect(() => {
        async function loadComponent() {
            await getTasksWithShortDeadline();
        }
        loadComponent();
    }, []);

    return (
        <>
            <Container className='pt-5' as='section'>
                <Row className='flex-row align-items-center'>
                    <Col>
                        {
                            error.isError && <ErrorModal message={error.message} />
                        }
                        <h3>Taks With Short Deadline</h3>
                    </Col>
                    <Col md="auto">
                        <Button variant="outline-primary" onClick={() => navigate('/checklists')}>Your Checklists</Button>
                    </Col>
                </Row>
                <List
                    tasksWithShortDeadline={tasksWithShortDeadline}
                />

            </Container>

        </>
    );
}

export default TasksWithShortDeadline;