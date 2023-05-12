import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface IProps {
    show: boolean;
    handleClose(): void;
    create(name: string): Promise<void>;
}


const NewChecklistForm = ({ show, handleClose, create }: IProps) => {
    const [checklistName, setChecklistName] = useState<string>('');


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await create(checklistName);        

        handleClose();
    }


    return (
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
                            placeholder="Checklist Name"
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
                    <Button variant="" type='submit' className='btn-custom-blue'>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default NewChecklistForm;