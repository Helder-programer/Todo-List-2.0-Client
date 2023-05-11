import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import '../../styles/Header.css';

function Header() {
    return (
        <>
            <header className='v-100'>
                <Navbar className='tdl-navbar p-2'>
                    <Container>
                        <Navbar.Brand className='text-light fs-4 fst-italic fw-bold'>Todo List 2.0</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text className='p-0'>
                                {/* <Button className='btn-custom-white border border-2' variant=''>User</Button> */}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}

export default Header;