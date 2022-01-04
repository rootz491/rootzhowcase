import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import useReset from '../hooks/useReset';

export default function Header() {
    const history = useHistory();

	const Logout = () => {
		useReset();
		history.push('/login');	
	}

    return (
        <Nav>
            <Hamburger htmlFor='menu'><img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDIgNSBMIDIgNyBMIDIyIDcgTCAyMiA1IEwgMiA1IHogTSAyIDExIEwgMiAxMyBMIDIyIDEzIEwgMjIgMTEgTCAyIDExIHogTSAyIDE3IEwgMiAxOSBMIDIyIDE5IEwgMjIgMTcgTCAyIDE3IHoiPjwvcGF0aD48L3N2Zz4="/></Hamburger>
            <Input id='menu' name='menu' type="checkbox" hidden/>
            <Btns>
                <Link to='/projects'><Btn>projects</Btn></Link> {' '}
                <Link to='/about'><Btn>about</Btn></Link> {' '}
                <Link onClick={Logout} to='#'><Btn>logout</Btn></Link> {' '}
            </Btns>
        </Nav>
    )
}

const Nav = styled.nav`
    padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Hamburger = styled.label` 
    visibility: hidden;
    z-index: 80;
    cursor: pointer;
    @media (max-width: 500px) {
        visibility: visible;
    }
`;

const Input = styled.input`
    display: none;
    &:checked ~ div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: grid;
        gap: 1rem;
        margin: 0;
        align-items: center;
        justify-content: center;
    }
`;

const Btns = styled.div`
    @media (max-width: 500px) {
        background-color: #fff;
        padding: 1rem;
        display: none;
        text-align: center;
    }
`;

const Btn = styled.span`
	margin: 0 1rem;
    padding: .3rem 1rem;
    border-radius: 3px;
    background-color: #995CE7;
    color: #FFF;
    min-width: 100px;
    @media (max-width: 500px) {
        background-color: #fff;
        color: #995CE7;
        width: 100%;
        margin: 0 auto;
    }
`;