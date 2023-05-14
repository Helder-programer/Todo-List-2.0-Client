import React, { Dispatch, SetStateAction } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';

import { IChecklist } from '../../../services/checklist';

interface IProps {
    checklists: IChecklist[];
    remove(id: number): Promise<void>;
    selectChecklist(id: number): void;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const ChecklistsList = ({ checklists, remove, selectChecklist, setShow }: IProps) => {
    const navigate = useNavigate();

    return (
        <>
            <Stack className='pt-3' gap={4}>
                {
                    checklists.map((currentChecklist, index) =>
                        <Card className="checklist-card" key={index}>
                            <Card.Header as="h6" className='fst-italic d-flex justify-content-between'>
                                <span>Checklist</span>

                                <div id="icons">
                                    <i className='text-warning me-2' style={{ cursor: 'pointer' }} onClick={() => { selectChecklist(currentChecklist.checklist_id); setShow(true) }}><AiFillEdit /></i>
                                    <i className='text-danger' style={{ cursor: 'pointer' }}><FaTrash onClick={() => remove(currentChecklist.checklist_id)} /></i>
                                </div>
                            </Card.Header>
                            <Card.Body onClick={() => navigate(`/checklists/${currentChecklist.checklist_id}`)}>
                                <Card.Title>
                                    <Row>
                                        <Col className='d-flex flex-column'>
                                            <span className='fs-4 mb-4'>{currentChecklist.name}</span>
                                            <span className='font-small-light fw-light mb-2'><span className='me-2'>Created at:</span>{moment(currentChecklist.created_at).format('DD/MM/YYYY')}</span>
                                            <span className='font-small-light fw-light mb-2'><span className='me-2'>Updated at:</span>{moment(currentChecklist.updated_at).format('DD/MM/YYYY')}</span>
                                            <span className='font-small-light fw-semibold'><span className='me-2'>Tasks quantity:</span>{currentChecklist.tasks.length}</span>

                                        </Col>
                                    </Row>
                                </Card.Title>
                                <Card.Text>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )
                }
            </Stack>
        </>
    );
}

export default ChecklistsList;