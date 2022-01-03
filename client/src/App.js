import { Link } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<h1>Main Application</h1>
			<Link to='/about'>about</Link> {' '}
			<Link to='/projects'>projects</Link> {' '}
			<Link to='/login'>login</Link>
		</div>
	);
}

export default App;
