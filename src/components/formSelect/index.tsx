import React, { ChangeEventHandler } from 'react';

interface IProps {
    value: string | number;
    options: any[];
    onChange: ChangeEventHandler<HTMLSelectElement>;
}


const FormSelect = ({ value, options, onChange }: IProps) => {
    return (
        <select className="form-select form-select-sm" value={value} onChange={onChange}>
            {options.map((option, index) => (
                <option value={option.value} key={index}>{option.label}</option>
            ))}
        </select>
    );
}

export default FormSelect;