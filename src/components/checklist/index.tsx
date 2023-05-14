import React, { useState, useEffect } from 'react';
import { IChecklist } from '../../services/checklist';
import ChecklistService from '../../services/checklist';
import { Container, Row, Col } from 'react-bootstrap';
import TasksList from './tasks/list';
import '../../styles/Checklist.scss';

interface IProps {
    checklistId: string | undefined;
}


function Checklist({ checklistId }: IProps) {
    const [checklist, setChecklist] = useState<IChecklist>({ checklist_id: 0, name: '', created_at: '', updated_at: '', tasks: [] });

    const getChecklist = async () => {
        try {
            const searchedChecklist = await ChecklistService.findOneChecklist(Number(checklistId));
            setChecklist(searchedChecklist);
            console.log(searchedChecklist);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getChecklist();
    }, []);


    return (
        <>
            <Container className="pt-5" as='section'>
                <h2>Lista de Tarefas '{checklist.name}'</h2>
                <TasksList tasks={checklist.tasks!}/>
            </Container>
        </>
    );
}

export default Checklist;