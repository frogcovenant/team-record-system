import TeamList, { TeamListProps } from './TeamList';
import './Teams.css';

export interface TeamsProps {
	teamListInfo: TeamListProps[];
}

export default function Teams(props: TeamsProps) {
	return (
		<div className='teamsList'>
			{props.teamListInfo.map((teamListInfo, index) => (
				<TeamList
					judge={teamListInfo.judge}
					teams={teamListInfo.teams}
					key={index}
				/>
			))}
		</div>
	);
}
