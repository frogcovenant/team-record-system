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

	function handleSelectTeam(teamIndex: number): void {
		const selectedTeam = teamOptions[teamIndex];

		// TODO: for now we always add to the list with the least teams.
		// We must KEEP BALANCE across SCHOOLS instead.
		const teamListInfoSortedByAvailability = [...teamListInfo];
		teamListInfoSortedByAvailability.sort((teamListA, teamListB) => {
			if (teamListA.teams.length < teamListB.teams.length) {
				return -1;
			}
			if (teamListA.teams.length > teamListB.teams.length) {
				return 1;
			}
			return 0;
		});
		teamListInfoSortedByAvailability[0].teams.push(selectedTeam);

		// remove selected team from the options list
		setTeamOptions(teamOptions.filter((team) => {
			return team !== selectedTeam;
		}));
    }

	return (
		<div className='main-page'>
			<TeamSelector 
				teamOptions={teamOptions}
				onSelectTeam={handleSelectTeam}
			/>
			<Teams
				teamListInfo={teamListInfo}
			/>
		</div>
	);
}
