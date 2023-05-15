import * as React from 'react';
import { Col, Form, Row } from 'react-bootstrap';


const SearchTask = () => {
    return (
        <>
            <Row>
                <Form>
                    <fieldset>
                        <legend>Search Tasks</legend>
                        <Form.Label></Form.Label>
                        <Form.Control
                            type="text"
                        />
                    </fieldset>
                </Form>
            </Row>
        </>
    );
}

export default SearchTask;