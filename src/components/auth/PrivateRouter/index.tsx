import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
    children: React.JSX.Element;
}

const PrivateRouter = ({ children }: IProps) => {
    const user = localStorage.getItem('user');

    if (!user) return <Navigate to='/login'/> 

    return children;
}


export default PrivateRouter;