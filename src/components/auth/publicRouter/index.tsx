import React from 'react';
import { Navigate } from 'react-router-dom';
import { IUser } from '../../../interfaces/IUser';

interface IProps {
    children: React.JSX.Element;
}


const PublicRouter = ({children}: IProps) => {
    const user: IUser = JSON.parse(localStorage.getItem('user')!);
    if (user) return <Navigate to='/checklists'/>

    return children;
}


export default PublicRouter;