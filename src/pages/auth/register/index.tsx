import * as React from 'react';
import RegisterForm from '../../../components/auth/RegisterForm';


function Register() {
    return (
        <>
            <main className='auth-container vh-100 d-flex align-items-center justify-content-center'>
                <RegisterForm />
            </main>
        </>
    );
}

export default Register;