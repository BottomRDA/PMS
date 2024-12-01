import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import '@styles/index.scss';

const rootNode = document.getElementById("root");    

if (rootNode) {
    const root = createRoot(rootNode);
    root.render(<App />);
}
