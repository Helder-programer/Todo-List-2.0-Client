import React, { useState } from 'react';
import { Container, Navbar, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import AuthService from '../../services/auth';
import '../../styles/Header.css';

interface Iuser {
    user_id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}


function Header() {
    const [user, setUser] = useState<Iuser>(JSON.parse(localStorage.getItem('user') ?? ''));
    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout();
        return navigate('/login');
    }


    return (
        <>
            <header className='v-100'>
                <Navbar className='tdl-navbar p-2'>
                    <Container>
                        <Navbar.Brand className='text-light fs-4 fst-italic fw-bold'>Todo List 2.0</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text className='p-0'>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className='d-flex align-items-center btn-custom-white border border-2'
                                        variant=''>

                                        <FaUserAlt className='me-2' />
                                        {user.username.toUpperCase()}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}

export default Header;