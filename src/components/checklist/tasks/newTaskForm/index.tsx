import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { IAppError } from '../../../../interfaces/IError';
import ErrorText from '../../../messages/error/errorText';

interface IProps {
    create(params: { description: string, priority: number, limitDate: string }): Promise<void>;
}

interface Iinputs {
    description: string;
    priority: number;
    limitDate: string;
}

const NewTaskForm = ({ create }: IProps) => {
    const [inputs, setInputs] = useState<Iinputs>({ description: '', priority: 0, limitDate: '' });
    const [error, setError] = useState<IAppError>({ isError: false, message: '' });
    const [show, setShow] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    }


    const resetInputs = () => {
        setInputs({ description: '', priority: 0, limitDate: '' });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await create({ description: inputs.description, priority: inputs.priority, limitDate: inputs.limitDate });
            handleClose();
            resetInputs();
        } catch (err: any) {
            setError({ isError: true, message: err.message });
            console.log(err);
        }
    }

    const handleClose = () => {
        setShow(false);
        setError({ isError: false, message: '' });
    }


    return (
        <>
            <Button
                className='btn-custom-gray border'
                variant=''
                onClick={() => setShow(true)}
            >
                New Task
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Task description..."
                                autoComplete="off"
                                value={inputs.description}
                                onChange={handleChange}
                                required
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Priority:</Form.Label>
                            <Form.Select
                                id="priority"
                                name="priority"
                                autoComplete="off"
                                value={inputs.priority}
                                onChange={event => setInputs({ ...inputs, priority: Number(event.target.value) })}
                                required

                            >
                                <option value="0">None</option>
                                <option value="1">High</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Limit date:</Form.Label>
                            <Form.Control
                                id="limitDate"
                                name="limitDate"
                                type="date"
                                placeholder="Task priority..."
                                autoComplete="off"
                                value={inputs.limitDate}
                                onChange={handleChange}
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


export default NewTaskForm;