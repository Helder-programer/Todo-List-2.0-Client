import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";

function MainRoutes() {
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
            </Routes>
        </Router>
     );
}

export default MainRoutes;