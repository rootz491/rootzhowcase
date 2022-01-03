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
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/pseudo/ProtectedRoute';
import VerifiedRoute from './components/pseudo/VerifiedRoute';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/unverified" element={<ProtectedRoute />}>
                <Route path="/unverified" element={<Unverified />} />
            </Route>
            <Route exact path="/" element={<ProtectedRoute />}>
                <Route exact path='/' element={<App/>}/>
            </Route>
            <Route exact path="/projects" element={<ProtectedRoute />}>
                <Route exact path='/projects' element={<Projects />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
