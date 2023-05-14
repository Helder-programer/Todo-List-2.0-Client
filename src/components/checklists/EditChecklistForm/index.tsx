import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface IChecklist {
    checklist_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}


interface IProps {
    show: boolean;
    handleClose(): void;
    update(id: number, name: string): Promise<void>;
    currentChecklist: IChecklist;
}


const EditChecklistForm = ({ show, handleClose, update, currentChecklist }: IProps) => {
    const [checklistName, setChecklistName] = useState<string>(currentChecklist.name);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await update(currentChecklist.checklist_id, checklistName);

        resetInputs();
        handleClose();
    }

    const resetInputs = () => {
        setChecklistName('');
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Checklist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Checklist name..."
                            autoComplete='off'
                            value={checklistName}
                            onChange={(event) => setChecklistName(event.target.value)}
                            required
                            autoFocus
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="button" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='text-light' type='submit'>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditChecklistForm;