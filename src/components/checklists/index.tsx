import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ChecklistsList from './ChecklistsList';
import ChecklistService from '../../services/checklist';
import NewChecklistForm from './NewChecklistForm';

interface IChecklist {
    checklist_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

function Checklists() {
    const [checklists, setChecklists] = useState<IChecklist[]>([]);
    const [newChecklistFormShow, setNewChecklistFormShow] = useState<boolean>(false);

    const handleClose = () => {
        setNewChecklistFormShow(false);
    }


    const getChecklists = async () => {
        try {
            const checklists = await ChecklistService.index<IChecklist[]>();
            setChecklists(checklists);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        const get = async () => {
            getChecklists();
        }

        get();

    }, []);


    const remove = async (id: number) => {
        try {
            try {
                await ChecklistService.delete(id);
                await getChecklists();
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const create = async (name: string) => {
        try {

        }catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <Container className='pt-5'>
                <Row className='flex-row align-items-center'>
                    <Col>
                        <h1>Listas de Tarefas</h1>
                    </Col>
                    <Col md="auto">
                        <Button
                            className='btn-custom-gray border'
                            variant=''
                            onClick={() => setNewChecklistFormShow(true)}
                        >
                            Nova Checklist
                        </Button>
                    </Col>
                </Row>

                <ChecklistsList checklists={checklists} remove={remove} />

                <NewChecklistForm show={newChecklistFormShow} handleClose={handleClose} create={create}/>

            </Container>
        </>
    );
}

export default Checklists;