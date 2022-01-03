import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import useReset from './hooks/useReset';

export default function App() {
	const navigate = useNavigate();

	const Logout = async () => {
		await useReset();
		navigate('/login');	
	}

	return (
		<Container id='rootz' className="App">
			<Nav>
				<Link to='/about'><Btn>about</Btn></Link> {' '}
				<Link to='/projects'><Btn>projects</Btn></Link> {' '}
				<Link to='/login'><Btn>login</Btn></Link> {' '}
				<Link onClick={Logout} to='#'><Btn>logout</Btn></Link> {' '}
			</Nav>
		</Container>
	);
}

const Container = styled.div`
	height: 100vh;
`;

const Nav = styled.nav`
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const Btn = styled.span`
	margi<span>m
`;