import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Header from '../../../components/header';
import '../../../styles/NotFoundPage.scss';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Container fluid className="d-flex justify-content-center align-items-center" as="main">
                <div id="error-message" className="d-grid" >
                    <h1 className="fw-semibold mb-3">Page Not Found :(</h1>
                    <Button
                        variant="outline-primary"
                        onClick={() => navigate('/login')}
                    >
                        Back to the site
                    </Button>
                </div>
            </Container>
        </>
    );
}


export default NotFoundPage;