import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import App from './App';
import About from './pages/About';
import Projects from './pages/Projects';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
