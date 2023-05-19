import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ErrorText from '../../messages/error/errorText';
import { IAppError } from '../../../interfaces/IError';

interface IProps {
    createTask(name: string): Promise<void>;
}


const NewChecklistForm = ({ createTask }: IProps) => {
    const [checklistName, setChecklistName] = useState<string>('');
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });
    const [show, setShow] = useState<boolean>(false);


    const handleClose = () => {
        setShow(false);
        setError({ isError: false, message: '' });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await createTask(checklistName);
            resetForm();
            handleClose();
        } catch (err: any) {
            setError({ isError: true, message: err.message });
            console.log(err);
        }
    }

    const resetForm = () => {
        setChecklistName('');
    }

    return (
        <>
            <Button
                className='btn-custom-gray border'
                variant=''
                onClick={() => setShow(true)}
            >
                New Checklist
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Checklist</Modal.Title>
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

export default NewChecklistForm;