import Teams from './components/Teams';
import TeamSelector from './components/TeamSelector';
import './App.css';

export default function App() {
	return (
		<div className='main-page'>
			<TeamSelector/>
			<Teams/>
		</div>
	);
}
