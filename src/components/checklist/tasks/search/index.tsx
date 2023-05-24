import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ISeachTaskDTO } from '../../../../services/task';

interface IProps {
    searchTasks(params: ISeachTaskDTO): Promise<void>;
    setCurrentFilters: Dispatch<SetStateAction<ISeachTaskDTO>>;
    currentFilters: ISeachTaskDTO;
}

const Search = ({ searchTasks, setCurrentFilters, currentFilters }: IProps) => {

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
                        <Row>
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
                                <Form.Select
                                    size="sm"
                                    name="priority"
                                    value={currentFilters.priority}
                                    onChange={event => {
                                        setCurrentFilters({ ...currentFilters, priority: Number(event.target.value) });
                                    }}
                                >
                                    <option value="-1">All</option>
                                    <option value="1">High</option>
                                    <option value="0">None</option>
                                </Form.Select>

                            </Col>
                            <Col>

                                <Form.Label>Done:</Form.Label>
                                <Row className="flex-row">

                                    <Col className="d-flex gap-1">
                                        <span>All</span>
                                        <Form.Check
                                            type="radio"
                                            name="done"
                                            value="-1"
                                            onChange={event => {
                                                setCurrentFilters({ ...currentFilters, done: Number(event.target.value) });
                                            }}
                                        />
                                    </Col>
                                    <Col className="d-flex gap-1">
                                        <span>Yes</span>
                                        <Form.Check
                                            type="radio"
                                            name="done"
                                            value="1"
                                            onChange={event => {
                                                setCurrentFilters({ ...currentFilters, done: Number(event.target.value) });
                                            }}
                                        />
                                    </Col>
                                    <Col className="d-flex gap-1">
                                        <span>No</span>
                                        <Form.Check
                                            type="radio"
                                            name="done"
                                            value="0"
                                            onChange={event => {
                                                setCurrentFilters({ ...currentFilters, done: Number(event.target.value) });
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </fieldset>
                </Form>
            </Row >
        </>
    );
}

export default Search;