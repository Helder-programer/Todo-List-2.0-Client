import React from 'react';
import { ITask } from '../../../../services/tasks';
import { Stack, Row, Col } from 'react-bootstrap';
import moment from 'moment';

interface IProps {
    tasks: ITask[];
}

const TasksList = ({ tasks }: IProps) => {
    return (
        <Stack className="pt-5">
            {tasks.map((currentTask, index) =>
                <div className="task" key={index}>
                    <Row className='align-items-center'>
                        <Col md="auto">
                            <label className="checklist-name" htmlFor={`task-checkbox-${index}`}></label>
                            <input type="checkbox" style={{ display: 'none' }} id={`task-checkbox-${index}`} />
                        </Col>
                        <Col>

                            <h4 className={`mb-0 ${currentTask.priority == 1 ? 'text-danger': ''}`}>{currentTask.description}</h4>

                            <div className="task-informations">
                                <span className="font-small-light me-3">Criação: {moment(currentTask.created_at).format('DD/MM/YYYY')}</span>
                                <span className="font-small-light">Limite: {moment(currentTask.limit_date).format('DD/MM/YYYY')}</span>
                            </div>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                    <hr className="mt-1"/>
                </div>
            )}
        </Stack>
    );
}

export default TasksList;