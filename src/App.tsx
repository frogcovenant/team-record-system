import { useState, useEffect } from 'react';
import teams from './data/teams';

import Teams from './components/Teams';
import { TeamListProps } from './components/TeamList';
import TeamSelector from './components/TeamSelector';

import './App.css';

export default function App() {
	const NUMBER_OF_JUDGES = 4;

	const [teamOptions, setTeamOptions] = useState<string[]>([]);
	const [teamListInfo, setTeamListInfo] = useState<TeamListProps[]>([]);

	useEffect(() => {
		// This will only run once when the component is mounted
		const listInfo: TeamListProps[] = [];
		for (let i = 0; i < NUMBER_OF_JUDGES; i++) {
			listInfo.push({
				judge: `Juez ${i+1}`,
				teams: [],
			});
		}

		setTeamListInfo(listInfo);
		setTeamOptions(teams.map((team) => team.teamName));
	}, []); // Empty dependency array means this runs only once

	return (
		<div className='main-page'>
			<TeamSelector teamOptions={teamOptions}/>
			<Teams teamListInfo={teamListInfo}/>
		</div>
	);
}
