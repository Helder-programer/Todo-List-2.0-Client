import React, { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header';
import HeroPattern from '../../components/heroPattern';
import { IUser } from '../../interfaces/IUser';
import '../../styles/Home.scss';


function HomePage() {
    const [user, setUser] = useState<IUser>(JSON.parse(localStorage.getItem('user')!));
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Container as="main" className="d-flex justify-content-center align-items-center">
                <section className="home d-flex flex-column">
                    <h1 id="home-title">Todo List</h1>
                    <p id="home-text">Organize your day with Todo List</p>

                    <Row className="buttons justify-content-between">

                        {
                            user
                                ?

                                <Button variant="outline-primary" onClick={() => navigate('/checklists')}>Your Checklists</Button>

                                :
                                <>
                                    <Col md="auto">
                                        <Button variant="outline-primary">Login</Button>
                                    </Col>

                                    <Col md="auto">
                                        <Button variant="outline-primary">Register</Button>
                                    </Col>
                                </>

                        }
                    </Row>
                </section>

                <HeroPattern />
            </Container>
        </>
    );
}

export default HomePage;