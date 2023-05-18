import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { AiFillEdit } from 'react-icons/ai';

import ErrorText from '../../messages/error/errorText';
import { IAppError } from '../../../interfaces/IError';

interface IChecklist {
    checklist_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}


interface IProps {
    update(checklistId: number, name: string): Promise<void>;
    currentChecklist: IChecklist;
}


const EditChecklistForm = ({ update, currentChecklist }: IProps) => {
    const [checklistName, setChecklistName] = useState<string>(currentChecklist.name);
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });
    const [show, setShow] = useState<boolean>(false);


    const handleClose = () => {
        setShow(false);
        setError({ isError: false, message: '' });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await update(currentChecklist.checklist_id, checklistName);
            handleClose();
            resetInputs();
        } catch (err: any) {
            setError({ isError: true, message: err.message });
            console.log(err);
        }

    }

    const resetInputs = () => {
        setChecklistName('');
    }


    return (
        <>
        <i className='text-warning me-2' style={{ cursor: 'pointer' }} onClick={() => setShow(true)}><AiFillEdit /></i>
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
                                onChange={event => setChecklistName(event.target.value)}

                            />
                        </Form.Group>
                        {error.isError && <ErrorText message={error.message} />}
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
        </>
    );
}

export default EditChecklistForm;