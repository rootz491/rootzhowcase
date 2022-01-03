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
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unverified from './pages/Unverified';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unverified" element={<Unverified />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
