import React, { useState } from 'react';
import { Container, Navbar, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillBell } from 'react-icons/ai';
import AuthService from '../../services/auth';
import { IUser } from '../../interfaces/IUser';

import '../../styles/Header.scss';


function Header() {
    const [user, setUser] = useState<IUser>(JSON.parse(localStorage.getItem('user')!));
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
                        <Navbar.Brand
                            className='text-light fs-4 fst-italic fw-bold'
                            onClick={() => navigate('/')}
                        >
                            Todo List
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        {
                            user &&
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text className='p-0'>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            className='d-flex align-items-center text-light border border-2'
                                            variant='primary'>

                                            <FaUserAlt className='me-2' />
                                            {user.username.toUpperCase()}
                                            <AiFillBell className="late-tasks-bell" />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                                            <Dropdown.Item className="text-danger">Notifications</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        }
                    </Container>
                </Navbar>
            </header>
        </>
    );
}

export default Header;