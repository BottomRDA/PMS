import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

const MainLayout: React.FC = () => {
    return (
        <body>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </body>
    )
};

export default MainLayout;