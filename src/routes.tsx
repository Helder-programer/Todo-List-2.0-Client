import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import Register from "./pages/auth/register";
import ChecklistsPage from "./pages/checklists";
import PrivateRouter from './components/auth/PrivateRouter';
import PublicRouter from "./components/auth/publicRouter";

function MainRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <PublicRouter>
                        <LoginPage />
                    </PublicRouter>
                } />



                <Route path="/register" element={
                    <PublicRouter>
                        <Register />
                    </PublicRouter>
                } />
                
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