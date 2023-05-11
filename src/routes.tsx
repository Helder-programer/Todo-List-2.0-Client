import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import Register from "./pages/auth/register";
import ChecklistsPage from "./pages/checklists";
import PrivateRouter from './components/auth/PrivateRouter';

function MainRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checklists" element={
                    <PrivateRouter>
                        <ChecklistsPage />
                    </PrivateRouter>
                } />
            </Routes>
        </Router>
    );
}

export default MainRoutes;