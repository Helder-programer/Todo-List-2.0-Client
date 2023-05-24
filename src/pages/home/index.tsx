import React, { useState } from 'react';

import Header from '../../components/header';
import Home from '../../components/home';
import '../../styles/Home.scss';


function HomePage() {
    return (
        <>
            <Header />
            <Home />
        </>
    );
}

export default HomePage;