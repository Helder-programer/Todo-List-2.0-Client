import React from 'react';
import Header from '../../components/header';
import Checklist from '../../components/checklist';
import { useParams } from 'react-router-dom';

function ChecklistPage() {
    const { checklistId } = useParams();

    return (
        <>
            <Header />
            <Checklist checklistId={checklistId} />
        </>
    );
}

export default ChecklistPage;