import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    children?: ReactNode;
}

const PrivateRouter: React.FC = (props:Props) => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    if (!user) return navigate('/login');

    return (
        <>
            {
                children
            }
        </>
    )
}


export default PrivateRouter;