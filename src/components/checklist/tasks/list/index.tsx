import React, { useState } from 'react';
import { Stack, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';

import { ITask } from '../../../../interfaces/ITask';
import { AiOutlineCheck } from 'react-icons/ai';
import { IAppError } from '../../../../interfaces/IError';
import ErrorModal from '../../../messages/error/modal';

interface IProps {
    tasks: ITask[];
    setTaskAsDone(taskId: number): Promise<void>;
    deleteTask(taskId: number): Promise<void>;
}

const List = ({ tasks, setTaskAsDone, deleteTask }: IProps) => {
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });

    const handleSetTaskAsDone = async (taskId: number) => {
        try {
            await setTaskAsDone(taskId);
        } catch (err: any) {
            setError({ isError: true, message: err.message })
            console.log(err);
        }
    }


    const handleDeleteTask = async (taskId: number) => {
        try {
            await deleteTask(taskId);
        } catch (err: any) {
            setError({ isError: true, message: err.message });
            console.log(err);
        }
    }



    return (
        <Stack className="pt-4">
            {
                error.isError && <ErrorModal message={error.message}/>
            }
            {tasks.map((currentTask, index) =>
                <div className="task" key={index}>
                    <Row className='align-items-center px-3 mt-4'>
                        <Col md="auto">
                            <input
                                type="checkbox"
                                className="task-checkbox"
                                style={{ display: 'none' }}
                                id={`task-checkbox-${index}`}
                                checked={!!currentTask.done}
                            />
                            <label
                                className="d-flex justify-content-center align-items-center"
                                htmlFor={`task-checkbox-${index}`}
                                onClick={() => handleSetTaskAsDone(currentTask.task_id)}
                            >
                                {!!currentTask.done && <i><AiOutlineCheck /></i>}
                            </label>
                        </Col>
                        <Col>
                            <h4 className={`mb-0 ${currentTask.priority == 1 ? 'text-danger' : ''}`}>{currentTask.description}</h4>

                            <div className="task-informations">
                                <span className="font-small-light me-3">Criação: {moment(currentTask.created_at).format('DD/MM/YYYY')}</span>
                                <span className="font-small-light">Limite: {currentTask.limit_date ? moment(currentTask.limit_date).format('DD/MM/YYYY') : 'Nenhum'}</span>
                            </div>
                        </Col>
                        <Col md="auto">
                            <i className='text-danger' style={{ cursor: 'pointer' }} onClick={() => handleDeleteTask(currentTask.task_id)}><FaTrash /></i>
                        </Col>
                    </Row>
                    <hr className="mt-1" />
                </div>
            )}
        </Stack>
    );
}

export default List;