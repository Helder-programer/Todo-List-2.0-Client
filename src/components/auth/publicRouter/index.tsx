import React from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
    children: React.JSX.Element;
}


const PublicRouter = ({children}: IProps) => {
    const user = localStorage.getItem('user');
    if (user) return <Navigate to='/checklists'/>

    return children;
}


export default PublicRouter;