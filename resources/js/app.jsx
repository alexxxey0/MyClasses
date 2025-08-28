import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import Layout from './Pages/components/Layout';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        page.default.layout = page.default.layout || (page => <Layout children={page} />); // Set default layout for the page
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<BrowserRouter><App {...props} /></BrowserRouter>)
    },
})