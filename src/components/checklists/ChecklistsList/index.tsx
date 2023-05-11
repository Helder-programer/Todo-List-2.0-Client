import React from 'react';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

interface IChecklist {
    checklist_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    checklists: IChecklist[];
    remove(id: number): Promise<void>;
}

const ChecklistsList: React.FC<Props> = ({ checklists, remove }) => {

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
                                        <Col>
                                            {checklist.name}
                                        </Col>
                                        <Col md="auto">
                                            <i className='text-danger' style={{cursor: 'pointer'}}><FaTrash onClick={() => remove(checklist.checklist_id)}/></i>
                                        </Col>
                                    </Row>
                                </Card.Title>
                                <Card.Text>

                                </Card.Text>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>
                    )
                }
            </Stack>


        </>
    );
}

export default ChecklistsList;