import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface IProps {
    show: boolean;
    handleClose(): void;
    create(name: string): void;
}


const NewChecklistForm = ({show, handleClose}: IProps) => {



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Checklist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Checklist Name"
                            autoComplete='off'
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="" className='btn-custom-blue' onClick={handleClose}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewChecklistForm;