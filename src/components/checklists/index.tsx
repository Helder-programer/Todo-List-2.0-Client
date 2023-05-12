import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ChecklistsList from './ChecklistsList';
import ChecklistService from '../../services/checklist';
import NewChecklistForm from './NewChecklistForm';
import EditChecklistForm from './EditChecklistForm';
import '../../styles/Checklists.scss';

interface IChecklist {
    checklist_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

function Checklists() {
    const [checklists, setChecklists] = useState<IChecklist[]>([]);
    const [newChecklistFormShow, setNewChecklistFormShow] = useState<boolean>(false);
    const [editChecklistFormShow, setEditChecklistFormShow] = useState<boolean>(false);
    const [currentChecklist, setCurrentChecklist] = useState<IChecklist>({ checklist_id: 0, name: '', created_at: '', updated_at: '' });

    useEffect(() => {
        getChecklists();
    }, []);



    const handleClose = () => {
        setNewChecklistFormShow(false);
        setEditChecklistFormShow(false)
    }

    const selectChecklist = (id: number) => {
        const checklist = checklists.find(checklist => {
            return checklist.checklist_id == id;
        });

        setCurrentChecklist(checklist!);
    }

    const create = async (name: string) => {
        try {
            await ChecklistService.create(name);
            await getChecklists();
        } catch (error) {
            console.log(error);
        }
    }

    const getChecklists = async () => {
        try {
            const checklists = await ChecklistService.index<IChecklist[]>();
            setChecklists(checklists);
        } catch (error) {
            console.log(error);

        }
    }


    const update = async (id: number, name: string) => {
        try {
            await ChecklistService.update(id, name);
            await getChecklists();
        } catch (error) {
            console.log(error);
        }
    }


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

                <ChecklistsList
                    checklists={checklists}
                    remove={remove}
                    selectChecklist={selectChecklist}
                    setShow={setEditChecklistFormShow}
                />

                <NewChecklistForm
                    show={newChecklistFormShow}
                    handleClose={handleClose}
                    create={create}
                />


                <EditChecklistForm
                    show={editChecklistFormShow}
                    handleClose={handleClose}
                    currentChecklist={currentChecklist}
                    update={update}
                />

            </Container>
        </>
    );
}

export default Checklists;