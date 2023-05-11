import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AuthService from '../../../services/auth';
import '../../../styles/Auth.css';

interface IInputs {
    email: string;
    password: string;
}

function LoginForm() {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const btnLoginRef = useRef<HTMLButtonElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const [inputs, setInputs] = useState<IInputs>({ email: '', password: '' });


    const inputAnimation = () => {
        if (emailInputRef.current) emailInputRef.current.classList.add('inputForAnimation');

        setTimeout(() => {
            if (passwordInputRef.current)
                passwordInputRef.current.classList.add('inputForAnimation');
        }, 100);
    }


    useEffect(() => {
        inputAnimation();
    }, []);



    const btnLoginStyle = () => {
        if (inputs.email != '' && inputs.password != '') {

            btnLoginRef.current!.style.backgroundColor = 'rgb(67, 199, 243)';
            btnLoginRef.current!.style.opacity = '1';
            btnLoginRef.current!.style.color = 'white';
            btnLoginRef.current!.disabled = false;

        } else {
            btnLoginRef.current!.removeAttribute('style');
            btnLoginRef.current!.children[0].removeAttribute('style');
        }
    }


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [event.target.id]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {

            btnLoginRef.current!.style.display = 'none';
            loaderRef.current!.style.display = 'block';
            await AuthService.login(inputs);

        } catch (error) {
            console.log(error);
            btnLoginRef.current!.style.display = 'block';
            loaderRef.current!.style.display = 'none';
        }

    }

    return (
        <>
            <div className="card-login">
                <h2 className='fw-semibold mb-3 text-center'>Todo-List 2.0</h2>
                <p className='mb-5 text-center fs-5'>Login in application</p>
                <form onSubmit={handleSubmit}>
                    <div className="text">
                        <input ref={emailInputRef} type="text" placeholder="E-MAIL" value={inputs.email} id="email" onKeyUp={btnLoginStyle} onChange={handleChange} autoComplete="off" autoFocus />
                        <label htmlFor="">E-MAIL</label>
                    </div>
                    <div className="text">
                        <input ref={passwordInputRef} type="password" placeholder="PASSWORD" value={inputs.password} id="password" onKeyUp={btnLoginStyle} onChange={handleChange} />
                        <label htmlFor="">PASSWORD</label>
                    </div>
                    <button ref={btnLoginRef} className="btn-login" type="submit" disabled><AiOutlineArrowRight /></button>
                    <div ref={loaderRef} className="loader"></div>
                </form>
                <div className="informations">
                    <Link to='/register'>CREATE YOUR ACCOUNT</Link>
                </div>
            </div>
        </>
    );
}

export default LoginForm;