import { useState, useEffect } from 'react';
import teams, { Team } from './data/teams';

import Teams from './components/Teams';
import { TeamListProps } from './components/TeamList';
import TeamSelector from './components/TeamSelector';

import './App.css';

export default function App() {
	const NUMBER_OF_JUDGES = 4;
	const LOCAL_STORAGE_KEY_TEAMS = 'teamOptions';
	const LOCAL_STORAGE_KEY_LIST = 'teamListInfo';

	const [teamOptions, setTeamOptions] = useState<string[]>([]);
	const [teamListInfo, setTeamListInfo] = useState<TeamListProps[]>([]);

	// Load state from local storage on mount
	useEffect(() => {
		// Retrieve stored team options and team list info from localStorage
		const storedTeamOptions = localStorage.getItem(LOCAL_STORAGE_KEY_TEAMS);
		const storedTeamListInfo = localStorage.getItem(LOCAL_STORAGE_KEY_LIST);

		if (storedTeamOptions && storedTeamListInfo) {
			// Parse the stored data and set it as initial state
			setTeamOptions(JSON.parse(storedTeamOptions));
			setTeamListInfo(JSON.parse(storedTeamListInfo));
		} else {
			// Initialize state if no localStorage data is found
			const listInfo: TeamListProps[] = [];
			for (let i = 0; i < NUMBER_OF_JUDGES; i++) {
				listInfo.push({
					judge: `Juez ${i + 1}`,
					teams: [],
				});
			}

			setTeamListInfo(listInfo);
			setTeamOptions(teams.map((team) => team.teamName));
		}
	}, []); // Empty dependency array means this runs only once

	// Save state to local storage whenever teamOptions or teamListInfo changes
	useEffect(() => {
		if (teamOptions.length > 0) {
			localStorage.setItem(LOCAL_STORAGE_KEY_TEAMS, JSON.stringify(teamOptions));
		}
		if (teamListInfo.length > 0) {
			localStorage.setItem(LOCAL_STORAGE_KEY_LIST, JSON.stringify(teamListInfo));
		}
	}, [teamOptions, teamListInfo]);

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

		// Update state and trigger localStorage save via useEffect
		setTeamListInfo(teamListInfoSortedByAvailability);

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
