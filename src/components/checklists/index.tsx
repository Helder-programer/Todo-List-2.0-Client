import React, { useState, useEffect } from 'react';
import Header from '../header';
import List from './ChecklistsList';
import ChecklistsList from './ChecklistsList';
import ChecklistService from '../../services/checklist';
import { Container } from 'react-bootstrap';

interface IChecklist {
    checklist_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

function Checklists() {
    const [checklists, setChecklists] = useState<IChecklist[]>([]);

    const getChecklists = async() => {
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
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <Container className='pt-3'>
                <h1>Listas de Tarefas</h1>
                <ChecklistsList checklists={checklists} remove={remove} />
            </Container>
        </>
    );
}

export default Checklists;