import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import Register from "./pages/auth/register";
import ChecklistsPage from "./pages/checklists";
import PrivateRouter from './components/auth/PrivateRouter';
import PublicRouter from "./components/auth/publicRouter";
import ChecklistPage from "./pages/checklist";
import NotFoundPage from "./pages/errors/notFound";

function MainRoutes() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
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

                <Route path="/checklists/:checklistId" element={
                    <PrivateRouter>
                        <ChecklistPage />
                    </PrivateRouter>
                } />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default MainRoutes;