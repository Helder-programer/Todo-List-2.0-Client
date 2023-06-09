import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';

import HeroPattern from '../heroPattern';

function Home() {
    const [user, setUser] = useState<IUser>(JSON.parse(localStorage.getItem('user')!));
    const navigate = useNavigate();

    return (
        <Container as="main" className="d-flex justify-content-center align-items-center">
            <section className="home d-flex flex-column">
                <h1 id="home-title">To do List</h1>
                <p id="home-text">Organize your day with To do List</p>

                <Row className="buttons justify-content-between">

                    {
                        user
                            ?

                            <Button variant="outline-primary" onClick={() => navigate('/checklists')}>Your Checklists</Button>

                            :
                            <>
                                <Col md="auto">
                                    <Button variant="outline-primary" onClick={() => navigate('/login')}>Login</Button>
                                </Col>

                                <Col md="auto">
                                    <Button variant="primary" className="text-light" onClick={() => navigate('/register')}>Sign in</Button>
                                </Col>
                            </>

                    }
                </Row>
            </section>

            <HeroPattern />
        </Container>
    );
}

export default Home;
