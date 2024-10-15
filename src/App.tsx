import { useState, useEffect } from 'react';
import teams, { Team } from './data/teams';

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
		const selectedTeamName = teamOptions[teamIndex];
		const selectedTeam = teams.find((team: Team) => team.teamName === selectedTeamName);

		if (selectedTeam === undefined) {
			console.log("Team name not found");
			return;
		}
	
		// Sort the team lists by the number of teams, then by the number of teams from the same school.
		const teamListInfoSortedByAvailability = [...teamListInfo];
		teamListInfoSortedByAvailability.sort((teamListA, teamListB) => {
			const teamsFromSameSchoolA = teamListA.teams.filter(
				(teamName) => teams.find((team) => team.teamName === teamName)?.schoolName === selectedTeam.schoolName
			).length;
			const teamsFromSameSchoolB = teamListB.teams.filter(
				(teamName) => teams.find((team) => team.teamName === teamName)?.schoolName === selectedTeam.schoolName
			).length;
	
			// First sort by the total number of teams
			if (teamListA.teams.length < teamListB.teams.length) {
				return -1;
			}
			if (teamListA.teams.length > teamListB.teams.length) {
				return 1;
			}
	
			// If equal, then sort by the number of teams from the same school (fewer first)
			if (teamsFromSameSchoolA < teamsFromSameSchoolB) {
				return -1;
			}
			if (teamsFromSameSchoolA > teamsFromSameSchoolB) {
				return 1;
			}
	
			return 0;
		});
	
		// Add the selected team to the list that has the least number of teams from the same school
		teamListInfoSortedByAvailability[0].teams.push(selectedTeamName);
	
		// Remove the selected team from the options list
		setTeamOptions(
			teamOptions.filter((team) => team !== selectedTeamName)
		);
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
