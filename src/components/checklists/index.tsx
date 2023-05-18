import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import ChecklistsList from './list';
import ChecklistService from '../../services/checklist';
import NewChecklistForm from './newChecklistForm';
import { IChecklist } from '../../interfaces/IChecklist';
import '../../styles/Checklists.scss';
import ErrorModal from '../messages/error/modal';
import { IAppError } from '../../interfaces/IError';


function Checklists() {
    const [checklists, setChecklists] = useState<IChecklist[]>([]);
    const [currentChecklist, setCurrentChecklist] = useState<IChecklist>({ checklist_id: 0, name: '', created_at: '', updated_at: '', tasks: [] });
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });

    useEffect(() => {
        getChecklists();
    }, []);

    const selectChecklist = (checklistId: number) => {
        const checklist = checklists.find(checklist => {
            return checklist.checklist_id === checklistId;
        });

        setCurrentChecklist(checklist!);
    }

    const create = async (name: string) => {
        await ChecklistService.create(name);
        await getChecklists();
    }

    const getChecklists = async () => {
        try {
            const checklists = await ChecklistService.index<IChecklist[]>();
            setChecklists(checklists);
        } catch (err: any) {
            setError({ isError: true, message: err.message });
            console.log(err);
        }
    }


    const update = async (checklistId: number, name: string) => {
        await ChecklistService.update(checklistId, name);
        await getChecklists();
    }


    const remove = async (checklistId: number) => {
        await ChecklistService.delete(checklistId);
        await getChecklists();
    }



    return (
        <>
            <Container className='pt-5' as='section'>
                <Row className='flex-row align-items-center'>
                    {
                        error.isError && <ErrorModal message={error.message} />
                    }
                    <Col>
                        <h1>Your Checklists</h1>
                    </Col>
                    <Col md="auto">
                        <NewChecklistForm 
                        create={create} 
                        />
                    </Col>
                </Row>

                <ChecklistsList
                    checklists={checklists}
                    remove={remove}
                    update={update}
                    selectChecklist={selectChecklist}
                />

            </Container>
        </>
    );
}

export default Checklists;