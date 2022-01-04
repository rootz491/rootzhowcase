import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Switch,
	Route
} from "react-router-dom";
import App from './App';
import About from './pages/About';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unverified from './pages/Unverified';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/pseudo/PrivateRoute';
import VerifiedRoute from './components/pseudo/VerifiedRoute';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/" component={App} />
            <PrivateRoute exact path="/unverified" component={Unverified} />
            <VerifiedRoute  exact path="/projects" component={Projects} />
            <Route exact path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>,
    rootElement
);
