import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import LoginForm from '../components/auth/login';
import '../styles/Login.css';
import Header from '../components/header';

function LoginPage() {
    return (
        <>
            <main className='login-container vh-100 d-flex align-items-center justify-content-center'>
                <LoginForm />
            </main>
        </>
    );
}

export default LoginPage;