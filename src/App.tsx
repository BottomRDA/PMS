import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { HomePage, AboutPage, Dashboard } from '@/pages';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayout />} >
                    <Route index element={<Dashboard />} />
                    <Route path='/Home' element={<HomePage />} />
                    <Route path='/About' element={<AboutPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
