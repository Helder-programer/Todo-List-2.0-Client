import React, { useState, useEffect } from 'react';
import { Container, Navbar, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillBell } from 'react-icons/ai';

import { IUser } from '../../interfaces/IUser';
import { ITask } from '../../interfaces/ITask';
import AuthService from '../../services/auth';
import TaskService from '../../services/task';
import '../../styles/Header.scss';


function Header() {
    const [user, setUser] = useState<IUser>(JSON.parse(localStorage.getItem('user')!));
    const [tasksWithShortDeadline, setTasksWithShortDeadline] = useState<ITask[]>([]);
    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout();
        return navigate('/login');
    }


    const getTasksWithShortDeadline = async () => {
        const tasksWithShortDeadline = await TaskService.searchTasksWithShortDeadline();
        setTasksWithShortDeadline(tasksWithShortDeadline);
    }

    useEffect(() => {
        async function loadComponent() {
            await getTasksWithShortDeadline();
        }
        loadComponent();
    }, []);


    return (
        <>
            <header className='v-100'>
                <Navbar className='tdl-navbar p-2'>
                    <Container>
                        <Navbar.Brand
                            className='text-light fs-4 fst-italic fw-bold'
                            onClick={() => navigate('/')}
                        >
                            To do List
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

                                            {
                                                tasksWithShortDeadline.length > 0 ? <AiFillBell className="late-tasks-bell" /> : ''
                                            }
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                                            <Dropdown.Item className="text-danger" onClick={() => navigate('/tasksWithShortDeadline')}>Warning</Dropdown.Item>
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