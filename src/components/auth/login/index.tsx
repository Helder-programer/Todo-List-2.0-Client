import React, { useRef, useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import { AiOutlineArrowRight } from 'react-icons/ai';
import '../../../styles/Auth.css';

interface IInputs {
    
}

function LoginForm() {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);



    function inputAnimation() {
        if (usernameInputRef.current) usernameInputRef.current.classList.add('inputForAnimation');

        setTimeout(() => {
            if (passwordInputRef.current)
                passwordInputRef.current.classList.add('inputForAnimation');
        }, 100);
    }


    useEffect(() => {
        inputAnimation();
    }, []);



    // function btnLoginStyle() {
    //         if (usernameInputRef.current!.value != '' && passwordInputRef.current!.value != '') {
    //             btnLoginRef.style.backgroundColor = 'rgb(67, 199, 243)';
    //             btnLoginRef.current!.style.opacity = '1';
    //             btnLoginRef.current!.children[0].style.color = 'white';
    //         } else {
    //             btnLoginRef.current!.removeAttribute('style');
    //             btnLoginRef.current!.children[0].removeAttribute('style');
    //         }
    //     }

    // }


    return (
        <>
            <div className="card-login">
                <h2 className='fw-semibold mb-3 text-center'>Todo-List 2.0</h2>
                <p className='mb-5 text-center fs-5'>Iniciar Sessão</p>
                <form>
                    <div className="text">
                        <input ref={usernameInputRef} type="text" placeholder="NOME DE USUÁRIO" id="username" name='username' autoComplete="off" autoFocus />
                        <label htmlFor="">NOME DE USUÁRIO</label>
                    </div>
                    <div className="text">
                        <input ref={passwordInputRef} type="password" placeholder="SENHA" id="password" name='password' />
                        <label htmlFor="">SENHA</label>
                    </div>
                    <button className="btn-login" type="submit"><AiOutlineArrowRight/></button>
                    <div className="loader"></div>
                </form>
                <div className="informations">
                    <a href="#">CRIAR CONTA</a>
                </div>
            </div>
        </>
    );
}

export default LoginForm;