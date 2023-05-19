import React from 'react';

interface IProps {
    message: string
}

const ErrorText = ({ message }: IProps) => {
    return (
        <p className="error-font">Error: {message}</p>
    );
}

export default ErrorText;