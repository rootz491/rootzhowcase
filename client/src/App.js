import styled from 'styled-components';
import './App.css';
import Card from "./components/Card";
import Profile from './components/Profile';
import Header from './components/Header';

export default function App() {
	return (
		<Container id='rootz' className="App">
			<Header />
			<Main>
				<ProfileWrapper>
					<Profile />
				</ProfileWrapper>
				<CardWrapper>
					<Card width="340px"/>
				</CardWrapper>
			</Main>
		</Container>
	);
}

const Container = styled.div`
	height: 100vh;
`;

const Main = styled.div`
	display: flex;
	& > div {
		padding: 1rem;
		min-height: 80vh;
	}
	@media (max-width: 400px) {
		& > div {
			padding: 0;
			min-height: 60vh;
		}
	}
	@media (max-width: 700px) {
		flex-direction: column;
		& > div {
			min-height: auto;
		}
	}
`;

const ProfileWrapper = styled.div`
	flex: 1;
	// background-color: #f2f2f2;
`;

const CardWrapper = styled.div`
	width: 500px;
	display: grid;
	place-content: center;
	// background-color: yellow;
	@media (max-width: 1100px) {
		width: 400px;
	}
	@media (max-width: 800px) {
		width: 300px;
	}
	@media (max-width: 700px) {
		display: 100%;
		align-self: center;
		margin: 2rem 0;
	}
`;