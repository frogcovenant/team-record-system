import TeamList, { TeamListProps } from './TeamList';
import './Teams.css';

export interface TeamsProps {
	teamListInfo: TeamListProps[];
	onDeleteTeam: (judgeIndex: number, teamName: string) => void;
}

export default function Teams(props: TeamsProps) {
	return (
		<div className='teamsList'>
			{props.teamListInfo.map((teamListInfo, index) => (
				<TeamList
					judge={teamListInfo.judge}
					teams={teamListInfo.teams}
					key={index}
					onDeleteTeam={(teamName) => props.onDeleteTeam(index, teamName)}
				/>
			))}
		</div>
	);
}
