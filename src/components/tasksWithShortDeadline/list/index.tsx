import React from 'react';
import { Button, Col, OverlayTrigger, Popover, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GoChecklist } from 'react-icons/go';
import moment from 'moment';

import { ITask } from '../../../interfaces/ITask';


interface IProps {
    tasksWithShortDeadline: ITask[];
}


const List = ({ tasksWithShortDeadline }: IProps) => {
    const navigate = useNavigate();

    return (
        <>
            <Stack className="pt-4" as="section">
                {
                    tasksWithShortDeadline.map((currentTask, index) => (
                        <div className="task" key={index}>
                            <Row className='align-items-center px-3 mt-4'>
                                <Col className="justify-content-center">
                                    <h4 className={`mb-0 ${currentTask.priority == 1 ? 'text-danger' : ''}`}>{currentTask.description}</h4>

                                    <div className="task-informations">
                                        <span className="font-small-light me-3">Created At: {moment(currentTask.created_at).format('DD/MM/YYYY')}</span>
                                        <span className="font-small-light fw-semibold text-danger">Limit: {currentTask.limit_date ? moment(currentTask.limit_date).format('DD/MM/YYYY') : 'Nenhum'}</span>
                                    </div>
                                </Col>

                                <Col md="auto">

                                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={

                                        <Popover id="checklist-popover">
                                            <Popover.Header as="h3">Checklist</Popover.Header>
                                            <Popover.Body>
                                                <span className="checklist-name">Name: <strong className="fw-semibold">{currentTask.checklist?.name}</strong></span>
                                            </Popover.Body>
                                        </Popover>

                                    }>
                                        <i className='text-primary fs-4' style={{ cursor: 'pointer' }} onClick={() => navigate(`/checklists/${currentTask.checklist_id}`)}><GoChecklist /></i>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            <hr className="mt-1" />
                        </div>
                    ))
                }
            </Stack>
        </>
    );
}

export default List;