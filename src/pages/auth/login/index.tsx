import React from 'react';
import LoginForm from '../../../components/auth/LoginForm';
import '../../../styles/Auth.scss';

function LoginPage() {
    return (
        <>
            <main className='auth-container vh-100 d-flex align-items-center justify-content-center'>
                <LoginForm />
            </main>
        </>
    );
}

export default LoginPage;