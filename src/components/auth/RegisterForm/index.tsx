import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth';
import '../../../styles/Auth.scss';

interface IInputs {
    username: string;
    email: string;
    password: string;
}

function RegisterForm() {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const btnRegisterRef = useRef<HTMLButtonElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<any>(null);
    const [inputs, setInputs] = useState<IInputs>({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const inputAnimation = () => {
        if (usernameInputRef.current) usernameInputRef.current.classList.add('inputForAnimation');

        setTimeout(() => {
            if (emailInputRef.current)
                emailInputRef.current.classList.add('inputForAnimation');
        }, 100);

        setTimeout(() => {
            if (passwordInputRef.current)
                passwordInputRef.current.classList.add('inputForAnimation');
        }, 100);
    }


    useEffect(() => {
        inputAnimation();
    }, []);

    const btnRegisterStyle = () => {
        if (inputs.username !== '' && inputs.email !== '' && inputs.password !== '') {

            btnRegisterRef.current!.style.backgroundColor = 'rgb(67, 199, 243)';
            btnRegisterRef.current!.style.opacity = '1';
            btnRegisterRef.current!.style.color = 'white';
            btnRegisterRef.current!.disabled = false;

        } else {
            btnRegisterRef.current!.removeAttribute('style');
            btnRegisterRef.current!.children[0].removeAttribute('style');
        }

    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            btnRegisterRef.current!.style.display = 'none';
            loaderRef.current!.style.display = 'block';
            await AuthService.register(inputs);

            return navigate('/login');
        } catch (error: any) {

            console.log(error);
            if (error.response)
                setError(error.response.data.error);
            else
                setError(error.message);
            btnRegisterRef.current!.style.display = 'block';
            loaderRef.current!.style.display = 'none';
        }

    }

    return (
        <>
            <div className="card-login">
                <h2 className='fw-semibold mb-3 text-center'>To do List</h2>
                <p className='mb-5 text-center fs-5'>Create your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="text">
                        <input ref={usernameInputRef} type="text" placeholder="USERNAME" value={inputs.username} onKeyUp={btnRegisterStyle} id="username" name="username" onChange={handleChange} autoComplete="off" autoFocus />
                        <label htmlFor="">USERNAME</label>
                    </div>
                    <div className="text">
                        <input ref={emailInputRef} type="text" placeholder="E-MAIL" value={inputs.email} onKeyUp={btnRegisterStyle} id="email" onChange={handleChange} name="email" autoComplete="off" />
                        <label htmlFor="">E-MAIL</label>
                    </div>
                    <div className="text">
                        <input ref={passwordInputRef} type="password" placeholder="PASSWORD" value={inputs.password} onKeyUp={btnRegisterStyle} id="password" name="password" onChange={handleChange} />
                        <label htmlFor="">PASSWORD</label>
                    </div>
                    {
                        error && <p className='error-font m-0'>Error: {error}</p>
                    }
                    <div ref={loaderRef} className="loader"></div>
                    <button ref={btnRegisterRef} className="btn-login" type="submit" disabled><AiOutlineArrowRight /></button>
                </form>
                <div className="informations">
                    <Link to='/login'>LOGIN IN APPLICATION</Link>
                    <Link to='/' className="small-text">HOME</Link>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;