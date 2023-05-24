import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../../components/header';
import TasksWithShortDeadline from '../../components/tasksWithShortDeadline';

function TasksWithShortDeadlinePage() {

    return (
        <>
            <Header />
            <TasksWithShortDeadline />
        </>
    );
}

export default TasksWithShortDeadlinePage;