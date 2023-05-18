import React from 'react';

interface IProps {
    message: string
}

const ErrorText = ({ message }: IProps) => {
    return (
        <p className="text-danger" style={{ fontSize: '10pt' }}>Error: {message}</p>
    );
}

export default ErrorText;