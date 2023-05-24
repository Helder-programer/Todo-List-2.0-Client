import React, { Dispatch, FormEvent, SetStateAction, useState, useReducer, ChangeEvent } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ImSearch } from 'react-icons/im';
import { FcClearFilters } from 'react-icons/fc';

import { ISeachTaskDTO } from '../../../../services/task';
import FormSelect from '../../../formSelect';

interface IProps {
    searchTasks(params: ISeachTaskDTO): Promise<void>;
    setCurrentFilters: Dispatch<SetStateAction<ISeachTaskDTO>>;
    currentFilters: ISeachTaskDTO;
}

const taskStatusRadioButtons = [
    {
        label: 'All',
        name: 'done',
        value: -1
    },
    {
        label: 'No',
        name: 'done',
        value: 0
    },
    {
        label: 'Yes',
        name: 'done',
        value: 1
    }
];

const prioritySelectOptions = [{ label: 'All', value: -1 }, { label: 'High', value: 1 }, { label: 'None', value: 0 }];

const Search = ({ searchTasks, setCurrentFilters, currentFilters }: IProps) => {
    const [checkedState, setCheckedState] = useState<Array<boolean>>(
        new Array(true, false, false)
    );



    const handleChangeRadioButton = (position: number) => {
        const updatedCheckedState = checkedState.map((currentState, index) =>
            index === position ? true : false
        );
        setCheckedState(updatedCheckedState);
    }

    const resetInputs = () => {
        setCurrentFilters({ description: '', priority: -1, done: -1 });
        setCheckedState([true, false, false]);
    }


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await searchTasks(currentFilters);
    }


    return (
        <>
            <Row className="pt-1" as="section">
                <Form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Filters</legend>
                        <Row id="inputs">
                            <Col md="7">

                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    name="description"
                                    value={currentFilters.description}
                                    onChange={event => {
                                        setCurrentFilters({ ...currentFilters, description: event.target.value });
                                    }}
                                    autoComplete="off"
                                />
                            </Col>
                            <Col>

                                <Form.Label>Priority:</Form.Label>
                                <FormSelect
                                    options={prioritySelectOptions}
                                    onChange={event => setCurrentFilters({ ...currentFilters, priority: Number(event.target.value) })}
                                    value={currentFilters.priority}
                                />

                            </Col>
                            <Col>

                                <Form.Label>Done:</Form.Label>
                                <Row className="flex-row">

                                    {
                                        taskStatusRadioButtons.map((currentRadioButton, index) => (
                                            <Col className="d-flex gap-1" key={index}>
                                                <span>{currentRadioButton.label}</span>
                                                <Form.Check
                                                    type="radio"
                                                    name={currentRadioButton.name}
                                                    value={currentRadioButton.value}
                                                    checked={checkedState[index]}
                                                    onChange={event => {
                                                        setCurrentFilters({ ...currentFilters, done: Number(event.target.value) });
                                                        handleChangeRadioButton(index);
                                                    }}
                                                />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Col>
                            <Col md="auto">
                                <div className="d-flex flex-column justify-content-center h-100" id="search-buttons">

                                    <button className="btn-custom-transparent" type="submit">
                                        <i><ImSearch className="text-primary"/></i>
                                    </button>
                                    <button className="btn-custom-transparent" onClick={resetInputs}>
                                        <i><FcClearFilters /></i>
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </fieldset>
                </Form>
            </Row >
        </>
    );
}

export default Search;