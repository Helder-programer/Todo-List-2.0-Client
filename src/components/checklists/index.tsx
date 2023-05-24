import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import List from './list';
import { IChecklist } from '../../interfaces/IChecklist';
import { IAppError } from '../../interfaces/IError';
import ChecklistService from '../../services/checklist';
import NewChecklistForm from './newChecklistForm';
import ErrorModal from '../messages/error/modal';
import '../../styles/Checklists.scss';


function Checklists() {
    const [checklists, setChecklists] = useState<IChecklist[]>([]);
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });

    useEffect(() => {
        getChecklists();
    }, []);

    const createChecklist = async (name: string) => {
        await ChecklistService.create(name);
        await getChecklists();
    }

    const getChecklists = async () => {
        try {
            const checklists = await ChecklistService.index();
            setChecklists(checklists);
        } catch (err: any) {
            setError({ isError: true, message: err.message });
            console.log(err);
        }
    }


    const updateChecklist = async (checklistId: number, name: string) => {
        await ChecklistService.update(checklistId, name);
        await getChecklists();
    }


    const deleteChecklist = async (checklistId: number) => {
        await ChecklistService.delete(checklistId);
        await getChecklists();
    }



    return (
        <>
            <Container className='pt-5' as='main'>
                <Row className='flex-row align-items-center'>
                    {
                        error.isError && <ErrorModal message={error.message} />
                    }
                    <Col>
                        <h1>Your Checklists</h1>
                    </Col>
                    <Col md="auto">
                        <NewChecklistForm 
                        createTask={createChecklist} 
                        />
                    </Col>
                </Row>

                <List
                    checklists={checklists}
                    deleteChecklist={deleteChecklist}
                    updateChecklist={updateChecklist}
                />

            </Container>
        </>
    );
}

export default Checklists;