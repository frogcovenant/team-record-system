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
		const NAMES_OF_JUDGES = ['A', 'B', 'C', 'D'];

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
					judge: `Juez ${NAMES_OF_JUDGES[i]}`,
					teams: [],
					judgeNumber: NaN,
					maxJudgeNumber: NUMBER_OF_JUDGES,
				});
			}

			// Sort the team list info alphabetically by judge name
			listInfo.sort((a, b) => a.judge.localeCompare(b.judge));
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

	// TODO: clean up this
	function handleSelectTeam(teamIndex: number, position?: number): void {
		let selectedTeamName = teamOptions[teamIndex];
		let selectedTeam = teams.find((team: Team) => team.teamName === selectedTeamName);

		if (selectedTeam === undefined) {
			// If no team is selected, add a blocked slot
			selectedTeam = {
				teamName: 'BLOQUEADO',
				schoolName: '',
			};
			selectedTeamName = 'BLOQUEADO';
		}

		const teamListInfoSortedByAvailability = [...teamListInfo].map(judgeInfo => ({
			...judgeInfo,
			teams: judgeInfo.teams.map(t => typeof t === 'string' ? { name: t, manualPosition: false } : t)
		}));
		let teamInserted = false;

		if (position && position > 0) {
			const judgeIndex = (position - 1) % teamListInfoSortedByAvailability.length;
			const teamIndexInJudge = Math.floor((position - 1) / teamListInfoSortedByAvailability.length);
			const teamsArr = teamListInfoSortedByAvailability[judgeIndex].teams;
			while (teamsArr.length <= teamIndexInJudge) {
				teamsArr.push({ name: '', manualPosition: false });
			}
			if (teamsArr[teamIndexInJudge].name === '') {
				const isBlocked = selectedTeamName === 'BLOQUEADO';
				teamsArr[teamIndexInJudge] = { name: selectedTeamName, manualPosition: isBlocked ? true : true };
				teamInserted = true;
			}
		} else {
			// Only count non-empty slots for balancing
			teamListInfoSortedByAvailability.sort((teamListA, teamListB) => {
				const validTeamsA = teamListA.teams.filter(t => t.name !== '');
				const validTeamsB = teamListB.teams.filter(t => t.name !== '');
				const teamsFromSameSchoolA = validTeamsA.filter(
					(teamObj) => teams.find((team) => team.teamName === teamObj.name)?.schoolName === selectedTeam.schoolName
				).length;
				const teamsFromSameSchoolB = validTeamsB.filter(
					(teamObj) => teams.find((team) => team.teamName === teamObj.name)?.schoolName === selectedTeam.schoolName
				).length;

				if (validTeamsA.length < validTeamsB.length) return -1;
				if (validTeamsA.length > validTeamsB.length) return 1;

				if (teamsFromSameSchoolA < teamsFromSameSchoolB) return -1;
				if (teamsFromSameSchoolA > teamsFromSameSchoolB) return 1;

				return 0;
			});
			const teamsArr = teamListInfoSortedByAvailability[0].teams;
			const emptyIndex = teamsArr.findIndex(t => t.name === '' && !t.manualPosition);
			if (emptyIndex !== -1) {
				teamsArr[emptyIndex] = { name: selectedTeamName, manualPosition: false };
			} else {
				teamsArr.push({ name: selectedTeamName, manualPosition: false });
			}
			teamInserted = true;
		}

		teamListInfoSortedByAvailability.sort((a, b) => a.judge.localeCompare(b.judge));
		if (teamInserted) {
			setTeamListInfo(teamListInfoSortedByAvailability);
			setTeamOptions(teamOptions.filter((team) => team !== selectedTeamName));
		}
	}

	// TODO: clean up this
	function handleDeleteTeam(judgeIndex: number, teamName: string): void {
		const updatedTeamListInfo = [...teamListInfo].map(judgeInfo => ({
			...judgeInfo,
			teams: judgeInfo.teams.map(t => typeof t === 'string' ? { name: t, manualPosition: false } : t)
		}));
		const teamsArr = updatedTeamListInfo[judgeIndex].teams;
		const teamObjIndex = teamsArr.findIndex(t => t.name === teamName);
		if (teamObjIndex !== -1) {
			const manual = teamsArr[teamObjIndex].manualPosition;
			teamsArr[teamObjIndex] = { name: '', manualPosition: manual };
		}
		const teamToReAdd = teams.find((team: Team) => team.teamName === teamName);
		if (teamToReAdd) {
			const updatedTeamOptions = [...teamOptions, teamToReAdd.teamName];
			setTeamOptions(updatedTeamOptions);
		}
		updatedTeamListInfo.sort((a, b) => a.judge.localeCompare(b.judge));
		setTeamListInfo(updatedTeamListInfo);
	}

	return (
		<div className='main-page'>
			<TeamSelector 
				teamOptions={teamOptions}
				onSelectTeam={handleSelectTeam}
			/>
			<Teams
				teamListInfo={teamListInfo}
				onDeleteTeam={handleDeleteTeam}
			/>
		</div>
	);
}
