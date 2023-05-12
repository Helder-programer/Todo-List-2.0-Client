import React, { Dispatch, SetStateAction } from 'react';
import moment from 'moment';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';

interface IChecklist {
    checklist_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface IProps {
    checklists: IChecklist[];
    remove(id: number): Promise<void>;
    selectChecklist(id: number): void;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const ChecklistsList = ({ checklists, remove, selectChecklist, setShow }: IProps) => {

    return (
        <>
            <Stack className='pt-3' gap={4}>
                {
                    checklists.map((checklist, index) =>
                        <Card key={index}>
                            <Card.Header as="h6" className='fst-italic'>Checklist</Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    <Row>
                                        <Col className='d-flex flex-column'>
                                            <span className='fs-4 mb-4'>{checklist.name}</span>
                                            <span className='fs-6 fw-light mb-2'>Criação:     {moment(checklist.created_at).format('DD/MM/YYYY')}</span>
                                            <span className='fs-6 fw-light'>Atualização:     {moment(checklist.updated_at).format('DD/MM/YYYY')}</span>
                                        </Col>
                                        <Col md="auto" className='d-flex flex-column gap-3 justify-content-center' id='actions-to-checklist'>
                                            <i className='text-warning' style={{ cursor: 'pointer' }} onClick={() => { selectChecklist(checklist.checklist_id); setShow(true) }}><AiFillEdit /></i>
                                            <i className='text-danger' style={{ cursor: 'pointer' }}><FaTrash onClick={() => remove(checklist.checklist_id)} /></i>
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