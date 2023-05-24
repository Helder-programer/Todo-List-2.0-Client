import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Stack, Badge } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

import { IChecklist } from '../../../interfaces/IChecklist';
import { IAppError } from '../../../interfaces/IError';
import EditChecklistForm from '../editChecklistForm';
import ErrorModal from '../../messages/error/modal';

interface IProps {
    checklists: IChecklist[];
    deleteChecklist(checklistId: number): Promise<void>;
    updateChecklist(checklistId: number, name: string): Promise<void>;
}

const List = ({ checklists, deleteChecklist, updateChecklist }: IProps) => {
    const navigate = useNavigate();
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });

    const handleDeleteChecklist = async (checklistId: number) => {

        try {
            await deleteChecklist(checklistId);

        } catch (err: any) {
            setError({ isError: true, message: err.message });
            console.log(err);
        }
    }

    return (
        <>
            <Stack className='pt-3' gap={4} as="section">
                {
                    error.isError && <ErrorModal message={error.message} />
                }
                {
                    checklists.map((currentChecklist, index) =>
                        <Card className="checklist-card" key={index}>
                            <Card.Header as="h6" className='fst-italic d-flex justify-content-between'>
                                <span>Checklist</span>

                                <div id="icons">
                                    <EditChecklistForm updateChecklist={updateChecklist} currentChecklist={currentChecklist} />
                                    <i className='text-danger' style={{ cursor: 'pointer' }}><FaTrash onClick={() => handleDeleteChecklist(currentChecklist.checklist_id)} /></i>
                                </div>
                            </Card.Header>
                            <Card.Body onClick={() => navigate(`/checklists/${currentChecklist.checklist_id}`)}>
                                <Card.Title>
                                    <Row>
                                        <Col className='d-flex flex-column'>
                                            <span className='fs-4 mb-4'>{currentChecklist.name}</span>
                                            <span className='font-small-light fw-light mb-1'><span className='me-2'>Created at:</span>{moment(currentChecklist.created_at).format('DD/MM/YYYY')}</span>
                                            <span className='font-small-light fw-light mb-2'><span className='me-2'>Updated at:</span>{moment(currentChecklist.updated_at).format('DD/MM/YYYY')}</span>
                                            <Badge bg="primary" className='font-small-light checklist-task-quantity fw-semibold'><span className='me-2'>Tasks:</span>{currentChecklist.tasks.length}</Badge>
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

export default List;