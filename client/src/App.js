import styled from 'styled-components';
import './App.css';
import Header from './components/Header';


export default function App() {
	return (
		<Container id='rootz' className="App">
			<Header />
		</Container>
	);
}

const Container = styled.div`
	height: 100vh;
`;
