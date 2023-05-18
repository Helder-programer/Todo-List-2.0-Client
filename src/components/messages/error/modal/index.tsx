import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

interface IProps {
    message: string;
}

const ErrorModal = ({ message }: IProps) => {
    const [show, setShow] = useState<boolean>(true);

    return (
        <Modal size="sm" show={show} onHide={() => setShow(false)} centered>
            <Modal.Header>
                <Modal.Title className="text-danger">Ops! Problem to realize this action</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-danger">Error: {message}</Modal.Body>
        </Modal>

    );


    return <></>
}

export default ErrorModal;